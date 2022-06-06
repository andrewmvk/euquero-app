import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Starting from '../screens/Starting';
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
    <Stack.Screen name="Starting" component={Starting} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AdminLogin" component={AdminLogin} />
    <Stack.Screen name="AdminMainMenu" component={AdminMainMenu} />
  </Stack.Navigator>
);
