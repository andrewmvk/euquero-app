import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';

import {
  Container,
  LogoView,
  InputArea,
  Subtitle,
  Background,
  extraStyles,
  SearchInput,
  SearchInputText,
} from './styles';
import Header from '../../components/Header';
import { SmallButton, colors } from '../../defaultStyles';
import Logo from '../../../assets/images/euquero-logo.svg';
import { Icon } from 'react-native-elements';

import Wave from '../../components/Waves/Wave';
import DashedWave from '../../components/Waves/DashedWave';

export default (props) => {
  const [animationType, setAnimationType] = useState({ n: false, type: 'nothing' });
  const [waveVisibility, setWaveVisibility] = useState(100);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setAnimationType({ n: true, type: 'away' });
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setAnimationType({ n: true, type: 'away' });
    });

    props.navigation.addListener('focus', () => {
      setAnimationType({ n: true, type: 'from' });
    });
  }, []);

  function handleNavigateTo(page) {
    setAnimationType({ n: true, type: 'to' });
    setTimeout(() => {
      props.navigation.navigate(page);
    }, 400);
  }

  return (
    <Background>
      <Header onPress={() => props.navigation.goBack()} absolute={true} color={'white'} />
      <View
        style={[{ ...extraStyles.keyboardAvoidView }, { opacity: waveVisibility }]}
        pointerEvents="none"
      >
        <Wave top={true} transition={animationType} />
        <Wave transition={animationType} />

        <DashedWave />
        <DashedWave bottom={true} />
      </View>
      <Container>
        <View style={{ ...extraStyles.containerView }}>
          <LogoView>
            <Logo />
            <Subtitle>Acesso Administrativo</Subtitle>
          </LogoView>
          <InputArea>
            <SearchInput>
              <Icon
                name="person-outline"
                type="ionicon"
                color="#c4c4c4"
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}
              />
              <SearchInputText placeholder="Nome de usuário" placerholderTextColor={colors.text} />
            </SearchInput>
            <SearchInput>
              <Icon
                name="lock-closed-outline"
                type="ionicon"
                color="#c4c4c4"
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}
              />
              <SearchInputText
                placeholder="Senha"
                placerholderTextColor={colors.text}
                secureTextEntry={true}
              />
            </SearchInput>
          </InputArea>
          <View style={{ height: '15%' }}>
            <SmallButton onPress={() => handleNavigateTo('AdminMainMenu')} text="Acessar" />
          </View>
        </View>
      </Container>
    </Background>
  );
};
