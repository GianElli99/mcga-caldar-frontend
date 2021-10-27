import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <ul>
        <li>
          <NavLink to="/home" className={styles.link}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/technicians" className={styles.link}>
            Technicians
          </NavLink>
        </li>
        <li>
          <NavLink to="/boilers" className={styles.link}>
            Boilers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
