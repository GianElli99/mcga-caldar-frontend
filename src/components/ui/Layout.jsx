import React from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { NavBar } from './NavBar';

export const Layout = ({ children, title }) => {
  return (
    <div>
      <NavBar />
      <div>
        <Header title={title} />
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
