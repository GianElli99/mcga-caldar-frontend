import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
          <Link to="/home">Home</Link>
        </ul>
        <ul>
          <Link to="/technicians">Technicians</Link>
        </ul>
      </nav>
    </div>
  );
};
