import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { HomeScreen } from '../components/home/HomeScreen';
import { TechnicianForm } from '../components/technicians/TechnicianForm';
import { TechnicianScreen } from '../components/technicians/TechnicianScreen';
import { Layout } from '../components/ui/Layout';

export const MainRouter = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/home">
            <HomeScreen />
          </Route>
          <Route exact path="/technicians">
            <TechnicianScreen />
          </Route>
          <Route exact path="/technicians/:action/:technicianId?">
            <TechnicianForm />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </Layout>
    </Router>
  );
};
