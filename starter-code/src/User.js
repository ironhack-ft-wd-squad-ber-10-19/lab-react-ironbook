import React, { Component } from 'react';

const User = props => {
  const { firstName, lastName, campus, role, links } = props;
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{campus}</td>
      <td>{`${role[0].toUpperCase()}${role.slice(1)}`}</td>
      <td>{links && (<a href={links}><img className="linkImg" src="linkedin.png" alt={`${firstName} ${lastName}'s linkedin`}/></a>)}</td>
    </tr>
  )
}

export default User