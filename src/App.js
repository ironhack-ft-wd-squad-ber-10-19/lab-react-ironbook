// import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import allUsers from './users'

export default class App extends Component {
  state = {
    users: allUsers,
    searchTerm: '',
    teacher: false,
    student: false
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  // handleSearch = event => {
  //   console.log(event.target.value)
  //   this.setState((state,props) => ({
  //     users: state.users.filter(person => person.firstName.toLowerCase().includes(event.target.value) || person.lastName.toLowerCase().includes(event.target.value)),
  //     searchTerm: event.target.value
  //   }))
  // }

  handleSearch=event=>{
    const filteredUsers=allUsers.filter(person=>
      person.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || person.lastName.toLowerCase().includes(event.target.value.toLowerCase())
      );
    // console.log(event.target.value)
    this.setState((state,props)=>({
      searchTerm:event.target.value,
      users:filteredUsers
    }))
  }

  handleTeacher = event => {
    console.log(event.target.checked)
    const filteresUser = allUsers.filter(person => {
      if(event.target.checked) 
      return person.role.toLowerCase() === 'teacher'
      else 
      return person
    })

    this.setState((state, props) => ({
      techer: event.target.checked,
      users: filteresUser
    }))
  }

  handleStudent=event=>{
    const filteredUsers=allUsers.filter(person=>{
      if(event.target.checked)
      return person.role.toLowerCase()==='student'
      else
      return person
    });
    // console.log(filteredUsers)
    this.setState((state,props)=>({
      student:event.target.checked,
      users:filteredUsers
    }))
  }

  handleCampus=event=>{
    const filteredUsers=allUsers.filter(person=>
      person.campus.includes(event.target.value)
    );
    // console.log(filteredUsers)
    this.setState((state,props)=>({
      campus:event.target.value,
      users:filteredUsers
    }))
  }

  render() {
    return (
      <div className="App">
        <h1>IronBook</h1>
        
        <form onSubmit={this.handleSubmit}>
        <input 
        type="search" 
        id="search" 
        name="search" 
        value={this.state.firstName || this.state.lastName} 
        onChange={this.handleSearch}/>

        <label htmlFor="isTeacher">Teacher</label>
        <input
        type="checkbox"
        name="isTeacher"
        id="isTeacher"
        value={this.state.role}
        onChange={this.handleTeacher}
        />

        <label htmlFor="isStudent">Student</label>
        <input
        type="checkbox"
        name="isStudent"
        id="isStudent"
        value={this.state.role}
        onChange={this.handleStudent}/>
        </form>

        <label htmlFor="campus">Campus:</label>
        <select id="campus-select"
          name="campus"
          value={this.state.campus}
          onChange={this.handleCampus}>
            <option value="">Select an option</option>
            <option value="Berlin">Berlin</option>
            <option value="Lisbon">Lisbon</option>
            <option value="Paris">Paris</option>
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
                {
                  this.state.users.map((person) => {
                    return (
                      <tr key={person.firstname} data-key={person.firstname}>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.campus}</td>
                        <td>{person.role}</td>
                        {person.linkedin && <td><a href={person.linkedin}><img src={'/linkedin.png'} style={{width:"10px"}}alt=""/></a></td>}
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
