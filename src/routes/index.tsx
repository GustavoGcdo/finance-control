import AppLoading from 'expo/build/launch/AppLoading';
import React from 'react';
import { useAuth } from '../contexts/auth.context';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { ActivityIndicator, View, Text } from 'react-native';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>        
        <ActivityIndicator size="large" color="#73D762" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
