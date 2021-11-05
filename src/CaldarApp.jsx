import React, { useEffect } from 'react';
import { MainRouter } from './routers/MainRouter';
import './CaldarApp.module.css';
import { useDispatch } from 'react-redux';
import { readTechnicians } from './redux/actions/techniciansActions';

function CaldarApp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readTechnicians());
    return () => {};
  }, []);
  return <MainRouter />;
}

export default CaldarApp;
