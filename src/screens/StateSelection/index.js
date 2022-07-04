import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native';
import axios from 'axios';

import { Container, SearchInput, SearchInputText } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { Card } from '../../defaultStyles';

export default (props) => {
  const [brazilianStates, setBrazilianStates] = useState([]);

  //api request
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
      );

      setBrazilianStates(response.data);
    }

    fetchData();
  }, []);

  const handleCardPress = (item) => {
    props.navigation.navigate('CitySelection', {
      stateID: item.id,
      stateName: item.nome,
    });
  };

  //render card from flatlist
  const stateCard = ({ item }) => {
    return (
      <Card
        value={item.id}
        key={item.id}
        onPress={() => handleCardPress(item)}
        text={item.nome}
        ubsCount={'00 UBS'}
      />
    );
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header onPress={() => props.navigation.goBack()} />
        <SearchInput>
          <SearchInputText placeholder="Buscar estado" />
          <Icon
            name="search-outline"
            type="ionicon"
            color="#c4c4c4"
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          />
        </SearchInput>
        <FlatList
          style={{ width: '85%', marginTop: 25, marginBottom: 25 }}
          data={brazilianStates}
          renderItem={stateCard}
          keyExtractor={(item) => item.id}
        />
      </Container>
    </>
  );
};
