import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import {
  Spartan_300Light,
  Spartan_400Regular,
  Spartan_500Medium,
  Spartan_700Bold,
  Spartan_900Black,
} from '@expo-google-fonts/spartan';

export default () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Spartan_300Light,
          Spartan_400Regular,
          Spartan_500Medium,
          Spartan_700Bold,
          Spartan_900Black,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <MainStack />
    </NavigationContainer>
  );
};
