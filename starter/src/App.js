import React, { Component } from 'react';
import './App.css';
import users from "./users";
import linkedin from "./linkedin.png"; 

export default class App extends Component {
  state = {
    users: users,
    search: '',
    teacher: false,
    student: false,
    campus: ''
  }

  handleInputChange = event => {
    this.setState({
      search: event.target.value
    })
  };

  handleCheckbox = event => {
    this.setState({
     [event.target.name]: event.target.checked
    })
  }

  handleCampus = event => {
    this.setState({
      campus: event.target.value
    })
  }

  render() {

    //Search

    let filteredArr = users.filter(user => {
      return (
        user.firstName.toLowerCase()
        .startsWith(this.state.search.toString().toLowerCase()) ||
        user.lastName.toLowerCase()
        .startsWith(this.state.search.toString().toLowerCase())
      );
    });

    //Checkbox

    if (this.state.teacher && this.state.student) {
      //
    } else if (this.state.student) {
      filteredArr = filteredArr.filter(user => {
        return user.role === "student";
      });
    } else if (this.state.teacher) {
      filteredArr = filteredArr.filter(user => {
        return user.role === "teacher";
      });
    }

    //Campus

    let campusArr = [...new Set(users.map(user => user.campus))];

    if (this.state.campus === ''){
      //
    } else {
      filteredArr = filteredArr.filter(user => {
        return user.campus === this.state.campus
      })
    }

    return (
      <div>
        <h1>IronBook</h1>
        <div className="searchForm">
        <form>
        <label htmlFor="searchbar"> Search for name: </label>
          <input
            placeholder="First or last name "
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <label htmlFor="teacher"> Teacher: </label>
          <input
            type="checkbox"
            name="teacher"
            id="teacher"
            checked={this.state.teacher}
            onChange={this.handleCheckbox}
          />
           <label htmlFor="student"> Student: </label>
          <input
            type="checkbox"
            name="student"
            id="student"
            checked={this.state.student}
            onChange={this.handleCheckbox}
          />


        <label htmlFor="campus"> Campus: &nbsp;
          <select name="campus" id="campus" onChange={this.handleCampus}>
          {campusArr.map(campus => {
            return <option value={campus}>{campus}</option>
          })}
          </select>
        </label>

    
    



        </form>
        </div>
        <table>
         <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Campus</th>
            <th>Role</th>
            <th>Links</th>
          </tr>
          { filteredArr.map(user => {
                return (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.campus}</td>
            <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
            <td>
            {user.linkedin && <a href={user.linkedin}><img src={linkedin} width="20"></img></a>}
            </td>
          </tr>
                )}
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

