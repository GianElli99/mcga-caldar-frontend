import React, { useEffect } from 'react';
import { MainRouter } from './routers/MainRouter';
import './CaldarApp.module.css';
import { useDispatch } from 'react-redux';
import { getTechniciansAsync } from './redux/actions/techniciansActions';
import { getBoilersAsync } from './redux/actions/boilersActions';

function CaldarApp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTechniciansAsync());
    dispatch(getBoilersAsync());
    return () => {};
  }, []);
  return <MainRouter />;
}

export default CaldarApp;
