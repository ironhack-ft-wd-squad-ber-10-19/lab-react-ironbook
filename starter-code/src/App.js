import React from 'react';
import './App.css';
import users from "./users.json";


class Search extends React.Component {
  state= {
    users: users,
    firstName: "",
    student: false,
    teacher: false
  }

  handleChange = event => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
      })
}


handleCheckboxChange = event => {
  console.log(this.state.student)
  this.setState({
    [event.target.name]: event.target.checked,
    })
}


render () {
let filteredUsers = this.state.users.filter((user) => { 
  if(this.state.student) {
    return user.role === "student" && user.firstName.toLowerCase().startsWith(this.state.firstName.toLowerCase());

  } 
  if(this.state.teacher) {
    return user.role === "teacher" && user.firstName.toLowerCase().startsWith(this.state.firstName.toLowerCase());
  }
  return user.firstName.toLowerCase().startsWith(this.state.firstName.toLowerCase());
});

  return (
    <div>
      <form>
        <label htmlFor="firstName">search</label>
        <input 
        type="text"
          name="firstName"
          id="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
      </form>

    <form>
    <label htmlFor="student">Student</label>
    <input 
    type="checkbox" 
    name="student" 
    id="student"
    checked={this.state.student}  
    onChange={this.handleCheckboxChange}
    />

    </form>

    <form>
    <label htmlFor="teacher">Teacher</label>
    <input 
    type="checkbox" 
    name="teacher" 
    id="teacher"
    checked={this.state.teacher}  
    onChange={this.handleCheckboxChange}
    />

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
      <tbody>
    {filteredUsers.map(user => {
      return (
        <tr key={user.index}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.campus}</td>
          <td>{user.role}</td>
          {user.linkedin ? ( <td>
          <a href={user.linkedin}>
            <img src="/linkedin.png" height="20px" alt="linkedin" /></a>
          </td>) : <td></td>}
        </tr>
      )
    })}
      </tbody>
    </table>
    </div>
  )
}


}

function App() {

  return (
    <div className="App">
    <h1>Ironbook</h1>
    <Search users={users}/>
    
  
    </div>
  );
}

export default App;
