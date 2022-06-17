import React from "react";
import { View, Image, ScrollView, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import { Header, Title, PhaseText, extraStyles, TextScroll } from "./styles";
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
    text: "O termo EU QUERO se refere à sigla do título da pesquisa na língua inglesa: Engaging Users for Quality Enhancement and Rights: Strengthening the maternal and child healthcare system over the first 1000 days in Brazil. A investigação é fruto de uma parceria entre a Universidade Federal de Jataí, Universidade Federal de Goiás, Universidade Federal do Maranhão, no Brasil, e a Universidade de Southampton, no Reino Unido. O estudo recebeu financiamento da Fundação de Amparo à Pesquisa do Estado de Goiás, Fundação de Amparo à Pesquisa e ao Desenvolvimento Científico e Tecnológico do Maranhão, e pelo Medical Research Council, do Reino Unido. Este projeto encontra-se é alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) enunciados pela Organização das Nações Unidas (ONU), em 2015, especialmente os Objetivos 3 (Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades) e 5 (Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas). Esses ODS propõem a redução da mortalidade materna e de mortes evitáveis de recém-nascidos e crianças menores de 5 anos, além de assegurar o acesso universal aos serviços de saúde sexual e reprodutiva, incluindo o planejamento familiar, informação e educação.",
  },
  {
    key: 2,
    image: require("../../../assets/images/sobreOProjeto1.png"),
    title: "Nossa Visão",
    text: "Buscamos com este estudo desenvolver e implementar o Programa Educativo EU QUERO - Formação em Direitos à Saúde no Período dos 1000 dias de vida, junto a Agentes Comunitários de Saúde (ACS), médicos e enfermeiros da atenção primária.",
  },
  {
    key: 3,
    image: require("../../../assets/images/sobreOProjeto1.png"),
    title: "Nossos Objetivos",
    text: "1 - Desenvolver uma rede de pesquisa, envolvendo universidades, trabalhadores, gestores e comunidade. \n \n 2 - Monitorar a qualidade dos serviços ofertados nos 1000 dias; \n \n 3 - Ampliar a integração entre a comunidade (especialmente as gestantes e mães), profissionais de saúde e gestores em saúde; \n \n 4 - Contribuir para o empoderamento das mulheres quanto aos seus direitos e de seus filhos nos primeiros 1000 dias; \n \n 5 - Fortalecer o sistema de saúde para oferecer maior qualidade e acesso aos cuidados de saúde materna, neonatal e infantil nos primeiros 1000 dias.",
  },
];

export default (props) => {
  function renderSlides({ item }) {
    return (
      <View style={{ ...extraStyles.containerOut }}>
        <Image source={item.image} style={{ ...extraStyles.tutorialImage }} />
        <View style={{ ...extraStyles.containerIn }}>
          <Title>{item.title}</Title>
          <TextScroll>
            <PhaseText>{item.text}</PhaseText>
          </TextScroll>
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
