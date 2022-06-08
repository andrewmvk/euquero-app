import React from 'react';
import { View, Dimensions } from 'react-native';

import { Container, LogoView, Subtitle, Buttons, AdminBtn, extraStyles } from './styles';

import { Icon } from '@rneui/themed';
import Logo from '../../../assets/images/euquero-logo.svg';
import { LargeButton, SmallButton, buttonOpacity } from '../../defaultStyles';

export default (props) => {
  return (
    <Container>
      <View
        style={{
          alignItems: 'center',
          height: Dimensions.get('window').height * 0.6,
          justifyContent: 'space-evenly',
        }}
      >
        <LogoView>
          <Logo />
          <Subtitle>Encontre a UBS perfeita para o seu caso!</Subtitle>
        </LogoView>

        <Buttons>
          <View style={{ marginBottom: 35 }}>
            <LargeButton text="Buscar UBS" />
          </View>
          <View style={{ marginBottom: 20 }}>
            <SmallButton text="Como usar o App" />
          </View>
          <View style={{ marginBottom: 20 }}>
            <SmallButton text="Sobre o Projeto" />
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
