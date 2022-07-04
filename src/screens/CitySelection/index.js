import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native';
import axios from 'axios';

import { Container, SearchInput, SearchInputText } from './styles';
import { Card } from '../../defaultStyles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';

export default (props) => {
  const [cities, setCities] = useState([]);

  //api request
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${props.route.params.stateID}/municipios`,
      );

      setCities(response.data);
    }

    fetchData();
  }, []);

  //render card from flatlist
  const cityCard = ({ item }) => {
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
        <Header text={props.route.params.stateName} onPress={() => props.navigation.goBack()} />
        <SearchInput>
          <SearchInputText placeholder="Buscar cidade" />
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
          data={cities}
          renderItem={cityCard}
          keyExtractor={(item) => item.id}
        />
      </Container>
    </>
  );
};
