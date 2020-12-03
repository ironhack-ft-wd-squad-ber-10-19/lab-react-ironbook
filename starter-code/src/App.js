import React, { Component } from "react";
import "./App.css";
import users from "./users";

class Users extends Component {
  state = {
    usersList: users,
    search: "",
    teacher: false,
    student: false,
    campus: "",
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

    if (this.state.campus) {
      filteredUsers = filteredUsers.filter((filteredUser) => {
        return filteredUser.campus === this.state.campus;
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
        <div style={{ display: "flex" }}>
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
            <label htmlFor="campus">Campus: </label>
            <select
              name="campus"
              value={this.state.campus}
              onChange={this.handleChange}
            >
              <option value="">Choose campus</option>
              <option value="Paris">Paris</option>
              <option value="Berlin">Berlin</option>
              <option value="Lisbon">Lisbon</option>
            </select>

            <button className="button is-primary">Submit</button>
          </form>
        </div>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
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
                  {user.linkedin && (
                    <td>
                      <a href={user.linkedin}>
                        <img src="/linkedin.png" height="20px" alt="linkedin" />
                      </a>
                    </td>
                  )}
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
