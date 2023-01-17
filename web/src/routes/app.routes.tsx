import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { myFinancesRoute } from '../constants/routes.constants';
import Dashboard from '../pages/MyFinances/MyFinances';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={myFinancesRoute} element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
