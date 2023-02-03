import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { loginRoute, signupRoute } from '../constants/routes.constants';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

const AuthRoutes: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Navigate to={loginRoute} replace />} />
      <Route path="*" element={<Navigate to={loginRoute} replace />} />
      <Route path={loginRoute} element={<Login />} />
      <Route path={signupRoute} element={<Signup />} />
    </Routes>
  </HashRouter>
);

export default AuthRoutes;
