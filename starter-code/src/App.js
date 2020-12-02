
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
    search: ''
  }

  handleChange = event => {
    // event.preventDefault();
    console.log('rodger rodger')

    this.setState({
        search: event.target.value
      }, () => this.handleSearch())
    }
    
  handleSearch = () => {
    const {search} = this.state;

    const newSearch = users.filter(user => {
      if (user.lastName.toLowerCase().includes(search.toLowerCase()) || user.firstName.toLowerCase().includes(search.toLowerCase()) ) 
      {
        return user.lastName.toLowerCase().includes(search.toLowerCase()) || user.firstName.toLowerCase().includes(search.toLowerCase());
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
          {/* Search by First or Last name */}
        
        <input type ="text" name ="search" id= "search" placeholder=" Search by First or Last name.." 
          value={this.state.search} onChange={this.handleChange} 
        />
        </label>
        </div>

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


    //   if (this.state.teacher){
    //     return user.role === "teacher" && (user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search));
    //   } else if (this.state.student){
    //     return user.role === "student" && (user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search));
    //   } else {
    //     return user.lastName.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search);
    //   }
    // })
    