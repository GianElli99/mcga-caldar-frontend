import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
          <NavLink to="/home">Home</NavLink>
        </ul>
        <ul>
          <NavLink to="/technicians">Technicians</NavLink>
        </ul>
      </nav>
    </div>
  );
};
