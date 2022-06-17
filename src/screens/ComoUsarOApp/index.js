import React from "react";
import { View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import { Header, Title, PhaseText, extraStyles } from "./styles";
import {
  TouchableArrow,
  buttonOpacity,
  colors,
  goToHome,
} from "../../defaultStyles";

const slides = [
  {
    key: 1,
    image: require("../../../assets/images/passo.png"),
    title: "PASSO 1",
    text: "Para encontrar a UBS, clique no botão “Buscar UBS” da tela inicial;",
  },
  {
    key: 2,
    image: require("../../../assets/images/passo.png"),
    title: "PASSO 2",
    text: "Selecione o Estado ao qual sua Cidade pertence;",
  },
  {
    key: 3,
    image: require("../../../assets/images/passo.png"),
    title: "PASSO 3",
    text: "Selecione a Cidade para encontrar uma UBS;",
  },
];

export default (props) => {
  function renderSlides({ item }) {
    return (
      <View style={{ ...extraStyles.containerOut }}>
        <Image source={item.image} style={{ ...extraStyles.tutorialImage }} />
        <View style={{ ...extraStyles.containerIn }}>
          <Title>{item.title}</Title>
          <PhaseText>{item.text}</PhaseText>
        </View>
      </View>
    );
  }

  return (
    <>
      <Header>
        <TouchableArrow activeOpacity={buttonOpacity} onPress={() => props.navigation.goBack()} />
      </Header>

      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={{
          backgroundColor: colors.orange,
          width: 30,
        }}
        onDone={() => props.navigation.goToHome(props.navigation)}
      />
    </>
  );
};
