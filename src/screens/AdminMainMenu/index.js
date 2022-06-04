import React from 'react';
import { Icon } from 'react-native-elements';

import { View, TouchableOpacity } from 'react-native';
import { Container, Header, ManageTouchableBox, HeaderText, ManageText } from './styles';

export default () => {
  return (
    <Container>
      <Header>
        <TouchableOpacity activeOpacity={0.6}>
          <Icon name="chevron-back-outline" type="ionicon" color="#FF6B0F" />
        </TouchableOpacity>
        <HeaderText style={{ fontFamily: 'Spartan_700Bold' }}>Administrativo</HeaderText>
      </Header>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <ManageTouchableBox activeOpacity={0.6}>
          <Icon name="account-cog" size={70} type="material-community" color="#c4c4c4" />
          <ManageText style={{ fontFamily: 'Spartan_400Regular' }}>Gerenciar Contas</ManageText>
        </ManageTouchableBox>
        <ManageTouchableBox activeOpacity={0.6}>
          <Icon name="bank" size={70} type="material-community" color="#c4c4c4" />
          <ManageText style={{ fontFamily: 'Spartan_400Regular' }}>Gerenciar UBS</ManageText>
        </ManageTouchableBox>
      </View>
    </Container>
  );
};
