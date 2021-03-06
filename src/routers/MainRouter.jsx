import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { BoilerForm } from '../components/boilers/BoilerForm';
import { BoilerScreen } from '../components/boilers/BoilerScreen';
import { TechnicianForm } from '../components/technicians/TechnicianForm';
import { BuildingForm } from '../components/buildings/BuildingForm';
import { TechnicianScreen } from '../components/technicians/TechnicianScreen';
import { HomeScreen } from '../components/home/HomeScreen';
import { BuildingScreen } from '../components/buildings/BuildingScreen';
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
          <Route exact path="/boilers">
            <BoilerScreen />
          </Route>
          <Route exact path="/boilers/:action/:boilerId?">
            <BoilerForm />
          </Route>
          <Route exact path="/buildings">
            <BuildingScreen />
          </Route>
          <Route exact path="/buildings/:action/:buildingId?">
            <BuildingForm />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </Layout>
    </Router>
  );
};
