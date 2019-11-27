import React, { Component } from "react";
import "./App.css";
import users from "./users";

const StudentList = props => {
  // console.log(props);
  let studentsDisplay = props.students.map((el, index) => {
    return (
      <tr key={index}>
        <td>{el.firstName}</td>
        <td>{el.lastName}</td>
        <td>{el.campus}</td>
        <td>{el.role}</td>

        {el.linkedin ? (
          <td>
            <a href={el.linkedin}>
              <img
                width="15"
                src="https://www2.le.ac.uk/offices/careers-new/copy2_of_images/linkedin-logo/image"
              ></img>
            </a>
          </td>
        ) : (
          <td> </td>
        )}
      </tr>
    );
  });
  return studentsDisplay;
};

const Options = props => {
  let campusCity = [...users].map((el, index) => {
    return el.campus;
  });

  let uniqueCities = new Set(campusCity);
  const campusOptions = Array.from(uniqueCities).map((el, index) => {
    return (
      <option name={el} value={el}>
        {el}
      </option>
    );
  });

  return campusOptions;
};

class App extends Component {
  state = {
    students: [...users],
    search: ""
    // [event.target.name]: false
  };

  handleChange = event => {
    // console.log(event.target.value);
    // console.log(event.target.checked);
    // console.log(event.target.name);

    this.setState({
      search: event.target.value
    });
  };

  handleSelectChange = event => {
    console.log(event.target.value);
    this.setState({
      select: event.target.value
    });
  };

  handleCheckboxChange = event => {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.checked
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log("student", this.state.student);
    console.log("teacher", this.state.teacher);

    let filteredStudents = [...users].filter(
      el =>
        el.firstName.includes(this.state.search) ||
        el.lastName.includes(this.state.search)
    );

    if (
      (this.state.student && this.state.teacher) ||
      (!this.state.student && !this.state.teacher)
    ) {
      filteredStudents = filteredStudents;
    } else if (this.state.student) {
      filteredStudents = filteredStudents.filter(el => el.role === "student");
    } else {
      filteredStudents = filteredStudents.filter(el => el.role === "teacher");
    }

    if (this.state.select !== "") {
      filteredStudents = filteredStudents.filter(
        el => el.campus === this.state.select
      );
    }

    // console.log("filter", filteredStudents);
    this.setState({
      students: filteredStudents,
      search: ""
    });
  };

  render() {
    // console.log(this.state.students);
    return (
      <div className="App">
        <h1>Ironbook</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search"></label>
          <input
            type="text"
            id="search"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
          ></input>
          <label htmlFor="isStudent">Student</label>
          <input
            type="checkbox"
            name="student"
            id="isStudent"
            checked={this.state.isStudent}
            onChange={this.handleCheckboxChange}
          ></input>
          <label htmlFor="isTeacher">Teacher</label>
          <input
            type="checkbox"
            name="teacher"
            id="teacher"
            checked={this.state.isTeacher}
            onChange={this.handleCheckboxChange}
          ></input>

          <select onChange={this.handleSelectChange}>
            <option name="" value=""></option>
            <Options />
          </select>
        </form>

        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Campus</th>
            <th>Role</th>
            <th>Link</th>
          </tr>
          <StudentList students={this.state.students} />
        </thead>
      </div>
    );
  }
}

export default App;
