import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../components/SplashScreen';
import Home from '../screens/Home';
import AdminLogin from '../screens/AdminLogin';
import AdminMainMenu from '../screens/AdminMainMenu';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="SplashScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AdminLogin" component={AdminLogin} />
    <Stack.Screen name="AdminMainMenu" component={AdminMainMenu} />
  </Stack.Navigator>
);
