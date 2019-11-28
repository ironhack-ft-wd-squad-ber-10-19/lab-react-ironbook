import React, { Component } from "react";
import "./App.css";

import users from "./users";

import IronList from "./Components/IronList";

class App extends Component {
  state = {
    ironList: users,
    firstName: "",
    teacher: true,
    student: true,
    campus: [],
    selectedCampus: ""
  };

  // users.reduce(
  //   (a, b) => a.campus !== b.campus && a.concat(b.campus),
  //   []
  // )

  filterCampus = () => {
    return (this.campus = users.map(urser => {
      if (this.state.campus.indexOf(urser.campus) === -1) {
        this.state.campus.push(urser.campus);
        return;
      }
    }));
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.name]:
          event.target.name === "teacher" || event.target.name === "student"
            ? event.target.checked
            : event.target.value
      },
      () => this.handleSearch()
    );
  };

  handleSearch = () => {
    console.log(new RegExp(this.state.firstName, "gi"));
    // let firstname = new RegExp(this.state.firstName, "gi");

    let firstNameFilter = users.filter(user => {
      if (this.state.firstName === "") {
        return user;
      } else {
        return (
          user.firstName
            .toLowerCase()
            .includes(this.state.firstName.toLowerCase()) && user
        );
      }
    });

    let roleFilter = firstNameFilter.filter(user => {
      if (this.state.teacher && this.state.student) {
        return user;
      } else if (this.state.teacher) {
        return user.role === "teacher" && user;
      } else if (this.state.student) {
        return user.role === "student" && user;
      } else {
        return;
      }
    });

    let campusFilter = roleFilter.filter(user => {
      if (this.state.selectedCampus === "") {
        return user;
      } else if (user.campus === this.state.selectedCampus) {
        return user;
      }
    });

    this.setState({
      ironList: campusFilter
    });
  };

  render() {
    this.filterCampus();
    return (
      <div>
        <h1>IronBook</h1>
        <input
          type="text"
          name="firstName"
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
        <select
          name="country"
          name="selectedCampus"
          onChange={this.handleChange}
        >
          <option value="">Campus</option>
          {this.state.campus.map(el => {
            return (
              <option value={el} key={el}>
                {el}
              </option>
            );
          })}
        </select>
        <IronList users={this.state.ironList} />
      </div>
    );
  }
}

export default App;
