import './App.css';
import users from './users.json'
import React, { Component } from 'react'


export default class App extends Component {

  state = {
    usersList: users,
    search: '',
    student: '',
    teacher: '',
    campus: '',
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  handleSearch = event => {
      const filteredUsers = users.filter( person =>
        person.firstName.toLowerCase().includes(event.target.value.toLowerCase()) 
        || 
        person.lastName.toLowerCase().includes(event.target.value.toLowerCase())
        );
      // console.log(event.target.value)
      this.setState((state,props) => ({
        usersList: filteredUsers,
        search: event.target.value
      }))
    }

    handleStudent = event => {
      const filteredUsers = users.filter(person=>{
        if(event.target.checked)
        return person.role ==='student'
        else
        return person
      });
      this.setState((state,props) => ({
        usersList: filteredUsers,
        student: event.target.checked
      }))
    }

    handleTeacher = event => {
      const filteredUsers = users.filter(person=>{
        if(event.target.checked)
        return person.role === 'teacher'
        else
        return person
      });
      this.setState((state,props) => ({
        usersList: filteredUsers,
        teacher: event.target.checked
      }))
    }

    handleCampus = event => {
      const filteredUsers = users.filter(person=>{
        if(event.target.value === 'Berlin')
        return person.campus === 'Berlin'
        if(event.target.value === 'Paris')
        return person.campus === 'Paris'
        if(event.target.value === 'Lisbon')
        return person.campus === 'Lisbon'

        else
        return person
      });
      console.log(event.target.value)
      this.setState((state,props) => ({
        usersList: filteredUsers,
        campus: event.target.value
      }))
    }



  


  

  render() {
    return (
      <div>

      <h1>Ironbook</h1>
      <form onSubmit={this.handleSubmit}>
      <input 
      type="search"
      id='search'
      name='search'
      placeholder="Search with First or Last name..."
      value={this.state.search} 
      onChange={this.handleSearch}        
      />
      </form>

      <label htmlFor="student">Student</label>
      <input
      type="checkbox"
      name="student"
      id="student"
      checked={this.state.student}
      onChange={this.handleStudent}
      />

      <label htmlFor="teacher">Teacher</label>
      <input
      type="checkbox"
      name="teacher"
      id="teacher"
      checked={this.state.teacher}
      onChange={this.handleTeacher}
      />

      <label htmlFor="campus">Campus:</label>
      <select value={this.state.campus} onChange={this.handleCampus}>
      <option value='All'>All</option>
      <option value='Paris'>Paris</option>
      <option value='Berlin'>Berlin</option>
      <option value='Lisbon'>Lisbon</option>
      </select>


      <table>
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
        {this.state.usersList.map (user => {
          return (
            <tr key={user.id}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.campus}</td>
          <td>{user.role}</td>
          <td>{user.linkedin}</td>
            </tr>
          )          
        })}
      </tbody>
      </table>

    </div>
    )
  }
}

