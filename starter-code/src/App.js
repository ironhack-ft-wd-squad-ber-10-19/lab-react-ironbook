
import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css';
import users from "./users";


// [
//   { "firstName": "Alec", "lastName": "Budd", "campus": "Berlin", "role": "student" },
// ]



class App extends Component {

  state = {
    userList: users,
    search: '',
    student: false,
    teacher: false,
  }

  handleStudents = event => {
    
    const filteredStudents = this.state.userList.filter(user => {
      if (event.target.checked) {
        return user.role === "student"
      } else {
        return user
      }
    })
    this.setState({
      student: event.target.checked,
      userList: filteredStudents
    })
  }

  handleTeachers = event => {
    
    const filteredTeachers = this.state.userList.filter(user => {
      if (event.target.checked) {
        return user.role === "teacher"
      } else {
        return user
      }
    })
    this.setState({
      teacher: event.target.checked,
      userList: filteredTeachers
    })
  }

  handleChange = event => {
    // event.preventDefault();
    console.log('rodger rodger')
    // const { name, value } = event.target

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
        search: event.target.value
      }, () => this.handleSearch())
    }

  handleSearch = () => {
    const {search} = this.state;

    const newSearch = users.filter(user => {
      if (this.state.teacher){
        return user.role === "teacher" &&
         user.lastName.toLowerCase().includes(search.toLowerCase()) 
        || user.firstName.toLowerCase().includes(search.toLowerCase()) ;

      } else if (this.state.student) {
        return user.role === "student" && 
        user.lastName.toLowerCase().includes(search.toLowerCase()) 
        || user.firstName.toLowerCase().includes(search.toLowerCase());
        
      } else {
        return user.lastName.toLowerCase().includes(search.toLowerCase()) 
        || user.firstName.toLowerCase().includes(search.toLowerCase());
      }
    })
    this.setState({
      userList: newSearch
    })
  }

  render() {
    const userList = 
      this.state.userList.map(user =>
      
        <tr key={user.id}> 

          <td>
            {user.firstName} 
          </td>

          <td>
            {user.lastName}
          </td>

          <td>
            {user.campus}
          </td>

          <td>
            {user.role}
          </td>

          <td>
            <a href = {user.linkedin ? user.linkedin : null } > 
              <img class="logo" 
                src= {user.linkedin ? "../linkedin.png" : null}
              /> 
            </a> 
          </td>
  
        </tr>  
    )
      


    return (
      <div className="App">
        <h1>IronBook</h1>

        <div>
          <label htmlFor="search">
            <input type ="text" name ="search" id= "search" placeholder=" Search by First or Last name.." 
              value={this.state.search} onChange={this.handleChange} 
              class="searchBar"
            />
          </label>
          <p>
  
            <label htmlFor="student">Student</label>
            <input
              type="checkbox"
              name="student"
              id="student"
              checked={this.state.student}
              onChange={this.handleStudents}
            // onChange={this.handleCheckboxChange}
            />
        

          <label htmlFor="teacher">Teacher</label>
            <input
              type="checkbox"
              name="teacher"
              id="teacher"
              checked={this.state.teacher}
              onChange={this.handleTeachers}
            // onChange={this.handleCheckboxChange}
            />

          </p>

            

        </div>

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
            {userList}
          </tbody>

        </table>

      </div>
    );
  }
}

export default App;


    //   if (this.state.teacher){
    //     return user.role === "teacher" && (user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search));
    //   } else if (this.state.student){
    //     return user.role === "student" && (user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search));
    //   } else {
    //     return user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search);
    //   }
    // })
    