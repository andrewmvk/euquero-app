import React from "react";
import { View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Icon } from "react-native-elements";

import { Title, PhaseText, extraStyles } from "./styles";
import Header from "../../components/Header";
import { colors } from "../../defaultStyles";

const slides = [
  {
    key: 1,
    image: require("../../../assets/images/passo1Img.png"),
    title: "PASSO 1",
    text: "Para encontrar a UBS, clique no botão “Buscar UBS” da tela inicial;",
  },
  {
    key: 2,
    image: require("../../../assets/images/passo2Img.png"),
    title: "PASSO 2",
    text: "Selecione o Estado ao qual sua Cidade pertence;",
  },
  {
    key: 3,
    image: require("../../../assets/images/passo3Img.png"),
    title: "PASSO 3",
    text: "Selecione a Cidade para encontrar uma UBS;",
  },
  {
    key: 4,
    image: require("../../../assets/images/passo4Img.png"),
    title: "PASSO 4",
    text: "Selecione a UBS para ver seus serviços e localização;",
  },
  {
    key: 5,
    image: require("../../../assets/images/passo5Img.png"),
    title: "PASSO 5",
    text: "Selecione o serviço prestado pela UBS;",
  },
  {
    key: 6,
    image: require("../../../assets/images/passo6Img.png"),
    title: "PASSO 6",
    text: "Aqui serão listadas as notas dos indicadores daquele serviço, juntamente com sua descrição; ",
  },
  {
    key: 7,
    image: require("../../../assets/images/passo7Img.png"),
    text: "Quanto mais perto a nota está do “Diamante”, melhor é a avaliação do serviço. ",
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

  _renderNextButton = () => {
    return (
      <View style={{ marginTop: 7, marginRight: 60 }}>
        <Icon
          name="arrow-right"
          type="material-community"
          color={colors.orange}
          size={28}
        />
      </View>
    );
  };

  _renderPrevButton = () => {
    return (
      <View style={{ marginTop: 7, marginLeft: 60 }}>
        <Icon
          name="arrow-left"
          type="material-community"
          color={colors.orange}
          size={28}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={{ marginTop: 7, marginRight: 60 }}>
        <Icon
          name="check"
          type="material-community"
          color={colors.orange}
          size={28}
        />
      </View>
    );
  };

  return (
    <>
      <Header onPress={() => props.navigation.goBack()} />
      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={{
          backgroundColor: colors.orange,
          width: 30,
        }}
        showPrevButton={true}
        onDone={() => props.navigation.goBack()}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        renderPrevButton={this._renderPrevButton}
      />
    </>
  );
};
