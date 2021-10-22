import React from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { NavBar } from './NavBar';

export const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>
        <Header title="Caldar" />
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
