
import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css';
import users from "./users";


// [
//   { "firstName": "Alec", "lastName": "Budd", "campus": "Berlin", "role": "student" },
// ]



class App extends Component {

  state = {
    userList: users
  }

  // hasLinkedIn () => {
  //   if (state.userList.user)
  // }

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

        <table >
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
