import React from 'react';
import './App.css';
import users from "./users";
import {capitalizeFirstLetter} from "./helpers";

class CountryOption extends React.Component {
  render() {
    return(
      <option value={this.props.campus} name={this.props.campus}>{this.props.campus}</option>
    )
  }
}

class Ironhacker extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.campus}</td>
        <td>{this.props.role}</td>
    <td>{ this.props.links ? <a href={this.props.links}><img className="small-icon" src="https://image.flaticon.com/icons/svg/174/174857.svg" alt="linkedin"/></a> : <p></p> }</td>
      </tr>
    )
  }
}

class Ironhackers extends React.Component {
  
  state = {
    hackers: users,
    search: "",
    teacher: false,
    student: false
  }

  // getResults() {
  //   let searchArray = [...users];
  //   let resultArray = searchArray.filter( hacker => )
  // }

  handleChange = event => {
    let searchArray = [...users];
    console.log(event.target.name);

    if (event.target.type === "select-one") {
      let resultArray = searchArray.filter( hacker => hacker.campus == event.target.value )
      
      this.setState({
        hackers: resultArray
      })
    }

    else if (event.target.type === "text") {
      //uppercase first letter
      let searchTerm = '';
      searchTerm = capitalizeFirstLetter(event.target.value);
      
      let resultArray = searchArray.filter( hacker => hacker.firstName.includes(searchTerm) || hacker.lastName.includes(searchTerm))
      
      this.setState({
        hackers: resultArray,
        [event.target.name]: event.target.value
      })
    }

    else if (event.target.type === "checkbox") {
      //make a matrix
      let student = true;
      let teacher = true;
      let resultArray = searchArray;
      if ((this.state.student == false && event.target.name != "student") || 
          this.state.student == true && event.target.name == "student") {
        student = false;
      }
      if ((this.state.teacher == false && event.target.name != "teacher") || 
          this.state.teacher == true && event.target.name == "teacher") {
        teacher = false;
      }
      //use the matrix for the four cases
      if (student && (student != teacher)) {
        resultArray = searchArray.filter( hacker => hacker.role === "student");
      }
      if (teacher && (student != teacher)) {
        resultArray = searchArray.filter( hacker => hacker.role === "teacher");
      }
      if ((!student) && (!teacher)) {
        resultArray = searchArray;
      }
      if  (student && teacher) {
        resultArray = [];
      }
      //setState accordingly
      this.setState({
        [event.target.name]: event.target.checked,
        hackers: resultArray
      })
    }
  }

  render() {
    let hackerArray = this.state.hackers.map((user, index) => {
      return <Ironhacker 
        firstName={user.firstName}
        lastName={user.lastName}
        campus={user.campus}
        role={user.role}
        links={user.linkedin}
        key={index}
      />
    })

    let campusArray = users.map(user => {
      return user.campus
    });
    campusArray = Array.from(new Set(campusArray));
    console.log(campusArray);
    campusArray = campusArray.map((campus, index) => {
      return <CountryOption
        campus={campus}
        key={index}
        handleChange={this.handleChange}
        />
    })

    return(
      <div className="centered">
        <div>
          <input type="text" value={this.state.search} name="search" onChange={this.handleChange}/>
          <label htmlFor="teacher">Teacher: </label>
          <input id="teacher" type="checkbox" name="teacher" checked={this.state.teacher} onChange={this.handleChange}/>
          <label htmlFor="teacher">Student: </label>
          <input id="student" type="checkbox" name="student" checked={this.state.student} onChange={this.handleChange}/>
          <select onChange={this.handleChange} defaultValue="DEFAULT" name="" id="">
            <option value="DEFAULT" disabled>Select Campus</option>
            {campusArray}
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {hackerArray}
          </tbody>
        </table>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <h1>IronBook</h1>
      <Ironhackers />
    </div>
  );
}

export default App;
