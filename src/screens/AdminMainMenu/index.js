import React from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';

import MainBackground from '../../components/MainBackground';
import {
  Container,
  Header,
  ManageTouchableBox,
  ManageBoxShadow,
  HeaderText,
  ManageText,
  TouchableArrow,
} from './styles';

import { Shadow } from 'react-native-shadow-2';

export default (props) => {
  return (
    <>
      <MainBackground />

      <Container>
        <Header>
          <TouchableArrow activeOpacity={0.6} onPress={() => props.navigation.goBack()}>
            <Icon name="chevron-back-outline" type="ionicon" color="#FF6B0F" />
          </TouchableArrow>
          <HeaderText style={{ fontFamily: 'Spartan_700Bold' }}>Administrativo</HeaderText>
        </Header>

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Shadow {...ManageBoxShadow}>
            <ManageTouchableBox activeOpacity={0.6}>
              <Icon name="account-cog" size={70} type="material-community" color="#c4c4c4" />
              <ManageText style={{ fontFamily: 'Spartan_400Regular' }}>Gerenciar Contas</ManageText>
            </ManageTouchableBox>
          </Shadow>

          <Shadow {...ManageBoxShadow}>
            <ManageTouchableBox activeOpacity={0.6}>
              <Icon name="bank" size={70} type="material-community" color="#c4c4c4" />
              <ManageText style={{ fontFamily: 'Spartan_400Regular' }}>Gerenciar UBS</ManageText>
            </ManageTouchableBox>
          </Shadow>
        </View>
      </Container>
    </>
  );
};
