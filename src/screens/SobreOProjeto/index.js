import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Linking,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Title, PhaseText, extraStyles, DotsView } from './styles';
import Header from '../../components/Header';
import { Dot, SmallButton } from '../../components/common';
import { Icon } from 'react-native-elements';
import { buttonOpacity, colors, navBarConfig } from '../../defaultStyles';

const slides = [
  {
    key: 0,
    image: require('../../../assets/images/sobreOProjetoImg1.png'),
    title: 'Quem Somos',
    text: 'O termo EU QUERO se refere à sigla do título da pesquisa na língua inglesa: Engaging Users for Quality Enhancement and Rights: Strengthening the maternal and child healthcare system over the first 1000 days in Brazil. A investigação é fruto de uma parceria entre a Universidade Federal de Jataí, Universidade Federal de Goiás, Universidade Federal do Maranhão, no Brasil, e a Universidade de Southampton, no Reino Unido. O estudo recebeu financiamento da Fundação de Amparo à Pesquisa do Estado de Goiás, Fundação de Amparo à Pesquisa e ao Desenvolvimento Científico e Tecnológico do Maranhão, e pelo Medical Research Council, do Reino Unido. Este projeto encontra-se é alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) enunciados pela Organização das Nações Unidas (ONU), em 2015, especialmente os Objetivos 3 (Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades) e 5 (Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas). Esses ODS propõem a redução da mortalidade materna e de mortes evitáveis de recém-nascidos e crianças menores de 5 anos, além de assegurar o acesso universal aos serviços de saúde sexual e reprodutiva, incluindo o planejamento familiar, informação e educação.',
  },
  {
    key: 1,
    image: require('../../../assets/images/sobreOProjetoImg2.png'),
    title: 'Nossa Visão',
    text: 'Buscamos com este estudo desenvolver e implementar o Programa Educativo EU QUERO - Formação em Direitos à Saúde no Período dos 1000 dias de vida, junto a Agentes Comunitários de Saúde (ACS), médicos e enfermeiros da atenção primária.',
  },
  {
    key: 2,
    image: require('../../../assets/images/sobreOProjetoImg3.png'),
    title: 'Nossos Objetivos',
    text: '1 - Desenvolver uma rede de pesquisa, envolvendo universidades, trabalhadores, gestores e comunidade. \n \n 2 - Monitorar a qualidade dos serviços ofertados nos 1000 dias; \n \n 3 - Ampliar a integração entre a comunidade (especialmente as gestantes e mães), profissionais de saúde e gestores em saúde; \n \n 4 - Contribuir para o empoderamento das mulheres quanto aos seus direitos e de seus filhos nos primeiros 1000 dias; \n \n 5 - Fortalecer o sistema de saúde para oferecer maior qualidade e acesso aos cuidados de saúde materna, neonatal e infantil nos primeiros 1000 dias.',
  },
];

export default (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  useEffect(() => {
    navBarConfig('relative', '#f2f2f2');
  }, []);

  const flatListRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const renderSlides = ({ item }) => {
    let windowHeight = Dimensions.get('window').height;
    return (
      <View style={extraStyles.containerOut}>
        <Image source={item.image} style={extraStyles.tutorialImage} />
        <View style={extraStyles.containerIn}>
          <Title>{item.title}</Title>
          <ScrollView
            style={{ marginTop: windowHeight * 0.036 }}
            contentContainerStyle={{ alignItems: 'center' }}
            showsVerticalScrollIndicator={false}
          >
            <PhaseText>{item.text}</PhaseText>
          </ScrollView>
          <View style={{ alignItems: 'center', marginTop: windowHeight * 0.036 }}>
            <SmallButton
              text="Saiba Mais"
              onPress={() => Linking.openURL('https://euquero.ufma.br')}
            />
          </View>
        </View>
      </View>
    );
  };

  const PageIndicator = () => {
    const factor = 14;
    const arrowMargin = `${(factor * slides.length) / 2.3}%`;

    const scrollTo = (direction) => {
      let index = currentIndex;
      if (
        (direction < 0 && currentIndex > 0) ||
        (direction > 0 && currentIndex < slides.length - 1)
      ) {
        index += direction;
      }
      flatListRef.current?.scrollToIndex({
        animated: true,
        index,
      });
    };

    return (
      <DotsView style={{ width: `${factor * (slides.length + 2)}%` }}>
        <TouchableOpacity onPress={() => scrollTo(-1)} activeOpacity={buttonOpacity}>
          <Icon
            style={{ marginRight: arrowMargin, opacity: currentIndex > 0 ? 1 : 0 }}
            type="material-community"
            name="arrow-left"
            size={30}
            color={colors.orange}
          />
        </TouchableOpacity>
        {slides.map((slides) => {
          return <Dot id={slides.key} key={slides.key} scrollX={scrollX} />;
        })}
        <TouchableOpacity
          onPress={() =>
            currentIndex == slides.length - 1 ? props.navigation.goBack() : scrollTo(1)
          }
          activeOpacity={buttonOpacity}
        >
          <Icon
            style={{ marginLeft: arrowMargin }}
            type="material-community"
            name={currentIndex == slides.length - 1 ? 'check' : 'arrow-right'}
            size={30}
            color={colors.orange}
          />
        </TouchableOpacity>
      </DotsView>
    );
  };

  return (
    <>
      <SafeAreaView>
        <Header onPress={() => props.navigation.goBack()} />
      </SafeAreaView>
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlides}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled
          keyExtractor={(item) => item.key}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 30,
          }}
          onScroll={({ nativeEvent }) => {
            scrollX.value = nativeEvent.contentOffset.x;
          }}
        />
        <PageIndicator />
      </View>
    </>
  );
};
