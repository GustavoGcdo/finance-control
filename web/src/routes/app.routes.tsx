import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { myFinancesRoute } from '../constants/routes.constants';
import Dashboard from '../pages/MyFinances/MyFinances';

const AppRoutes: React.FC = () => (
  <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Navigate to={myFinancesRoute} replace />} />
      <Route path="*" element={<Navigate to={myFinancesRoute} replace />} />
      <Route path={myFinancesRoute} element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
