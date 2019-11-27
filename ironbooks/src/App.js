import React, { Component } from "react";
import "./App.css";
import users from "./users";

/*---------------------------------------------------------*/
//ONE USER

const User = props => {
  console.log(props);

  return (
    <tbody>
      <tr>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.campus}</td>
        <td>{props.role}</td>
        {props.linkedin ? (
          <td>
            <a href={props.linkedin}>LinkedIn</a>
          </td>
        ) : (
          <td> </td>
        )}
      </tr>
    </tbody>
  );
};

/*---------------------------------------------------------*/
//LIST OF USERS

const UserList = props => {
  return props.users.map(user => {
    return (
      <User
        firstName={user.firstName}
        lastName={user.lastName}
        campus={user.campus}
        role={user.role}
        linkedin={user.linkedin}
      />
    );
  });
};

/*---------------------------------------------------------*/
//COMPONENT

class App extends Component {
  state = {
    users: users,
    isStudent: true,
    isTeacher: true
  };

  /*---------------------------------------------------------*/
  //search by name

  handleChange = event => {
    let searchTerm = event.target.value.toLowerCase();
    console.log("search term: ", searchTerm);
    let usersCopy = [...users];

    console.log(usersCopy);

    let match = [];
    usersCopy.forEach(copy => {
      if (
        copy.firstName.toLowerCase().includes(searchTerm) ||
        copy.lastName.toLowerCase().includes(searchTerm)
      ) {
        match.push(copy);
      }
      this.setState({
        users: match,
        [event.target.name]: searchTerm
      });
    });
  };

  /*---------------------------------------------------------*/
  //checkbox search

  handleCheckboxChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.checked
      },
      () => {
        let usersCopy = [...users];
        let teachers = usersCopy.filter(user => user.role.includes("teacher"));
        let students = usersCopy.filter(user => user.role.includes("student"));

        // both true or false --> render usersCopy-array
        if (
          (this.state.isStudent && this.state.isTeacher) ||
          (!this.state.isStudent && !this.state.isTeacher)
        ) {
          this.setState({
            users: usersCopy
          });
        }
        // isTeacher==true and isStudent==false --> render teachers-array
        if (this.state.isTeacher && !this.state.isStudent) {
          this.setState({
            users: teachers
          });
        }
        // isTeacher==false and isStudent=true --:> render students-array
        if (!this.state.isTeacher && this.state.isStudent) {
          this.setState({
            users: students
          });
        }
      }
    );
  };

  /*---------------------------------------------------------*/
  //campus select

  handleSelectChange = event => {
    let chosenCampus = event.target.value;
    this.setState(
      {
        [event.target.name]: chosenCampus
      },
      () => {
        let usersCopy = [...users];
        let filtered = usersCopy.filter(user =>
          user.campus.toLowerCase().includes(chosenCampus)
        );
        this.setState({
          users: filtered
        });
      }
    );
  };

  /*---------------------------------------------------------*/
  //RENDER

  render() {
    return (
      <div className="App">
        <h1>IronBook</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            name="search"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="checkbox"
            id="isStudent"
            name="isStudent"
            checked={this.state.isStudent}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="isStudent">Student </label>

          <input
            type="checkbox"
            id="isTeacher"
            name="isTeacher"
            checked={this.state.isTeacher}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="isTeacher">Teacher </label>

          <label htmlFor="campus">Campus: </label>
          <select onChange={this.handleSelectChange}>
            <option value="berlin">Berlin</option>
            <option value="lisbon">Lisbon</option>
            <option value="paris">Paris</option>
          </select>
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
          <UserList users={this.state.users} />
        </table>
      </div>
    );
  }
}

export default App;
