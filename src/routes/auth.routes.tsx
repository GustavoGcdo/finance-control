import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../pages/Login/index';
import Signup from '../pages/Signup/index';

const AppStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Login" component={Login} />        
        <AppStack.Screen name="Signup" component={Signup} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
