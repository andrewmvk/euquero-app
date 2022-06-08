import React from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import {
  Container,
  Header,
  ManageTouchableBox,
  ManageBoxShadow,
  HeaderText,
  ManageText,
} from './styles';
import DashedCircle from '../../components/DashedCircle';
import { TouchableArrow, buttonOpacity } from '../../defaultStyles';

export default (props) => {
  return (
    <>
      <DashedCircle />

      <Container>
        <Header>
          <TouchableArrow activeOpacity={buttonOpacity} onPress={() => props.navigation.goBack()} />
          <HeaderText style={{ fontFamily: 'Spartan_700Bold' }}>Administrativo</HeaderText>
        </Header>

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Shadow {...ManageBoxShadow}>
            <ManageTouchableBox activeOpacity={buttonOpacity}>
              <Icon name="account-cog" size={70} type="material-community" color="#c4c4c4" />
              <ManageText style={{ fontFamily: 'Spartan_400Regular' }}>Gerenciar Contas</ManageText>
            </ManageTouchableBox>
          </Shadow>

          <Shadow {...ManageBoxShadow}>
            <ManageTouchableBox activeOpacity={buttonOpacity}>
              <Icon name="bank" size={70} type="material-community" color="#c4c4c4" />
              <ManageText style={{ fontFamily: 'Spartan_400Regular' }}>Gerenciar UBS</ManageText>
            </ManageTouchableBox>
          </Shadow>
        </View>
      </Container>
    </>
  );
};
