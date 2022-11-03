import React, { useState } from 'react';
import { Alert } from 'react-native';
import { auth, authSecondary, db } from '../../services/firebase.config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { BigTitle, InputBox, RegisterButton } from '../../components/common';
import { ButtonView, Container, InputArea } from './styles';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - Contas'} onPress={() => props.navigation.goBack()} />
        <BigTitle>CADASTRAR CONTA</BigTitle>
        <InputArea>
          <InputBox type="email" placeholder="E-mail" value={email} onChangeText={setEmail} />
          <InputBox
            type="password"
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
          />
          <InputBox
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </InputArea>
      </Container>
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
