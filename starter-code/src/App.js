import React, { Component } from 'react'
import users from "./users";
import './App.css';

export default class App extends Component {
  state = {
    search: "",
    users: users,
    teacher: false,
    student: false,
    campus: "All"
  }

  handleChange = event => {
    this.setState({
        search: event.target.value
      }, () => this.handleSearch())
    }
  handleSearch = () => {
    const {search} = this.state;
    const newSearch = users.filter(user => {
      if (this.state.teacher){
        return user.role === "teacher" && (user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search));
      } else if (this.state.student){
        return user.role === "student" && (user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search));
      } else {
        return user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search);
      }
    })
    this.setState({
      users: newSearch
    })
  }
    handleStudents = event => {
    const filteredStudents = this.state.users.filter(user => {
      if (event.target.checked) {
        return user.role === "student"
      } else {
        return user
      }
    })
    this.setState({
    student: event.target.checked,
    users: filteredStudents
    })
  }
  handleTeachers = event => {
    const filteredStudents = this.state.users.filter(user => {
      if (event.target.checked) {
        return user.role === "teacher"
      } else {
        return user
      }
    })
    this.setState({
    teacher: event.target.checked,
    users: filteredStudents
    })
  }
  handleSelection = event => {
    console.log(event.target.value);
    const filteredByCampus = users.filter(user => {
      if (event.target.value === "All") {
        return user
      }
      return  user.campus == event.target.value
    })
    this.setState({
      users: filteredByCampus
    })

  }
  render() {
      const usersList = this.state.users.map(user => {
    return (
      <tr key={user.id}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.campus}</td>
        <td>{user.role}</td>
      </tr>
    )
  })
    return (
         <div className="App">
      <h1>Ironbook</h1>


    <label htmlFor="search">Search by First Name of Last Name: </label>
    <input type="text" name="search" id="search" value={this.state.search} onChange={this.handleChange} />
    <label htmlFor="student">Student</label>
    <input type="checkbox" name="student" id="student" checked={this.state.student} onChange={this.handleStudents} />
    <label htmlFor="teacher">Teacher</label>
    <input type="checkbox" name="teacher" id="teacher" checked={this.state.teacher} onChange={this.handleTeachers} />
    <select id="campus" onChange={this.handleSelection}>
  <option value="All">All</option>
  <option value="Paris">Paris</option>
  <option value="Lisbon">Lisbon</option>
  <option value="Berlin">Berlin</option>
</select>

      <tbody>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Campus</th>
        <th>Role</th>
      </tr>
      {usersList}
      </tbody>

      </div>
    )
  }
}

