import React, { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { EmptyListMessage } from '../../components/common';

import Header from '../../components/Header';
import Scorecards from '../../components/Scorecards';
import {
  Container,
  Description,
  Map,
  Period,
  Scorecard,
  ScorecardText,
  ScorecardTitle,
  TextView,
  UBSName,
} from './styles';

const bigDescription =
  'Esse indicador qualifica a oferta de canais de comunicação para os usuárias opinarem, avaliação de satisfação do usuária, discussão interna e com a gestão sobre as demandas sugestões/reclamações dos usuárias, conselho local de saúde na unidade de saúde ou afins com participação popular, existência de telefone da ouvidoria ou central de reclamações do município ou Ministério da Saúde, oportunidade de expressar a opinião sobre o funcionamento e organização desta UBS. Presença de profissionais atenciosos, claros em suas orientações demonstram interesse. Respeito e acolhimento pelos profissionais em relação a hábitos culturais e religião. Profissionais procuram saber o motivo da ausência na consulta. Além disso, ações de promoção do aleitamento materno exclusivo para crianças até seis meses, estímulo à introdução alimentar saudável e aleitamento materno continuado, utilização do novo “Guia Alimentar para a População Brasileira” do Ministério da Saúde, orientações às gestantes em relação a vacina contra tétano, alimentação saudável atividade física.';
const test = [
  {
    name: 'Respeito e empoderamento no pré-natal',
    score: 3,
    scorecard: 102,
    description: bigDescription,
  },
  {
    name: 'Respeito e empoderamento no pré-natal',
    score: 1,
    scorecard: 103,
    description: bigDescription,
  },
  {
    name: 'Respeito e empoderamento no pré-natal',
    score: 2,
    scorecard: 104,
    description: bigDescription,
  },
  {
    name: 'Respeito e empoderamento no pré-natal',
    score: 4,
    scorecard: 105,
    description: bigDescription,
  },
  {
    name: 'Respeito e empoderamento no pré-natal',
    score: 2,
    scorecard: 106,
    description: bigDescription,
  },
  {
    name: 'Respeito e empoderamento no pré-natal',
    score: 3,
    scorecard: 107,
    description: bigDescription,
  },
];

const cards = ({ item }) => {
  return <Scorecards item={item} />;
};

export default () => {
  return (
    <Container>
      <Header text={'UBS'} onPress={() => props.navigation.goBack()} />
      <Map />

      <TextView>
        <Period>Pré-Natal</Period>
        <UBSName>UBS Santo Antônio</UBSName>
      </TextView>

      <FlatList
        style={{ marginBottom: 25, width: '100%', zIndex: 0 }}
        contentContainerStyle={{ alignItems: 'center' }}
        data={test}
        renderItem={cards}
        keyExtractor={(item) => item.scorecard}
        ListEmptyComponent={<EmptyListMessage containerStyle={{ marginTop: '0%' }} />}
      />
    </Container>
  );
};
