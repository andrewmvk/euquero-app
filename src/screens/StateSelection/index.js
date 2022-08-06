import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

import { colors, EmptyListMessage } from '../../defaultStyles';
import { Container, SearchInput, SearchInputText, SearchArea } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { Card } from '../../defaultStyles';

export default (props) => {
  const [brazilianStates, setBrazilianStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let statesArray = [];

      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
      );

      const ubsAmountSnap = await getDocs(collection(db, 'ubsCount'));

      for (i = 0; i < response.data.length; i++) {
        let ubsAmount = 0;
        for (j = 0; j < ubsAmountSnap.docs.length; j++) {
          if (+ubsAmountSnap.docs[j].id === response.data[i].id) {
            ubsAmount = ubsAmountSnap.docs[j].data().amount;
          }
        }
        const stateObject = {
          nome: response.data[i].nome,
          id: response.data[i].id,
          ubsAmount: ubsAmount ? ubsAmount : 0,
        };
        statesArray.push(stateObject);
      }

      statesArray.sort((a, b) =>
        a.ubsAmount > b.ubsAmount ? -1 : b.ubsAmount > a.ubsAmount ? 1 : 0,
      );

      setBrazilianStates(statesArray);
      setOriginalData(statesArray);
    };

    fetchData().then(() => setIsLoading(false));
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
        color={item.ubsAmount != 0 ? colors.orange : colors.gray}
        onPress={() => handleCardPress(item)}
        text={item.nome}
        ubsCount={`${item.ubsAmount}`}
      />
    );
  };

  const search = (t) => {
    let arr = [...originalData];
    setBrazilianStates(
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
            <SearchInputText placeholder="Buscar estado" onChangeText={(t) => search(t)} />
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
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            style={{
              width: '100%',
              marginTop: 25,
              paddingTop: 5,
            }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={brazilianStates}
            renderItem={stateCard}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={EmptyListMessage}
          />
        )}
      </Container>
    </>
  );
};
