import React from 'react';
import Loading from '../components/Loading/Loading';
import { useAuth } from '../contexts/auth.context';
import MainLayout from '../layouts/MainLayout/MainLayout';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return signed ? (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  ) : (
    <AuthRoutes />
  );
};

export default Routes;
