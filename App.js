import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';

import {
  Spartan_300Light,
  Spartan_400Regular,
  Spartan_700Bold,
  Spartan_900Black,
} from '@expo-google-fonts/spartan';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default () => {
  let [fontsLoaded] = useFonts({
    Spartan_300Light,
    Spartan_400Regular,
    Spartan_700Bold,
    Spartan_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
