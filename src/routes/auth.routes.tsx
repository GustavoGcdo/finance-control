import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login/Login';

const AuthRoutes: React.FC = () => (
  <BrowserRouter>
    <Redirect exact path='/' to='/login' />
    <Route path='/login' component={Login} />
  </BrowserRouter>
);

export default AuthRoutes;
