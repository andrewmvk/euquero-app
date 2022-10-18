import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

import { colors } from '../../defaultStyles';
import { Container, SearchInput, SearchInputText, SearchArea } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { Card, InDevelopmentCard, EmptyListMessage, SortButton } from '../../components/common';

export default (props) => {
  const [brazilianStates, setBrazilianStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
        );

        const ubsAmountSnap = await getDocs(collection(db, 'ubsAmountStates'));

        let statesArray = [];
        for (i = 0; i < response.data.length; i++) {
          let stateObject = {
            id: response.data[i].id,
            name: response.data[i].nome,
            ubsAmount: 0,
          };
          const index = ubsAmountSnap.docs.findIndex((state) => {
            return +state.id === response.data[i].id;
          });
          if (index !== -1) {
            stateObject.ubsAmount = ubsAmountSnap.docs[index].data().amount;
          }
          statesArray.push(stateObject);
        }

        statesArray.sort((a, b) =>
          a.ubsAmount > b.ubsAmount ? -1 : b.ubsAmount > a.ubsAmount ? 1 : 0,
        );

        setBrazilianStates(statesArray);
        setOriginalData(statesArray);
      } catch (err) {
        console.log('Something went wrong while trying to fetch data from database or State API.');
        console.log(err);
      }
    };

    fetchData().then(() => setIsLoading(false));
  }, []);

  const handleCardPress = (item) => {
    props.navigation.navigate('CitySelection', {
      stateID: item.id,
      stateName: item.name,
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
        text={item.name}
        ubsCount={`${item.ubsAmount}`}
      />
    );
  };

  const search = (t) => {
    let arr = [...originalData];
    setBrazilianStates(
      arr.filter((d) =>
        d.name
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
          <SortButton
            data={brazilianStates}
            setData={setBrazilianStates}
            dataBackup={originalData}
          />
        </SearchArea>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <>
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
            {/*<InDevelopmentCard />*/}
          </>
        )}
      </Container>
    </>
  );
};
