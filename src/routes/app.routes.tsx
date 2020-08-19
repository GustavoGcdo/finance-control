import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Redirect exact path='/' to='/dashboard' />
    <Route path='/dashboard' component={Dashboard} />
  </BrowserRouter>
);

export default AppRoutes;
