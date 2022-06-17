import React, { useEffect, useState } from "react";
import { View } from "react-native";

import {
  Container,
  LogoView,
  Subtitle,
  Buttons,
  AdminBtn,
  extraStyles,
} from "./styles";

import Wave from "../../components/Waves/Wave";
import DashedWave from "../../components/Waves/DashedWave";

import { Icon } from "@rneui/themed";
import Logo from "../../../assets/images/euquero-logo.svg";
import { LargeButton, SmallButton, buttonOpacity } from "../../defaultStyles";
import { useRoute } from "@react-navigation/native";

export default (props) => {
  const [transition, setTransition] = useState({ n: false, type: "" });

  const [viewOpacity, setViewOpacity] = useState(100);

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
    <>
      <Container>
        <Wave top={true} transition={transition} />
        <Wave transition={transition} />

        <DashedWave />
        <DashedWave bottom={true} />

        <View style={{ ...extraStyles.viewBody }}>
          <LogoView>
            <Logo />
            <Subtitle>Encontre a UBS perfeita para o seu caso!</Subtitle>
          </LogoView>

          <Buttons>
            <View style={{ marginBottom: 35, opacity: viewOpacity }}>
              <LargeButton text="Buscar UBS" />
            </View>
            <View style={{ marginBottom: 20, opacity: viewOpacity }}>
              <SmallButton
                text="Como usar o App"
                onPress={() => {
                  handleNavigateTo("ComoUsarOApp");
                }}
              />
            </View>
            <View style={{ opacity: viewOpacity }}>
              <SmallButton
                text="Sobre o Projeto"
                onPress={() => {
                  handleNavigateTo("SobreOProjeto");
                }}
              />
            </View>
          </Buttons>
        </View>

        <AdminBtn
          activeOpacity={buttonOpacity}
          onPress={() => props.navigation.navigate("AdminLogin")}
        >
          <Icon
            name="shield-account"
            type="material-community"
            color="#56A8C5"
            size={40}
            style={{ ...extraStyles.adminIcon }}
          />
        </AdminBtn>
      </Container>
    </>
  );
};
