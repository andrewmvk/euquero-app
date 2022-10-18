import React from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { Container, ManageTouchableBox, ManageBoxShadow, ManageText } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { buttonOpacity, colors } from '../../defaultStyles';

export default (props) => {
  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo'} onPress={() => props.navigation.goBack()} />

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          {props.route.params.isAdmin ? (
            <Shadow {...ManageBoxShadow}>
              <ManageTouchableBox
                activeOpacity={buttonOpacity}
                onPress={() => props.navigation.navigate('ManageAccounts')}
              >
                <Icon name="account-cog" size={70} type="material-community" color={colors.gray} />
                <ManageText>Gerenciar Contas</ManageText>
              </ManageTouchableBox>
            </Shadow>
          ) : null}

          <Shadow {...ManageBoxShadow}>
            <ManageTouchableBox
              activeOpacity={buttonOpacity}
              onPress={() => props.navigation.navigate('ManageUBS')}
            >
              <Icon name="bank" size={70} type="material-community" color={colors.gray} />
              <ManageText>Gerenciar UBS</ManageText>
            </ManageTouchableBox>
          </Shadow>

          <Shadow {...ManageBoxShadow}>
            <ManageTouchableBox
              activeOpacity={buttonOpacity}
              onPress={() => props.navigation.navigate('ManageScorecards')}
            >
              <Icon name="book" size={70} type="material-community" color={colors.gray} />
              <ManageText>Gerenciar Indicadores</ManageText>
            </ManageTouchableBox>
          </Shadow>
        </View>
      </Container>
    </>
  );
};
