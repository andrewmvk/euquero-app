import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import {
  Container,
  LogoView,
  Subtitle,
  Btns,
  BuscarBtn,
  ComoUsarBtn,
  SobreProjetoBtn,
  TxtBtn,
  TxtBtn2,
  AdminBtn,
} from './styles';

import { Icon } from '@rneui/themed';
import Logo from '../../../assets/images/euquero-logo.svg';

export default (props) => {
  return (
    <Container>
      <AdminBtn activeOpacity={0.6} onPress={() => props.navigation.navigate('AdminLogin')}>
        <Icon
          name="shield-account"
          type="material-community"
          color="#56A8C5"
          size={40}
          style={styles.adminIcon}
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
          <BuscarBtn>
            <TxtBtn>Buscar UBS</TxtBtn>
          </BuscarBtn>

          <ComoUsarBtn>
            <TxtBtn2>Como usar o App</TxtBtn2>
          </ComoUsarBtn>

          <SobreProjetoBtn>
            <TxtBtn2>Sobre o Projeto</TxtBtn2>
          </SobreProjetoBtn>
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

const styles = StyleSheet.create({
  adminIcon: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 15,
    borderBottomWidth: 5,
    borderColor: '#c4c4c4',
    borderEndWidth: 3,
  },
});
