import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Home from '../screens/Home';
import AdminLogin from '../screens/AdminLogin';
import AdminMainMenu from '../screens/AdminMainMenu';
import ComoUsarOApp from '../screens/ComoUsarOApp';
import SobreOProjeto from '../screens/SobreOProjeto';
import StateSelection from '../screens/StateSelection';
import CitySelection from '../screens/CitySelection';
import UBSSelection from '../screens/UBSSelection';
import ManageAccounts from '../screens/ManageAccounts';
import RegisterAccounts from '../screens/RegisterAccounts';
import ManageUBS from '../screens/ManageUBS';
import UploadUBSTable from '../screens/UploadUBSTable';
import UBSMenu from '../screens/UBSMenu';
import ManageScorecards from '../screens/ManageScorecards';
import NewScorecard from '../screens/NewScorecard';
import UBSServices from '../screens/UBSServices';
import ManageGlossary from '../screens/ManageGlossary';
import ManageServices from '../screens/ManageServices';
import UBSScorecards from '../screens/UBSScorecards';
import ScorecardGlossary from '../screens/ScorecardGlossary';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ animationEnabled: false }} />
    <Stack.Screen name="AdminMainMenu" component={AdminMainMenu} />
    <Stack.Screen name="ManageAccounts" component={ManageAccounts} />
    <Stack.Screen name="RegisterAccounts" component={RegisterAccounts} />
    <Stack.Screen name="ComoUsarOApp" component={ComoUsarOApp} />
    <Stack.Screen name="SobreOProjeto" component={SobreOProjeto} />
    <Stack.Screen name="StateSelection" component={StateSelection} />
    <Stack.Screen name="CitySelection" component={CitySelection} />
    <Stack.Screen name="UBSSelection" component={UBSSelection} />
    <Stack.Screen name="ManageUBS" component={ManageUBS} />
    <Stack.Screen name="UploadUBSTable" component={UploadUBSTable} />
    <Stack.Screen name="UBSMenu" component={UBSMenu} />
    <Stack.Screen name="ManageScorecards" component={ManageScorecards} />
    <Stack.Screen name="NewScorecard" component={NewScorecard} />
    <Stack.Screen name="ManageGlossary" component={ManageGlossary} />
    <Stack.Screen name="ManageServices" component={ManageServices} />
    <Stack.Screen name="UBSServices" component={UBSServices} />
    <Stack.Screen name="ScorecardGlossary" component={ScorecardGlossary} />
    <Stack.Screen name="UBSScorecards" component={UBSScorecards} />
  </Stack.Navigator>
);
