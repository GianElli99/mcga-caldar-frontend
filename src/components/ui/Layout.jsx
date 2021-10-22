import React from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { NavBar } from './NavBar';
import styles from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={styles.mainWrapper}>
      <NavBar />
      <div className={styles.content}>
        <Header title="Caldar" />
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
