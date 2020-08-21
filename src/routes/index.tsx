import React from 'react';
import Loading from '../components/Loading/Loading';
import { useAuth } from '../contexts/auth.context';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import MainLayout from '../layouts/MainLayout/MainLayout';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <Loading isLoading={loading} />;
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
