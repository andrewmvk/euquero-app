import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Home from "../screens/Home";
import AdminLogin from "../screens/AdminLogin";
import AdminMainMenu from "../screens/AdminMainMenu";
import ComoUsarOApp from "../screens/ComoUsarOApp";
import SobreOProjeto from "../screens/SobreOProjeto";
import StateSelection from "../screens/StateSelection";

const Stack = createStackNavigator();

const pop = () => ({
  cardStyle: {},
});

export default () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="AdminLogin"
      component={AdminLogin}
      options={{ cardStyleInterpolator: pop }}
    />
    <Stack.Screen name="AdminMainMenu" component={AdminMainMenu} />
    <Stack.Screen name="ComoUsarOApp" component={ComoUsarOApp} />
    <Stack.Screen name="SobreOProjeto" component={SobreOProjeto} />
    <Stack.Screen name="StateSelection" component={StateSelection} />
  </Stack.Navigator>
);
