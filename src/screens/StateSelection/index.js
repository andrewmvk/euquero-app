import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { FlatList, TouchableOpacity, Image, View } from 'react-native';
import axios from 'axios';
import { colors } from '../../defaultStyles';
import {
  Container,
  SearchInput,
  SearchInputText,
  SearchArea,
  NoResults,
  Title,
  SimpleText
} from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { Card } from '../../defaultStyles';

export default props => {
  const [brazilianStates, setBrazilianStates] = useState([]);

  // backup array
  const [originalData, setOriginalData] = useState([]);

  //api request
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
      );

      setBrazilianStates(response.data);

      setOriginalData(response.data);
    }

    fetchData();
  }, []);

  const handleCardPress = item => {
    props.navigation.navigate('CitySelection', {
      stateID: item.id,
      stateName: item.nome
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

  const search = t => {
    let arr = [...originalData];
    setBrazilianStates(
      arr.filter(d =>
        d.nome
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            t
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
          )
      )
    );
  };

  const handleOrderClick = () => {
    let newList = [...brazilianStates];

    newList.sort((a, b) => (a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0));

    setBrazilianStates(newList);
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header onPress={() => props.navigation.goBack()} />
        <SearchArea>
          <SearchInput>
            <SearchInputText
              placeholder="Buscar estado"
              onChangeText={t => search(t)}
            />
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
        {brazilianStates.length === 0 ? (
          <NoResults>
            <View>
              <Image
                source={require('../../../assets/images/noResultsImg.png')}
              />
            </View>
            <Title>NADA POR AQUI!</Title>
            <SimpleText>
              Não encontramos nenhum item correspondente à sua pesquisa.
            </SimpleText>
          </NoResults>
        ) : (
          <FlatList
            style={{ width: '85%', marginTop: 25, marginBottom: 25 }}
            data={brazilianStates}
            renderItem={stateCard}
            keyExtractor={item => item.id}
          />
        )}
      </Container>
    </>
  );
};
