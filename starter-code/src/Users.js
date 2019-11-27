import React, { Component } from 'react';
import users from './users.json'
import User from './User';

class Users extends Component {
  state = {
    search: "",
    users: [...users],
    searchedUsers: [...users],
    teacherCheckbox: true,
    studentCheckbox: true,
  }

  updateTable = () => {
    const filteredUsers = [...this.state.users].filter(user => {
      if (user.role === 'teacher') {
        return user.firstName.toLowerCase().concat(user.lastName.toLowerCase()).includes(this.state.search) && this.state.teacherCheckbox
      }
      if (user.role === 'student') {
        return user.firstName.toLowerCase().concat(user.lastName.toLowerCase()).includes(this.state.search) && this.state.studentCheckbox
      }
    });
    this.setState({
      searchedUsers: filteredUsers
    });
  }

  handleSearch = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.updateTable())
  }

  handleCheckbox = event => {
    // console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.checked
    }, () => this.updateTable());
  }

  render() {
    return (
      <div>
        <input onChange={this.handleSearch} value={this.state.search} name="search" id="search" type="text" placeholder="Search"/>
        <div className="checkboxes">
          <label className="checkbox-container" htmlFor="teacherCheckbox">Teachers
            <input type="checkbox" name="teacherCheckbox" className="checkbox" id="teacherCheckbox" onChange={this.handleCheckbox} checked={this.state.teacherCheckbox}/>
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container" htmlFor="student">Students
            <input type="checkbox" name="studentCheckbox" className="checkbox"id="studentCheckbox" onChange={this.handleCheckbox} checked={this.state.studentCheckbox} />
            <span className="checkmark"></span>
          </label>
        </div>
        <table className="table-container">
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
              this.state.searchedUsers.map((user, index) => {
                return (
                  <User key={index} firstName={user.firstName} lastName={user.lastName} campus={user.campus} role={user.role} links={user.linkedin} />
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Users;