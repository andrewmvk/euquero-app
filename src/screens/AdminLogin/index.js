import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { auth } from '../../services/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Container, LogoView, InputArea, Subtitle, Background, extraStyles } from './styles';
import Header from '../../components/Header';
import { SmallButton, InputBox } from '../../defaultStyles';
import Logo from '../../../assets/images/euquero-logo.svg';

import Wave from '../../components/Waves/Wave';
import DashedWave from '../../components/Waves/DashedWave';

export default (props) => {
  const [animationType, setAnimationType] = useState({
    n: false,
    type: 'nothing',
  });

  useEffect(() => {
    const unsubscribeSignedIn = auth.onAuthStateChanged((user) => {
      user ? handleNavigateTo() : undefined;
    });

    const unsubscribeFocus = props.navigation.addListener('focus', () => {
      Keyboard.addListener('keyboardDidShow', () => {
        setAnimationType({ n: true, type: 'away' });
      });
      Keyboard.addListener('keyboardDidHide', () => {
        setAnimationType({ n: true, type: 'away' });
      });
      setAnimationType({ n: true, type: 'from' });
    });

    const unsubscribeBlur = props.navigation.addListener('blur', () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    });

    return () => {
      unsubscribeSignedIn();
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, []);

  function handleNavigateTo() {
    setAnimationType({ n: true, type: 'to' });
    setTimeout(() => {
      props.navigation.navigate('AdminMainMenu');
    }, 400);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res.user.uid))
      .catch((err) => console.log(err));
  }

  return (
    <Background>
      <Header onPress={() => props.navigation.goBack()} absolute={true} color={'white'} />
      <View style={{ ...extraStyles.keyboardAvoidView }} pointerEvents="none">
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
            <InputBox type="email" placeholder="E-mail" value={email} onChangeText={setEmail} />
            <InputBox
              type="password"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </InputArea>
          <View style={{ height: '15%' }}>
            <SmallButton onPress={signIn} text="Acessar" />
          </View>
        </View>
      </Container>
    </Background>
  );
};
