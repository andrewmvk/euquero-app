import React, { useState, useEffect } from 'react';
import { View, Keyboard, Alert } from 'react-native';
import { auth, db } from '../../services/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

import {
  Container,
  LogoView,
  InputArea,
  Subtitle,
  Background,
  extraStyles,
} from './styles';
import Header from '../../components/Header';
import { SmallButton, InputBox } from '../../defaultStyles';
import Logo from '../../../assets/images/euquero-logo.svg';

import Wave from '../../components/Waves/Wave';
import DashedWave from '../../components/Waves/DashedWave';
import Modal from '../../components/Modal';

export default (props) => {
  const [modalData, setModalData] = useState({ email: '', type: '' });
  const [modalVisibility, setModalVisibility] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  }, [props.route.params]);

  const getUser = async (u) => {
    let userData = {};
    try {
      const docRef = doc(db, 'users', u.uid);
      await getDoc(docRef).then(async (docSnap) => {
        userData = docSnap.data();
        if (userData == undefined && !userData.disabled) {
          handleNavigateTo({ isAdmin: false });
        } else if (!userData.disabled) {
          handleNavigateTo(userData);
        } else {
          setEmail('');
          setPassword('');

          if (userData.maximumAcessAttempts - 1 >= 0) {
            setTimeout(() => {
              setModalData({ ...userData, type: 'disabledAccountAdvice' });
              toggleModal();
            }, 500);

            await updateDoc(doc(db, 'users', u.uid), {
              maximumAcessAttempts: userData.maximumAcessAttempts - 1,
            });
          } else {
            setTimeout(() => {
              setModalData({ ...userData, type: 'deletedAccountAdvice' });
              toggleModal();
            }, 500);

            await deleteDoc(doc(db, 'users', u.uid));
            auth.currentUser.delete();
          }

          auth.signOut();
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

  function toggleModal() {
    setModalVisibility(!modalVisibility);
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch(() =>
      Alert.alert(
        'Erro de autenticação',
        'Ops! Email e/ou senha inválido(s), utilize apenas dados de contas já criadas.'
      )
    );
    if (email == '' || password == '') {
      Alert.alert(
        'Erro de autenticação',
        'Vish! Algum campo não foi preenchido corretamente, verifique novamente.'
      );
    }
  };

  return (
    <Background>
      <Header
        onPress={() => props.navigation.goBack()}
        absolute={true}
        color={'white'}
      />
      <View style={{ ...extraStyles.keyboardAvoidView }} pointerEvents='none'>
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
            <InputBox
              type='email'
              placeholder='E-mail'
              value={email}
              onChangeText={setEmail}
            />
            <InputBox
              type='password'
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
            />
          </InputArea>
          <View style={{ height: '15%' }}>
            <SmallButton onPress={signIn} text='Acessar' />
          </View>
        </View>
      </Container>
      <Modal
        isVisible={modalVisibility}
        params={modalData}
        onPress={toggleModal}
      />
    </Background>
  );
};
