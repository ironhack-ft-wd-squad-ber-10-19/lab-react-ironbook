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
    search: "",
    teacher: false,
    student: false,
    campus: "",
    role: ""

  }

  handleChange = event => {
    if (event.target.type === "select-one") {
      console.log(event.target.value);
      this.setState({
        [event.target.name]: event.target.value
      }, () => console.log(this.state.campus))
    }
    else if (event.target.type === "text") {
      console.log(event.target.value);
      let searchTerm = '';
      searchTerm = capitalizeFirstLetter(event.target.value);
      this.setState({
        [event.target.name]: searchTerm
      }, () => console.log(this.state.search))
    }
    else if (event.target.type === "checkbox") {
      let role = "";
      let student = true;
      let teacher = true; 
      if ((this.state.student == false && event.target.name != "student") || 
          this.state.student == true && event.target.name == "student") {
        student = false;
      }
      if ((this.state.teacher == false && event.target.name != "teacher") || 
          this.state.teacher == true && event.target.name == "teacher") {
        teacher = false;
      }

      if (student && (student != teacher)) {
        role = "student";
      }
      if (teacher && (student != teacher)) {
        role = "teacher";
      }
      if ((!student) && (!teacher)) {
        role = "";
      }
      if  (student && teacher) {
        role = "both";
      }
      //setState accordingly
      this.setState({
        role: role,
        teacher: teacher,
        student: student
      }, () => console.log(this.state.role))
    }
  }

  render() {
    console.log(this.state);
    
    let resultArray = users.slice("");

    if (this.state.search != "") {
      resultArray = resultArray.filter( (user) => (user.firstName.includes(this.state.search) || user.lastName.includes(this.state.search)))
    }

    if (this.state.role != "") {
      resultArray = resultArray.filter( (user) => (user.role === this.state.role))
    }

    if (this.state.campus != "") {
      resultArray = resultArray.filter( (user) => (user.campus === this.state.campus))
    } 

    let hackerArray = resultArray.map((user, index) => {
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
          <select onChange={this.handleChange} defaultValue="DEFAULT" name="campus" id="">
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