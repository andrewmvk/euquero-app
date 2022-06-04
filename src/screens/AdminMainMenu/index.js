import React from 'react';
import { Icon } from 'react-native-elements';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, ManageTouchableBox, HeaderText, ManageText } from './styles';
import DropShadow from 'react-native-drop-shadow';

//import ArrowBack from '../../../../assets/imgs/arrow-back-icon.svg';
//import BankIcon from '../../../../assets/imgs/bank-icon.svg';
//import SwitchAccountIcon from '../../../../assets/imgs/switch-account-icon.svg';

export default () => {
  return (
    <Container>
      <Header>
        <TouchableOpacity>
          <Icon name="chevron-back-outline" type="ionicon" color="#FF6B0F" />
        </TouchableOpacity>
        <HeaderText>Administrativo</HeaderText>
      </Header>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        {/* <DropShadow style={styles.shadowAccountBox}> */}
        <ManageTouchableBox>
          <Icon name="account-cog" size={70} type="material-community" color="#c4c4c4" />
          <ManageText>Gerenciar Contas</ManageText>
        </ManageTouchableBox>
        {/* </DropShadow> */}
        <ManageTouchableBox>
          <Icon name="bank" size={70} type="material-community" color="#c4c4c4" />
          <ManageText>Gerenciar UBS</ManageText>
        </ManageTouchableBox>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  shadowAccountBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  shadowBHUBox: {},
});
