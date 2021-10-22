import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <ul>
        <NavLink to="/home">Home</NavLink>
      </ul>
      <ul>
        <NavLink to="/technicians">Technicians</NavLink>
      </ul>
    </nav>
  );
};
