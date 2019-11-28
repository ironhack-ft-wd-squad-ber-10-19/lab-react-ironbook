import React from "react";

const IronList = props => {
  return (
    <div>
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
          {props.users.map(el => {
            return (
              <tr key={el.firstName + el.lastName}>
                <td>{el.firstName}</td>
                <td>{el.lastName}</td>
                <td>{el.campus}</td>
                <td>{el.role}</td>
                {el.linkedin && (
                  <td>
                    <a href={el.linkedin}>
                      <img
                        src="./linkedin.png"
                        alt={el.lastName}
                        style={{ width: "10px" }}
                      />
                    </a>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IronList;
