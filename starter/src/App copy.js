import logo from './logo.svg';
import './App.css';
import users from "./users";

function App() {

  return (
    <>
          <table>
         <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Campus</th>
            <th>Role</th>
            <th>Links</th>
          </tr>
          { users.map(user => {
                return (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.campus}</td>
            <td>{user.role}</td>
            <td>{user.linkedin}</td>
          </tr>
                )}
          )}
          </tbody>
        </table>


       
    </>
  );
}

export default App;
