import './App.css';
import users from './users.json'
import React, { Component } from 'react'


export default class App extends Component {

  state = {
    usersList: users,
    search: ''
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  handleSearch = event => {
      const filteredUsers = users.filter( person =>
        person.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || person.lastName.toLowerCase().includes(event.target.value.toLowerCase())
        );
      // console.log(event.target.value)
      this.setState((state,props) => ({
        usersList: filteredUsers,
        search: event.target.value
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

