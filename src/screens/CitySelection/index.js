import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { colors, EmptyListMessage } from '../../defaultStyles';
import { Container, SearchInput, SearchInputText, SearchArea } from './styles';
import { Card } from '../../defaultStyles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';

export default (props) => {
  const [cities, setCities] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  //api request
  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${props.route.params.stateID}/municipios`,
        )
        .finally(() => setIsloading(false));

      let treatedData = [];
      for (i = 0; i < response.data.length; i++) {
        const cityObject = {
          id: response.data[i].id,
          nome: response.data[i].nome,
        };
        treatedData.push(cityObject);
      }

      setCities(response.data);

      setOriginalData(response.data);
    }

    fetchData();
  }, []);

  const handleCardPress = (item) => {
    props.navigation.navigate('UBSSelection', {
      cityID: item.id,
      stateID: props.route.params.stateID,
      stateName: props.route.params.stateName,
      cityName: item.nome,
    });
  };

  //render card from flatlist
  const cityCard = ({ item }) => {
    return (
      <Card
        value={item.id}
        key={item.id}
        color={colors.orange}
        onPress={() => handleCardPress(item)}
        text={item.nome}
      />
    );
  };

  const search = (t) => {
    let arr = [...originalData];
    setCities(
      arr.filter((d) =>
        d.nome
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            t
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase(),
          ),
      ),
    );
  };

  const handleOrderClick = () => {
    let newList = [...cities];

    newList.sort((a, b) => (a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0));

    setCities(newList);
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={props.route.params.stateName} onPress={() => props.navigation.goBack()} />
        <SearchArea>
          <SearchInput>
            <SearchInputText placeholder="Buscar cidade" onChangeText={(t) => search(t)} />
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
          <TouchableOpacity onPress={handleOrderClick}>
            <Icon
              name="order-alphabetical-ascending"
              type="material-community"
              color={colors.gray}
              size={32}
              style={{ marginTop: 25, marginLeft: 25 }}
            />
          </TouchableOpacity>
        </SearchArea>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF6B0F" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            style={{
              width: '100%',
              marginTop: 25,
              paddingTop: 5,
            }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={cities}
            renderItem={cityCard}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={EmptyListMessage}
          />
        )}
      </Container>
    </>
  );
};
