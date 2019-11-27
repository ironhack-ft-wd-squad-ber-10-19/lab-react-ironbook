import React from "react";
import "./App.css";
import users from "./users";

class Users extends React.Component {
  state = {
    users: users.slice(),
    search: "",
    teacher: false,
    student: false,
    campus: "All"
  };

  checkboxChange = event => {
    this.setState({
      [event.target.name]: event.target.checked
    });
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {}
    );
  };

  selectHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const campus = [...new Set(users.map(user => user.campus))];

    const filter = [...users];
    let usersFiltered = filter.filter(el => {
      return el.firstName
        .toLowerCase()
        .concat(el.lastName.toLowerCase())
        .includes(this.state.search.toLowerCase());
    });

    if (this.state.teacher && this.state.student) {
      usersFiltered = usersFiltered.filter(el => {
        return el.role === "Student" && el.role === "teacher";
      });
    }

    if (this.state.teacher) {
      usersFiltered = usersFiltered.filter(el => {
        return el.role === "teacher";
      });
    }
    if (this.state.student) {
      usersFiltered = usersFiltered.filter(el => {
        return el.role === "student";
      });
    }

    if (this.state.campus !== "") {
      usersFiltered = usersFiltered.filter(user => {
        return user.campus === this.state.campus;
      });
    }

    const user = usersFiltered.map((el, index) => {
      return (
        <tbody key={index}>
          <tr>
            <td>{el.firstName}</td>
            <td>{el.lastName}</td>
            <td>{el.campus}</td>
            <td>{el.role}</td>
            <td>{el.linkedin}</td>
          </tr>
        </tbody>
      );
    });
    return (
      <div>
        <h1>IronBook</h1>

        <label htmlFor="search"></label>
        <input
          type="text"
          name="search"
          id="search"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Search by name"
        />

        <label htmlFor="teacher">Teacher</label>
        <input
          type="checkbox"
          name="teacher"
          id="teacher"
          checked={this.state.teacher}
          onChange={this.checkboxChange}
        />

        <label htmlFor="student">Student</label>
        <input
          type="checkbox"
          name="student"
          id="student"
          checked={this.state.student}
          onChange={this.checkboxChange}
        />

        <label htmlFor="campus">Campus</label>
        <select name="campus" id="campus" onChange={this.selectHandler}>
          {campus.map((campus, index) => {
            return <option key={index}>{campus}</option>;
          })}
        </select>
        <table>
          <thead>
            <tr>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Campus</td>
              <td>Role</td>
              <td>Links</td>
            </tr>
          </thead>
          {user}
        </table>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Users />
    </div>
  );
}

export default App;
