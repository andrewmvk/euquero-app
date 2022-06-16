import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import {
  Container,
  Header,
  LogoView,
  InputArea,
  Subtitle,
  TextInput,
  Background,
  extraStyles,
} from './styles';
import { TouchableArrow, SmallButton, buttonOpacity, colors } from '../../defaultStyles';
import Logo from '../../../assets/images/euquero-logo.svg';

import Wave from '../../components/Waves/Wave';
import DashedWave from '../../components/Waves/DashedWave';

export default (props) => {
  const [transition, setTransition] = useState({ n: false, type: 'nothing' });

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setTransition({ n: true, type: 'from' });
    });
  }, []);

  function handleNavigateTo(page) {
    setTransition({ n: true, type: 'to' });
    setTimeout(() => {
      props.navigation.navigate(page);
    }, 400);
  }

  return (
    <Background>
      <Wave top={true} transition={transition} />
      <Wave transition={transition} />

      <DashedWave />
      <DashedWave bottom={true} />
      <Header>
        <TouchableArrow
          activeOpacity={buttonOpacity}
          color={'white'}
          onPress={() => props.navigation.goBack()}
        />
      </Header>
      <Container>
        <View style={{ ...extraStyles }}>
          <LogoView>
            <Logo />
            <Subtitle>Acesso Administrativo</Subtitle>
          </LogoView>

          <InputArea>
            <TextInput placeholder="Nome de usuário" placerholderTextColor={colors.text} />
            <TextInput
              placeholder="Senha"
              placerholderTextColor={colors.text}
              secureTextEntry={true}
            />
          </InputArea>

          <View style={{ height: '15%' }}>
            <SmallButton onPress={() => handleNavigateTo('AdminMainMenu')} text="Acessar" />
          </View>
        </View>
      </Container>
    </Background>
  );
};
