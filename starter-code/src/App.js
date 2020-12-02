import './App.css';
import allUsers from './users.json'
import React, { Component } from 'react'

export default class App extends Component {

  state={
    users:allUsers,
    searchTerm:'',
    teacher:false,
    student:false,
    campus:''
  }

  handleSubmit=event=>{
    event.preventDefault();
  }

  handleSearch=event=>{
    const filteredUsers=allUsers.filter(user=>
      user.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || user.lastName.toLowerCase().includes(event.target.value.toLowerCase())
      );
    // console.log(event.target.value)
    this.setState((state,props)=>({
      teacher: this.state.teacher,
      student:this.state.student,
      campus:this.state.campus,
      searchTerm:event.target.value,
      users:filteredUsers
    }))
  }

  handleTeacher=event=>{
    const filteredUsers=allUsers.filter(user=>{
      if(event.target.checked)
      return user.role.toLowerCase()==='teacher'
      else
      return user
    });
    // console.log(filteredUsers)
    this.setState((state,props)=>({
      student:this.state.student,
      campus:this.state.campus,
      teacher:event.target.checked,
      users:filteredUsers
    }))
  }

  handleStudent=event=>{
    const filteredUsers=allUsers.filter(user=>{
      if(event.target.checked)
      return user.role.toLowerCase()==='student'
      else
      return user
    });
    // console.log(filteredUsers)
    this.setState((state,props)=>({
      teacher:this.state.teacher,
      campus:this.state.campus,
      student:event.target.checked,
      users:filteredUsers
    }))
  }

  handleCampus=event=>{
    const filteredUsers=allUsers.filter(user=>
      user.campus.includes(event.target.value)
    );
    // console.log(filteredUsers)
  
    this.setState((state,props)=>({
      student:this.state.student,
      teacher:this.state.teacher,
      campus:event.target.value,
      users:filteredUsers
    }))
  }

  render() {
    return (
        <div className="App">

      <h1>IronBook</h1>

      <form onSubmit={this.handleSubmit}>
        <input id="search-bar"
        type="text"
        name='search'
        value={this.state.search}
        placeholder='Search by name'
        onChange={this.handleSearch}
        />
        <br/>
        <div id="options-container">

        <input id="student-checkbox"
        name="student" 
        type="checkbox"
        value={this.state.student}
        onChange={this.handleStudent}  
        />
        <label htmlFor="student">Student</label>

        <input id="teacher-checkbox"
        name="teacher"
        type="checkbox"
        value={this.state.teacher}
        onChange={this.handleTeacher}
        />
        <label htmlFor="teacher">Teacher</label>



        <label className="campus-select" htmlFor="campus">Campus:</label>
        <select className="campus-select"
        name="campus"
        value={this.state.campus}
        onChange={this.handleCampus}>
          <option value="">Select an option</option>
          <option value="Berlin">Berlin</option>
          <option value="Lisbon">Lisbon</option>
          <option value="Paris">Paris</option>
        </select>
        </div>
      </form>

      <br/>
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
          <tbody>
            {
              this.state.users.map((user)=>{
                return(
                <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.campus}</td>
                  <td>{user.role}</td>
                  <td>
                  {user.linkedin && <a href={user.linkedin}><img style={{width:'15px'}}src="./linkedin.png" alt=""/></a>}
                  </td>
                </tr>
                )
              })
            }
          </tbody>
      </table>
    </div>
    )
  }
}

