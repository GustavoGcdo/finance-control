import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import { homeRoute } from '../constants/routes.constants';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Redirect exact path='/' to={homeRoute} />
    <Route path={homeRoute} component={Dashboard} />
  </BrowserRouter>
);

export default AppRoutes;
