import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './pages/Home/index';
import MyFinances from './pages/MyFinances/index';
import Signup from './pages/Signup/index';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="MyFinances" component={MyFinances} />
        <AppStack.Screen name="Signup" component={Signup} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
