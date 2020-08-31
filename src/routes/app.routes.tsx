import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyFinances from '../pages/MyFinances/index';

const AppStack = createStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="MyFinances" component={MyFinances} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
