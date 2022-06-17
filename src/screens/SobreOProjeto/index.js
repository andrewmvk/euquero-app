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
    image: require("../../../assets/images/sobreOProjeto1.png"),
    title: "Quem Somos",
    text: "O projeto EU QUERO é uma pesquisa com enfoque nos direitos à saúde materna e infantil com vistas ao fortalecimento do sistema público de saúde. Nosso ponto de partida é a valorização da promoção à saúde no período dos 1000 dias de vida – desde a gestação, parto e puerpério, até a saúde da criança até dois anos de idade;O projeto EU QUERO é uma pesquisa com enfoque nos direitos à saúde materna e infantil com vistas ao fortalecimento do sistema público de saúde. Nosso ponto de partida é a valorização da promoção à saúde no período dos 1000 dias de vida – desde a gestação, parto e puerpério, até a saúde da criança até dois anos de idade;",
  },
  {
    key: 2,
    image: require("../../../assets/images/sobreOProjeto1.png"),
    title: "Nossa Visão",
    text: "Buscamos com este estudo desenvolver e implementar o Programa Educativo EU QUERO - Formação em Direitos à Saúde no Período dos 1000 dias de vida, junto a Agentes Comunitários de Saúde (ACS), médicos e enfermeiros da atenção primária;",
  },
  {
    key: 3,
    image: require("../../../assets/images/sobreOProjeto1.png"),
    title: "Nossos Objetivos",
    text: "1 - Desenvolver uma rede de pesquisa, envolvendo universidades, trabalhadores, gestores e comunidade. \n \n 2 - Monitorar a qualidade dos serviços ofertados nos 1000 dias; \n \n 3 - Ampliar a integração entre a comunidade (especialmente as gestantes e mães), profissionais de saúde e gestores em saúde;",
  },
];

export default (props) => {
  function renderSlides({ item }) {
    return (
      <View style={{ ...extraStyles.containerOut }}>
        <Image source={item.image} style={{ ...extraStyles.tutorialImage }} />
        <View style={{ ...extraStyles.containerIn }}>
          <Title>{item.title}</Title>
          <PhaseText
            style={{
              width: 250,
              height: 300,
              overflow: "scroll",
            }}
          >
            {item.text}
          </PhaseText>
        </View>
      </View>
    );
  }

  return (
    <>
      <Header>
        <TouchableArrow
          activeOpacity={buttonOpacity}
          onPress={() => goToHome(props.navigation)}
        />
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
