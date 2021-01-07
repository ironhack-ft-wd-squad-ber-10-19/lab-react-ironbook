import React from 'react';
import './App.css';
import users from "./users";

class App extends React.Component {

  state = {
    usersList: users,
    searchName: '',
    filteredUsers: users,
    isStudent: false,
    isTeacher: false,
    campus: "allCampuses"
  }

  searchForName = (event) => {
    // onsole.log(event.target.value);
    // console.log(this.state.isStudent);
    // console.log(this.state.usersList[0].firstName.toLowerCase().includes(event.target.value));

    if (this.state.isStudent === true) {
      this.setState({
        filteredUsers: 
          this.state.usersList.filter(user => 
          user.role === "student" &&
          (user.firstName.toLowerCase().includes(event.target.value) || 
          user.lastName.toLowerCase().includes(event.target.value))),
        
        searchName: event.target.value,
      })
    } else if (this.state.isTeacher === true) {
      this.setState({
        filteredUsers: 
          this.state.usersList.filter(user => 
          user.role === "teacher" &&
          (user.firstName.toLowerCase().includes(event.target.value) || 
          user.lastName.toLowerCase().includes(event.target.value))),
        
        searchName: event.target.value,
      })
    } else {
      this.setState({
        filteredUsers: 
          this.state.usersList.filter(user => 
          user.firstName.toLowerCase().includes(event.target.value) || 
          user.lastName.toLowerCase().includes(event.target.value)),
        
        searchName: event.target.value,
      })
    }
    
  }


  handleStudentCheckbox = event => {
    // console.log(event.target.value);
    
    const newStudentList = this.state.usersList.filter(user => {
      return (event.target.checked ? user.role === "student" : user);
    });

    // console.log("filtered student", newStudentList)

    this.setState({
      isStudent: event.target.checked,
      filteredUsers: newStudentList
    })
  }

  handleTeacherCheckbox = event => {
    // console.log(event.target.value);
    
    const newTeacherList = this.state.usersList.filter(user => {
      return (event.target.checked ? user.role === "teacher" : user);
    });

    // console.log("filtered teacher", newTeacherList)

    this.setState({
      isTeacher: event.target.checked,
      filteredUsers: newTeacherList
    })
  }

  handleCampus = event => {
    console.log(event.target.value);

    const filteredCampuses = this.state.usersList.filter(user => {
      if (event.target.value === "allCampuses") {
        return user
      } else {
        return user.campus === event.target.value
      }
    });

    this.setState({
      filteredUsers: filteredCampuses
    })
  }
  
  
  
  
  render() {
    // console.log("users" , users);
    

    return (
      
      <div className="App">
        <h1>IronBook</h1>
        <input 
          type="text" 
          placeholder="Search.."
          name="searchName"
          value={this.state.searchName}
          onChange={this.searchForName}
        >
        </input>
        <br />
        <label htmlFor="isStudent">Student</label>
          <input
            type="checkbox"
            name="isStudent"
            checked={this.state.role}
            onChange={this.handleStudentCheckbox}
          />
          <label htmlFor="isTeacher">Teacher</label>
          <input
            type="checkbox"
            name="isTeacher"
            checked={this.state.role}
            onChange={this.handleTeacherCheckbox}
          /><br /><br />
          <select name="campus"
          onChange={this.handleCampus}
          >
          <option key={"all"} value="allCampuses">All Campuses</option>
          <option key={"berlin"} value="Berlin">Berlin</option>
          <option key={"lisbon"} value="Lisbon">Lisbon</option>
          <option key={"paris"} value="Paris">Paris</option>
          </select>
          <br /><br />
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
            {this.state.filteredUsers.map((user) => {
              return (
                <tr key={`${user.firstName} ${user.lastName}`}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.campus}</td>
                <td>{user.role}</td>
                <td>{user.linkedin && <img className="linkedin" src="./linkedin.png" alt="has linkedin" />}</td>
                </tr> 
              )
            })}
          </tbody>
        </table>
      </div>
    );



  }

}

export default App;
