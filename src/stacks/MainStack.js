import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import Home from '../screens/Home'
import AdminLogin from '../screens/AdminLogin'
import AdminMainMenu from '../screens/AdminMainMenu'
import ComoUsarOApp from '../screens/ComoUsarOApp'

const Stack = createStackNavigator()

export default () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AdminLogin" component={AdminLogin} />
    <Stack.Screen name="AdminMainMenu" component={AdminMainMenu} />
    <Stack.Screen name="ComoUsarOApp" component={ComoUsarOApp} />
  </Stack.Navigator>
)
