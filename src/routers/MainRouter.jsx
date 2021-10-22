import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { HomeScreen } from '../components/home/HomeScreen';
import { TechnicianScreen } from '../components/technicians/TechnicianScreen';
import { Layout } from '../components/ui/Layout';

export const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <Layout>
            <HomeScreen />
          </Layout>
        </Route>
        <Route exact path="/technicians/:action?/:technicianId?">
          <Layout>
            <TechnicianScreen />
          </Layout>
        </Route>
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
};
