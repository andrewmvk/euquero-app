import React, { useState } from 'react';
import { authSecondary, db } from '../../services/firebase.config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { BigTitle, InputBox, RegisterButton } from '../../defaultStyles';
import { ButtonView, Container, InputArea } from './styles';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    setIsLoading(true);
    if (password != confirmPassword) {
      return console.log('Password and confirm password do not match');
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
        console.log(
          'Error while trying to create new user, already exists or e-mail/password are invalid!',
        );
        console.log(err);
      }
    }
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - Contas'} onPress={() => props.navigation.goBack()} />
        <BigTitle text="CADASTRAR CONTA" />
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
