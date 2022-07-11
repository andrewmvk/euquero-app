import React, { useState } from 'react';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { BigTitle, InputBox, RegisterButton } from '../../defaultStyles';
import { ButtonView, Container, InputArea } from './styles';

export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      <ButtonView>
        <RegisterButton text="CADASTRAR" />
      </ButtonView>
    </>
  );
};
