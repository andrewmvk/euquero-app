import React from "react";
import { View, Dimensions } from "react-native";

import {
  Container,
  LogoView,
  InputArea,
  Subtitle,
  CustomButton,
  CustomButtonText,
  TextInput,
} from "./styles";
import Logo from "../../../assets/images/euquero-logo.svg";

export default () => {
  return (
    <Container>
      <View
        style={{
          alignItems: "center",
          height: Dimensions.get("window").height * 0.6,
          justifyContent: "space-evenly",
        }}
      >
        <LogoView>
          <Logo />
          <Subtitle>Acesso Administrativo</Subtitle>
        </LogoView>

        <InputArea>
          <TextInput
            placeholder="Nome de usuário"
            placerholderTextColor="grey"
          />
          <TextInput placeholder="Senha" placerholderTextColor="grey" />
        </InputArea>

        <View style={{ height: "15%" }}>
          <CustomButton>
            <CustomButtonText>Acessar</CustomButtonText>
          </CustomButton>
        </View>
      </View>
    </Container>
  );
};
