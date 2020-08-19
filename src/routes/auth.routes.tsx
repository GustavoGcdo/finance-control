import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { loginRoute, signupRoute } from '../constants/routes.constants';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

const AuthRoutes: React.FC = () => (
  <BrowserRouter>
    <Redirect exact path='/' to={loginRoute} />
    <Route path={loginRoute} component={Login} />    
    <Route path={signupRoute} component={Signup} />    
  </BrowserRouter>
);

export default AuthRoutes;
