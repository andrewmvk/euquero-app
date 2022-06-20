import React from 'react'
import { View } from 'react-native'

import {
  Container,
  Header,
  LogoView,
  InputArea,
  Subtitle,
  TextInput,
  Background,
  extraStyles
} from './styles'
import {
  TouchableArrow,
  SmallButton,
  buttonOpacity,
  colors,
  goToHome
} from '../../defaultStyles'
import Logo from '../../../assets/images/euquero-logo.svg'

export default props => {
  return (
    <>
      <Background>
        <Header>
          <TouchableArrow
            activeOpacity={buttonOpacity}
            onPress={() => goToHome(props.navigation)}
          />
        </Header>
        <Container>
          <View style={{ ...extraStyles }}>
            <LogoView>
              <Logo />
              <Subtitle>Acesso Administrativo</Subtitle>
            </LogoView>

            <InputArea>
              <TextInput
                placeholder="Nome de usuário"
                placerholderTextColor={colors.text}
              />
              <TextInput
                placeholder="Senha"
                placerholderTextColor={colors.text}
                secureTextEntry={true}
              />
            </InputArea>

            <View style={{ height: '15%' }}>
              <SmallButton
                onPress={() => props.navigation.navigate('AdminMainMenu')}
                text="Acessar"
              />
            </View>
          </View>
        </Container>
      </Background>
    </>
  )
}
