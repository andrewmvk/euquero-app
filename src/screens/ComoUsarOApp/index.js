import React, { useRef, useState, useEffect } from 'react';
import { View, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSharedValue } from 'react-native-reanimated';

import { Title, PhaseText, extraStyles, DotsView } from "./styles";
import Header from "../../components/Header";
import { buttonOpacity, colors, navBarConfig } from "../../defaultStyles";
import { Dot } from "../../components/common";

const slides = [
  {
    key: 0,
    image: require("../../../assets/images/passo1Img.png"),
    title: "PASSO 1",
    text: "Para encontrar a UBS, clique no botão “Buscar UBS” da tela inicial;",
  },
  {
    key: 1,
    image: require("../../../assets/images/passo2Img.png"),
    title: "PASSO 2",
    text: "Selecione o Estado ao qual sua Cidade pertence. Outros Estados estão “Em desenvolvimento”, ou seja, não disponíveis por enquanto;",
  },
  {
    key: 2,
    image: require("../../../assets/images/passo3Img.png"),
    title: "PASSO 3",
    text: "Selecione a Cidade para encontrar uma UBS. Cidades que não tenham UBS estão “Em desenvolvimento”;",
  },
  {
    key: 3,
    image: require("../../../assets/images/passo4Img.png"),
    title: "PASSO 4",
    text: "Selecione a UBS para ver seus serviços e localização;",
  },
  {
    key: 4,
    image: require("../../../assets/images/passo5Img.png"),
    title: "PASSO 5",
    text: "Selecione a opção “Serviços” ou a de um dos “Períodos” desejados;",
  },
  {
    key: 5,
    image: require("../../../assets/images/passo6Img.png"),
    title: "PASSO 6",
    text: "Caso selecione algum período: serão listadas as notas de alguns indicadores daquela UBS, juntamente com uma descrição do mesmo; ",
  },
  {
    key: 6,
    image: require("../../../assets/images/notas.png"),
    text: "Sendo que, quanto mais perto do “Diamante”, melhor a avaliação do serviço;",
  },
  {
    key: 7,
    image: require("../../../assets/images/passo7Img.png"),
    title: "PASSO 7",
    text: "Selecione um Indicador para poder ver seu Glossário, onde este é a página na qual você poderá entender mais sobre o Indicador Selecionado;",
  },
  {
    key: 8,
    image: require("../../../assets/images/passo8Img.png"),
    title: "PASSO 8",
    text: "Caso selecione serviços: serão listados todos os serviços disponíveis daquela UBS.",
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
    return (
      <View style={extraStyles.containerOut}>
        <Image source={item.image} style={extraStyles.tutorialImage} />
        <Title>{item.title}</Title>
        <View style={extraStyles.containerIn}>
          <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            showsVerticalScrollIndicator={false}
          >
            <PhaseText>{item.text}</PhaseText>
          </ScrollView>
        </View>
      </View>
    );
  };

  const PageIndicator = () => {
    const factor = 8;

    const scrollTo = (direction) => {
      let index = currentIndex;
      if (
        (direction < 0 && currentIndex > 0) ||
        (direction > 0 && currentIndex < slides.length - 1)
      ) {
        index = currentIndex + direction;
      }
      flatListRef.current?.scrollToIndex({
        animated: true,
        index,
      });
    };

    return (
      <DotsView style={{ width: `${factor * (slides.length + 2)}%` }}>
        <TouchableOpacity
          onPress={() => scrollTo(-1)}
          activeOpacity={buttonOpacity}
        >
          <Icon
            style={{ marginRight: "5%", opacity: currentIndex > 0 ? 1 : 0 }}
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
            currentIndex == slides.length - 1
              ? props.navigation.goBack()
              : scrollTo(1)
          }
          activeOpacity={buttonOpacity}
        >
          <Icon
            style={{ marginLeft: "5%" }}
            type="material-community"
            name={currentIndex == slides.length - 1 ? "check" : "arrow-right"}
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
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 30,
          }}
          onViewableItemsChanged={viewableItemsChanged}
          onScroll={({ nativeEvent }) => {
            scrollX.value = nativeEvent.contentOffset.x;
          }}
        />
        <PageIndicator />
      </View>
    </>
  );
};
