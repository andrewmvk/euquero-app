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
import CitySelection from "../screens/CitySelection";
import UBSSelection from "../screens/UBSSelection";
import ManageAccounts from "../screens/ManageAccounts";
import ManageUBS from "../screens/ManageUBS";
import RegisterAccounts from "../screens/RegisterAccounts";
import RegisterUBS from "../screens/RegisterUBS";

const Stack = createStackNavigator();

const pop = () => ({
  cardStyle: {},
});

export default () => (
  <Stack.Navigator
    initialRouteName="RegisterUBS"
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
    <Stack.Screen name="ManageAccounts" component={ManageAccounts} />
    <Stack.Screen name="RegisterAccounts" component={RegisterAccounts} />
    <Stack.Screen name="RegisterUBS" component={RegisterUBS} />
    <Stack.Screen name="ComoUsarOApp" component={ComoUsarOApp} />
    <Stack.Screen name="SobreOProjeto" component={SobreOProjeto} />
    <Stack.Screen name="StateSelection" component={StateSelection} />
    <Stack.Screen name="CitySelection" component={CitySelection} />
    <Stack.Screen name="UBSSelection" component={UBSSelection} />
    <Stack.Screen name="ManageUBS" component={ManageUBS} />
  </Stack.Navigator>
);
