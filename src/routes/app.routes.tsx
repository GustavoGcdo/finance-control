import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Dashboard from '../pages/MyFinances/MyFinances';
import { myFinancesRoute } from '../constants/routes.constants';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Redirect exact path='/' to={myFinancesRoute} />
    <Route path={myFinancesRoute} component={Dashboard} />
  </BrowserRouter>
);

export default AppRoutes;
