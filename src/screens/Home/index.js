import React from "react";
import { View, Dimensions, Text } from "react-native";

import {
  Container,
  LogoView,
  InputArea,
  Subtitle,
  Btns,
  BuscarBtn,
  ComoUsarBtn,
  SobreProjetoBtn,
  TxtBtn,
  TxtBtn2,
  TextInput,
} from "./styles";

import { Icon } from "@rneui/themed";
import Logo from "../../../assets/images/euquero-logo.svg";

export default () => {
  return (
    <Container>
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 60,
          zIndex: 100,
        }}
      >
        <Icon
          name="shield-account"
          type="material-community"
          color="#56A8C5"
          size={40}
          style={{
            backgroundColor: "white",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 8,
            paddingTop: 8,
            paddingLeft: 10,
            paddingRight: 15,
            borderBottomWidth: 5,
            borderColor: "#c4c4c4",
            borderEndWidth: 3,
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          height: Dimensions.get("window").height * 0.6,
          justifyContent: "space-evenly",
        }}
      >
        <LogoView>
          <Logo />
          <Subtitle>Encontre a UBS perfeita para o seu caso!</Subtitle>
        </LogoView>

        <Btns>
          <BuscarBtn>
            <TxtBtn>Buscar UBS</TxtBtn>
          </BuscarBtn>

          <ComoUsarBtn>
            <TxtBtn2>Como usar o App</TxtBtn2>
          </ComoUsarBtn>

          <SobreProjetoBtn>
            <TxtBtn2>Sobre o Projeto</TxtBtn2>
          </SobreProjetoBtn>
        </Btns>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 5,
            flexGrow: 1,
          }}
        ></View>
      </View>
    </Container>
  );
};
