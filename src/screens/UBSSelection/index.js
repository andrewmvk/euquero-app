import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../defaultStyles';
import { Container, SearchInput, SearchInputText, SearchArea } from './styles';
import { Card } from '../../defaultStyles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';

export default props => {
  const ubs = [
    {
      id: 1,
      nome: 'UBS 1'
    },
    {
      id: 2,
      nome: 'UBS 2'
    },
    {
      id: 3,
      nome: 'UBS 3'
    }
  ];

  const ubsCard = ({ item }) => {
    return <Card value={item.id} key={item.id} text={item.nome} />;
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header
          text={`${props.route.params.stateName} - ${props.route.params.cityName}`}
          onPress={() => props.navigation.goBack()}
        />
        <SearchArea>
          <SearchInput>
            <SearchInputText placeholder="Buscar UBS" />
            <Icon
              name="search-outline"
              type="ionicon"
              color="#c4c4c4"
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15
              }}
            />
          </SearchInput>
          <TouchableOpacity>
            <Icon
              name="order-alphabetical-ascending"
              type="material-community"
              color={colors.gray}
              size={32}
              style={{ marginTop: 25, marginLeft: 25 }}
            />
          </TouchableOpacity>
        </SearchArea>
        <FlatList
          style={{ width: '85%', marginTop: 25, marginBottom: 25 }}
          data={ubs}
          renderItem={ubsCard}
          keyExtractor={item => item.id}
        />
      </Container>
    </>
  );
};
