import './App.css';
import users from "./users";
import React, { Component } from 'react';

export default class App extends Component {

  state = {
    users: users,
    search: '',
    student: true,
    teacher: true,
    campus: ''
  }

  handleChange = event => {
    console.log('CHANGE')
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  render() {
    const filtered = users.filter(user => 
      (user.firstName.includes(this.state.search) || 
      user.lastName.includes(this.state.search)) &&
      (this.state.student && user.role === 'student') &&
      (this.state.teacher && user.role === 'teacher') &&
      (this.state.campus === 'Berlin' && user.campus === 'Berlin') ||
      (this.state.campus === 'Paris' && user.campus === 'Paris') ||
      (this.state.campus === 'Lisbon' && user.campus === 'Lisbon')
    );
    console.log('STATE', this.state, 'FILTERED',filtered)

    return (
      <div className="App">

        <h1>IronBook</h1>
{/* SEARCH */}
        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
        />
{/* STUDENT */}
        <input 
          type="checkbox" 
          id="student" 
          name="student" 
          value={this.state.student}
          onChange={this.handleChange} />
        <label htmlFor="student">Student</label>
{/* TEACHER */}
        <input 
          type="checkbox" 
          id="teacher" 
          name="teacher" 
          value={this.state.teacher}
          onChange={this.handleChange} />
        <label htmlFor="teacher">Teacher</label>
{/* CAMPUS */}
        <label htmlFor="campus">Campus:</label>
        <select name="campus" id="campus" onChange={this.handleChange}>
          <option value="All">All</option>
          <option value="Berlin">Berlin</option>
          <option value="Paris">Paris</option>
          <option value="Lisbon">Lisbon</option>
        </select>
        <table>
          <thead>
            <tr>
              <td><strong>First Name</strong></td>
              <td><strong>Last Name</strong></td>
              <td><strong>Campus</strong></td>
              <td><strong>Role</strong></td>
              <td><strong>Links</strong></td>
            </tr>
          </thead>
          <tbody>
          {
            filtered.map(user => {
              return (
                <tr>
                  <td>{ user.firstName }</td>
                  <td>{ user.lastName }</td>
                  <td>{ user.campus }</td>
                  <td>{ user.role }</td>
                  { user.linkedin && <td><a href={ user.linkedin }><img src="./linkedin-icon.svg" style={{width: '15px'}} alt="linkedin"/></a></td>}
                </tr>
              )
            })
          }
          </tbody>
        </table>
    </div>
    )
  }
}