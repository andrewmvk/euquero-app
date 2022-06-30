import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView } from "react-native";

import {
  Container,
  LogoView,
  InputArea,
  Subtitle,
  TextInput,
  Background,
  extraStyles,
  SearchInput,
  SearchInputText,
} from "./styles";
import Header from "../../components/Header";
import { SmallButton, colors } from "../../defaultStyles";
import Logo from "../../../assets/images/euquero-logo.svg";
import { Icon } from "react-native-elements";

import Wave from "../../components/Waves/Wave";
import DashedWave from "../../components/Waves/DashedWave";

export default (props) => {
  const [transition, setTransition] = useState({ n: false, type: "nothing" });

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      setTransition({ n: true, type: "from" });
    });
  }, []);

  function handleNavigateTo(page) {
    setTransition({ n: true, type: "to" });
    setTimeout(() => {
      props.navigation.navigate(page);
    }, 400);
  }

  return (
    <Background>
      <Header
        onPress={() => props.navigation.goBack()}
        absolute={true}
        color={"white"}
      />
      <KeyboardAvoidingView
        style={{ ...extraStyles.keyboardAvoidView }}
        pointerEvents="none"
        enabled={false}
      >
        <Wave top={true} transition={transition} />
        <Wave transition={transition} />

        <DashedWave />
        <DashedWave bottom={true} />
      </KeyboardAvoidingView>
      <Container>
        <View style={{ ...extraStyles.containerView }}>
          <LogoView>
            <Logo />
            <Subtitle>Acesso Administrativo</Subtitle>
          </LogoView>
          <InputArea>
            <SearchInput>
              <Icon
                name="person-outline"
                type="ionicon"
                color="#c4c4c4"
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}
              />
              <SearchInputText
                placeholder="Nome de usuário"
                placerholderTextColor={colors.text}
              />
            </SearchInput>
            <SearchInput>
              <Icon
                name="lock-closed-outline"
                type="ionicon"
                color="#c4c4c4"
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}
              />
              <SearchInputText
                placeholder="Senha"
                placerholderTextColor={colors.text}
                secureTextEntry={true}
              />
            </SearchInput>
          </InputArea>
          <View style={{ height: "15%" }}>
            <SmallButton
              onPress={() => handleNavigateTo("AdminMainMenu")}
              text="Acessar"
            />
          </View>
        </View>
      </Container>
    </Background>
  );
};
