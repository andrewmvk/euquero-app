import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import AdminLogin from '../screens/AdminLogin';
import AdminMainMenu from '../screens/AdminMainMenu';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AdminLogin" component={AdminLogin} />
    <Stack.Screen name="AdminMainMenu" component={AdminMainMenu} />
  </Stack.Navigator>
);
