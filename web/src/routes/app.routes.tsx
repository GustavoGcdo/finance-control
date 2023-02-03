import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { myFinancesRoute } from '../constants/routes.constants';
import Dashboard from '../pages/MyFinances/MyFinances';

const AppRoutes: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Navigate to={myFinancesRoute} replace />} />
      <Route path="*" element={<Navigate to={myFinancesRoute} replace />} />
      <Route path={myFinancesRoute} element={<Dashboard />} />
    </Routes>
  </HashRouter>
);

export default AppRoutes;
