import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { auth, authSecondary, db } from '../../services/firebase.config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as NavigationBar from 'expo-navigation-bar';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { BigTitle, RegisterButton } from '../../components/common';
import { ButtonView, Container, ContentInput, ContentInputText, InputArea } from './styles';
import { Icon } from 'react-native-elements';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync('relative');
      await NavigationBar.setBackgroundColorAsync('#f2f2f2');
      await NavigationBar.setButtonStyleAsync('dark');
    };
    navBarConfig();
  }, []);

  const handleSignUp = async () => {
    setIsLoading(true);
    const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (currentUserSnap.exists() && currentUserSnap.data().isAdmin) {
      if (password != confirmPassword) {
        Alert.alert('Erro de criação de usuário', 'Senha e confirmar senha devem ser iguais!');
      } else {
        try {
          const res = await createUserWithEmailAndPassword(authSecondary, email, password);

          await setDoc(doc(db, 'users', res.user.uid), {
            email: email,
            createdAt: serverTimestamp(),
            isAdmin: false,
            disabled: false,
          }).then(() => {
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            const newUser = { id: res.user.uid, email: email };
            props.navigation.navigate('ManageAccounts', { newUser });
          });
        } catch (err) {
          Alert.alert(
            'Erro de criação de usuário',
            'Usuário já existe ou e-mail/senha são inválidos!',
          );
          console.log(err);
        }
      }
    } else {
      Alert.alert('Conta não criada', 'Parece que você está tentando algo ao qual não tem acesso');
    }
  };

  const inputs = [
    {
      id: 1,
      secureTextEntry: false,
      onChange: setEmail,
      placeholder: 'E-mail',
      iconName: 'person-outline',
    },
    {
      id: 2,
      secureTextEntry: true,
      onChange: setPassword,
      placeholder: 'Senha',
      iconName: 'lock-closed-outline',
    },
    {
      id: 3,
      secureTextEntry: true,
      onChange: setConfirmPassword,
      placeholder: 'Confirmar Senha',
      iconName: 'lock-closed-outline',
    },
  ];

  return (
    <>
      <DashedCircle />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header text={'Administrativo - Contas'} onPress={() => props.navigation.goBack()} />
          <BigTitle>CADASTRAR CONTA</BigTitle>
          <InputArea>
            {inputs.map((item) => {
              return (
                <ContentInput key={item.id}>
                  <Icon
                    name={item.iconName}
                    type="ionicon"
                    color="#c4c4c4"
                    style={{
                      paddingRight: 12,
                      paddingVertical: 15,
                    }}
                  />
                  <ContentInputText
                    placeholder={item.placeholder}
                    secureTextEntry={item?.secureTextEntry}
                    numberOfLines={1}
                    autoCapitalize="none"
                    placeholderTextColor="#C4C4C4"
                    onChangeText={item.onChange}
                  />
                </ContentInput>
              );
            })}
          </InputArea>
        </Container>
      </TouchableWithoutFeedback>
      <ButtonView pointerEvents={'box-none'}>
        <RegisterButton
          text="CADASTRAR"
          pointerEvents={isLoading ? 'none' : 'auto'}
          isLoading={isLoading}
          onPress={() => handleSignUp().then(() => setIsLoading(false))}
        />
      </ButtonView>
    </>
  );
};
