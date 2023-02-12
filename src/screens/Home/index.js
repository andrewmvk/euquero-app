import React, { useEffect, useState } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { Icon } from '@rneui/themed';

import { Container, LogoView, Subtitle, Buttons, AdminBtn, extraStyles } from './styles';
import Wave from '../../components/Waves/Wave';
import DashedWave from '../../components/Waves/DashedWave';
import { buttonOpacity } from '../../defaultStyles';
import { LargeButton, SmallButton } from '../../components/common';

const B = (props) => <Text style={{ fontWeight: '900', fontSize: 15 }}>{props.children}</Text>;

export default (props) => {
  const [transition, setTransition] = useState({ n: false, type: '' });

  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync('absolute');
      await NavigationBar.setBackgroundColorAsync('rgba(0,0,0,0.01)');
      await NavigationBar.setButtonStyleAsync('dark');
    };

    const unsubscribe = props.navigation.addListener('focus', () => {
      setTransition({ n: true, type: 'from' });
      navBarConfig();
    });

    return () => unsubscribe();
  }, []);

  function handleNavigateTo(page) {
    setTransition({ n: true, type: 'to' });
    setTimeout(() => {
      props.navigation.navigate(page);
    }, 400);
  }

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Wave top={true} transition={transition} />
      <Wave transition={transition} />

      <DashedWave />
      <DashedWave bottom={true} />

      <View style={{ ...extraStyles.viewBody }}>
        <LogoView>
          <Image
            source={require('../../../assets/images/euquero-logo.png')}
            style={{ resizeMode: 'contain', height: '60%' }}
          />
          <Subtitle>
            Fortalecendo o acesso à saúde {'\n'}
            <B>nos 1000 dias!</B>
          </Subtitle>
        </LogoView>

        <Buttons>
          <View style={{ marginBottom: 35, marginTop: 50 }}>
            <LargeButton
              text="Buscar UBS"
              onPress={() => {
                handleNavigateTo('StateSelection');
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <SmallButton
              text="Como usar o App"
              onPress={() => {
                handleNavigateTo('ComoUsarOApp');
              }}
            />
          </View>
          <View>
            <SmallButton
              text="Sobre o Projeto"
              onPress={() => {
                handleNavigateTo('SobreOProjeto');
              }}
            />
          </View>
        </Buttons>
      </View>

      <AdminBtn
        activeOpacity={buttonOpacity}
        onPress={() => props.navigation.navigate('AdminLogin')}
      >
        <Icon
          name="shield-account"
          type="material-community"
          color="#56A8C5"
          size={40}
          style={{ ...extraStyles.adminIcon }}
        />
      </AdminBtn>
    </Container>
  );
};
