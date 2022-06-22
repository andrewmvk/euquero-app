import React from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { Container, ManageTouchableBox, ManageBoxShadow, ManageText } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { buttonOpacity } from '../../defaultStyles';

export default (props) => {
  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo'} onPress={() => props.navigation.goBack()} />

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
