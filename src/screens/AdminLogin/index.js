import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { auth, db } from '../../services/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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
    const unsubscribeFocus = props.navigation.addListener('focus', () => {
      Keyboard.addListener('keyboardDidShow', () => {
        setAnimationType({ n: true, type: 'away' });
      });
      Keyboard.addListener('keyboardDidHide', () => {
        setAnimationType({ n: true, type: 'away' });
      });
      setAnimationType({ n: true, type: 'from' });

      const unsubscribeSignIn = auth.onAuthStateChanged((u) => {
        u ? getUser(u) : undefined;
      });

      props.navigation.addListener('blur', () => {
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');
        unsubscribeSignIn();
      });
    });

    return unsubscribeFocus;
  }, []);

  const getUser = async (u) => {
    let userData = {};
    try {
      const docRef = doc(db, 'users', u.uid);
      await getDoc(docRef).then((docSnap) => {
        userData = docSnap.data();
        if (userData == undefined) {
          handleNavigateTo({ isAdmin: false });
        } else {
          handleNavigateTo(userData);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  function handleNavigateTo(userData) {
    setAnimationType({ n: true, type: 'to' });
    setTimeout(() => {
      props.navigation.navigate('AdminMainMenu', userData);
    }, 400);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res.user.uid))
      .catch((err) => console.log(err));
  };

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
