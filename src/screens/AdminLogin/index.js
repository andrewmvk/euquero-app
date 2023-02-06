import React, { useState, useEffect } from 'react';
import {
  View,
  Keyboard,
  Alert,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { auth, db } from '../../services/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

import {
  Container,
  LogoView,
  InputArea,
  Subtitle,
  extraStyles,
  SearchInput,
  SearchInputText,
} from './styles';
import Header from '../../components/Header';

import Wave from '../../components/Waves/Wave';
import DashedWave from '../../components/Waves/DashedWave';
import Modal from '../../components/Modal';
import { SmallButton, InputBox } from '../../components/common';
import { colors, shadow } from '../../defaultStyles';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Icon } from 'react-native-elements';

export default (props) => {
  const [modalData, setModalData] = useState({ email: '', text: '' });
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [animationType, setAnimationType] = useState({
    n: false,
    type: 'nothing',
  });

  useEffect(() => {
    const unsubscribeFocus = props.navigation.addListener('focus', () => {
      Keyboard.addListener('keyboardDidShow', () => {
        setAnimationType({ n: true, type: 'away-out' });
      });
      Keyboard.addListener('keyboardDidHide', () => {
        setAnimationType({ n: true, type: 'away-in' });
      });
      setAnimationType({ n: true, type: 'from' });

      props.navigation.addListener('blur', () => {
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');
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
          const maximumAttempts = userData.maximumAcessAttempts - 1;
          if (maximumAttempts >= 0) {
            setTimeout(() => {
              setModalData({
                email: userData.email,
                text:
                  'Esta conta está desativada e será excluída caso seja acessada mais ' +
                  userData.maximumAcessAttempts +
                  ' vez(es).',
              });
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
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        getUser(user);
      })
      .catch(() =>
        Alert.alert(
          'Erro de autenticação',
          'Ops! Email e/ou senha inválido(s), utilize apenas dados de contas já criadas.',
        ),
      )
      .finally(() => {
        setIsLoading(false);
      });
    if (email == '' || password == '') {
      Alert.alert(
        'Erro de autenticação',
        'Ops! Algum campo não foi preenchido corretamente, verifique novamente.',
      );
    }
  };

  return (
    <>
      <Header
        onPress={() => props.navigation.goBack()}
        color={'white'}
        position="absolute"
        margin={getStatusBarHeight()}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <View style={{ ...extraStyles.keyboardAvoidView }} pointerEvents="none">
            <Wave top={true} transition={animationType} />
            <Wave transition={animationType} />

            <DashedWave />
            <DashedWave bottom={true} />
          </View>

          <View style={{ ...extraStyles.containerView }}>
            <LogoView>
              <Image
                source={require('../../../assets/images/euquero-logo.png')}
                style={{ resizeMode: 'contain', height: '60%' }}
              />
              <Subtitle>Acesso Administrativo</Subtitle>
            </LogoView>
            <InputArea>
              <SearchInput style={shadow}>
                <Icon
                  name="person-outline"
                  type="ionicon"
                  color="#c4c4c4"
                  style={{
                    paddingRight: 12,
                    paddingVertical: 15,
                  }}
                />
                <SearchInputText
                  placeholder="E-mail"
                  numberOfLines={1}
                  placeholderTextColor="#C4C4C4"
                  onChangeText={setEmail}
                />
              </SearchInput>
              <SearchInput style={shadow}>
                <Icon
                  name="lock-closed-outline"
                  type="ionicon"
                  color="#c4c4c4"
                  style={{
                    paddingRight: 12,
                    paddingVertical: 15,
                  }}
                />
                <SearchInputText
                  placeholder="Senha"
                  secureTextEntry
                  numberOfLines={1}
                  placeholderTextColor="#C4C4C4"
                  onChangeText={setPassword}
                />
              </SearchInput>
            </InputArea>
            <View style={{ height: '15%', alignItems: 'center' }}>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.orange} />
              ) : (
                <SmallButton onPress={() => handleNavigateTo({ isAdmin: true })} text="Acessar" />
              )}
            </View>
          </View>
        </Container>
      </TouchableWithoutFeedback>
      <Modal
        isVisible={modalVisibility}
        onBackPress={toggleModal}
        icon={{ name: 'account-off', type: 'material-community' }}
        data={{ title: modalData.text, text: modalData.email }}
        containerStyle={{ justifyContent: 'center' }}
      />
    </>
  );
};
