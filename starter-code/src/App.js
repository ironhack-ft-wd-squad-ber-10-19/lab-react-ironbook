import React, { Component } from "react";
import "./App.css";
import users from "./users";

class Users extends Component {
  state = {
    usersList: users,
    search: "",
    teacher: false,
    student: false,
  };

  handleChange = (e) => {
    // console.log(e.target.name);
    const attributeName = e.target.name;
    const target = e.target;
    // console.log(e.target);
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [attributeName]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let filteredUsers = users.filter((user) => {
      console.log(user);
      // const filteredUsers=allUsers.filter(user=>
      if (
        user.firstName
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.state.search.toLowerCase())
      ) {
        return user.firstName || user.lastName;
      }
      // );

      // return (
      //   user.firstName.toLowerCase() === this.state.search.toLowerCase() ||
      //   user.lastName.toLowerCase() === this.state.search.toLowerCase()
      // );
    });

    if (this.state.student) {
      filteredUsers = filteredUsers.filter((filteredUser) => {
        return filteredUser.role === "student";
      });
    }

    if (this.state.teacher) {
      filteredUsers = filteredUsers.filter((filteredUser) => {
        return filteredUser.role === "teacher";
      });
    }
    
    this.setState({
      usersList: filteredUsers,
    });
  };

  render() {
    return (
      <div>
        <h1>IronBook</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchField"></label>
          <input
            type="text"
            name="search"
            id="searchField"
            value={this.state.search}
            onChange={this.handleChange}
          />

          <label htmlFor="teacher">Teacher</label>
          <input
            type="checkbox"
            name="teacher"
            id="teacher"
            checked={this.state.teacher}
            onChange={this.handleChange}
          />
          <label htmlFor="student">Student</label>
          <input
            type="checkbox"
            name="student"
            id="student"
            checked={this.state.student}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usersList.map((user, index) => {
              {
                /* console.log(user); */
              }
              return (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.campus}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Users />
    </div>
  );
}

export default App;
