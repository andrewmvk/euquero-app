import React from 'react';
import { View } from 'react-native';

import { Container, LogoView, Subtitle, Buttons, AdminBtn, extraStyles } from './styles';

import Wave from '../../components/Waves/Wave';
import DashedWave from '../../components/Waves/DashedWave';

import { Icon } from '@rneui/themed';
import Logo from '../../../assets/images/euquero-logo.svg';
import { LargeButton, SmallButton, buttonOpacity } from '../../defaultStyles';

export default (props) => {
  return (
    <>
      <Container>
        <Wave size={0.17} top={true} />
        <Wave size={0.17} />

        <DashedWave size={0.17} />
        <DashedWave size={0.17} bottom={true} />

        <View style={{ ...extraStyles.viewBody }}>
          <LogoView>
            <Logo />
            <Subtitle>Encontre a UBS perfeita para o seu caso!</Subtitle>
          </LogoView>

          <Buttons>
            <View style={{ marginBottom: 35 }}>
              <LargeButton text="Buscar UBS" />
            </View>
            <View style={{ marginBottom: 20 }}>
              <SmallButton
                text="Como usar o App"
                onPress={() => props.navigation.navigate('ComoUsarOApp')}
              />
            </View>
            <SmallButton text="Sobre o Projeto" />
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
    </>
  );
};
