import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';


const Router = () => (
  <Switch>
    <Redirect from="/" to="/login"/>
    <Route path="/home" component={HomeScreen} />
    <Route path="/login" component={LoginForm} />
  </Switch>
);

export default Router;

