import React from 'react';
import { View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import { Title, PhaseText, extraStyles } from './styles';
import Header from '../../components/Header';
import { buttonOpacity, colors } from '../../defaultStyles';

const slides = [
  {
    key: 1,
    image: require('../../../assets/images/passo1Img.png'),
    title: 'PASSO 1',
    text: 'Para encontrar a UBS, clique no botão “Buscar UBS” da tela inicial;',
  },
  {
    key: 2,
    image: require('../../../assets/images/passo2Img.png'),
    title: 'PASSO 2',
    text: 'Selecione o Estado ao qual sua Cidade pertence;',
  },
  {
    key: 3,
    image: require('../../../assets/images/passo3Img.png'),
    title: 'PASSO 3',
    text: 'Selecione a Cidade para encontrar uma UBS;',
  },
  {
    key: 4,
    image: require('../../../assets/images/passo4Img.png'),
    title: 'PASSO 4',
    text: 'Selecione a UBS para ver seus serviços e localização;',
  },
  {
    key: 5,
    image: require('../../../assets/images/passo5Img.png'),
    title: 'PASSO 5',
    text: 'Selecione o serviço prestado pela UBS;',
  },
  {
    key: 6,
    image: require('../../../assets/images/passo1Img.svg'),
    title: 'PASSO 6',
    text: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
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
      <Header activeOpacity={buttonOpacity} onPress={() => props.navigation.goBack()} />

      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={{
          backgroundColor: colors.orange,
          width: 30,
        }}
        onDone={() => props.navigation.goBack()}
      />
    </>
  );
};
