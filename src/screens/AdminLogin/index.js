import React from "react";
import { View } from "react-native";

import {
  Container,
  Header,
  LogoView,
  InputArea,
  Subtitle,
  TextInput,
  Background,
  extraStyles,
} from "./styles";
import Logo from "../../../assets/images/euquero-logo.svg";
import {
  TouchableArrow,
  SmallButton,
  buttonOpacity,
  colors,
} from "../../defaultStyles";
import DoubleDashedCircle from "../../components/DoubleDashedCircle";

export default (props) => {
  return (
    <>
      <Background>
        <DoubleDashedCircle />
        <Header>
          <TouchableArrow
            activeOpacity={buttonOpacity}
            onPress={() => props.navigation.goBack()}
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

            <View style={{ height: "15%" }}>
              <SmallButton
                onPress={() => props.navigation.navigate("AdminMainMenu")}
                text="Acessar"
              />
            </View>
          </View>
        </Container>
      </Background>
    </>
  );
};
