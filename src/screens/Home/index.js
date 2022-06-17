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
  const route = useRoute();
  const [navigate, setNavigate] = useState({ n: false, type: "to" });
  const [viewOpacity, setViewOpacity] = useState(100);

  useEffect(() => {
    if (route.params != undefined) {
      setNavigate(route.params);
      setTimeout(() => {
        setViewOpacity(100);
      }, 300);
    }
  }, [route.params]);

  function handleNavigationTo(page) {
    setNavigate({ n: true, type: "to" });
    setViewOpacity(0);
    setTimeout(() => {
      props.navigation.navigate(page, { navigate: navigate });
    }, 300);
  }

  return (
    <>
      <Container>
        <Wave size={0.2} top={true} navigate={navigate} />
        <Wave size={0.2} navigate={navigate} />

        <DashedWave size={0.18} />
        <DashedWave size={0.18} bottom={true} />

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
                  handleNavigationTo("ComoUsarOApp");
                }}
              />
            </View>
            <View style={{ opacity: viewOpacity }}>
              <SmallButton
                text="Sobre o Projeto"
                onPress={() => {
                  handleNavigationTo("SobreOProjeto");
                }}
              />
            </View>
          </Buttons>
        </View>

        <AdminBtn
          activeOpacity={buttonOpacity}
          onPress={() => handleNavigationTo("AdminLogin")}
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
