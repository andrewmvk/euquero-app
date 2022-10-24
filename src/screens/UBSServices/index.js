import React, { useState, useEffect } from 'react';

import { Card, EmptyListMessage } from '../../components/common';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';

import Header from '../../components/Header';
import { Container, Map, Period, TextView, UBSName } from './styles';
import { colors } from '../../defaultStyles';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Arroz',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Feijão',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Batata',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723',
      title: 'Batata',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d724',
      title: 'Batata',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d725',
      title: 'Batata',
    },
  ];

  const serviceCard = ({ item }) => <Card color={'#fff'} text={item.title} />;

  return (
    <Container>
      <Header onPress={() => props.navigation.goBack()} />
      <Map />

      <TextView>
        <Period>Serviços</Period>
        <UBSName numberOfLines={2}>Nome da UBS</UBSName>
      </TextView>

      {isLoading ? (
        <ActivityIndicator
          size='large'
          color={colors.orange}
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          style={{ marginBottom: 25, width: '100%', zIndex: 0 }}
          contentContainerStyle={{ alignItems: 'center' }}
          data={DATA}
          renderItem={serviceCard}
          keyExtractor={(item) => item.id}
        />
      )}
    </Container>
  );
};
