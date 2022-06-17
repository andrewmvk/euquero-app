import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import AdminLogin from "../screens/AdminLogin";
import AdminMainMenu from "../screens/AdminMainMenu";
import ComoUsarOApp from "../screens/ComoUsarOApp";
import SobreOProjeto from "../screens/SobreOProjeto";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="SobreOProjeto"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AdminLogin" component={AdminLogin} />
    <Stack.Screen name="AdminMainMenu" component={AdminMainMenu} />
    <Stack.Screen name="ComoUsarOApp" component={ComoUsarOApp} />
    <Stack.Screen name="SobreOProjeto" component={SobreOProjeto} />
  </Stack.Navigator>
);
