import React from 'react';
import { View, Dimensions } from 'react-native';

import { Container, LogoView, Subtitle, Btns, AdminBtn, extraStyles } from './styles';

import { Icon } from '@rneui/themed';
import Logo from '../../../assets/images/euquero-logo.svg';
import { LargeButton, SmallButton } from '../../defaultStyles';

export default (props) => {
  return (
    <Container>
      <AdminBtn activeOpacity={0.6} onPress={() => props.navigation.navigate('AdminLogin')}>
        <Icon
          name="shield-account"
          type="material-community"
          color="#56A8C5"
          size={40}
          style={{ ...extraStyles.adminIcon }}
        />
      </AdminBtn>
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

        <Btns>
          <LargeButton text="Buscar UBS" />
          <SmallButton text="Como usar o App" />
          <SmallButton text="Sobre o Projeto" />
        </Btns>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 5,
            flexGrow: 1,
          }}
        ></View>
      </View>
    </Container>
  );
};
