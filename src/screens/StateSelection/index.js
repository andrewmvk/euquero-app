import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

import { colors } from '../../defaultStyles';
import { Container, SearchInput, SearchInputText, SearchArea } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { SortButton, List } from '../../components/common';

export default (props) => {
  const [brazilianStates, setBrazilianStates] = useState([]);
  const [noUbsStates, setNoUbsStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  const fetchData = async () => {
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

      const noUbsStatesArray = statesArray.filter((item) => item.ubsAmount === 0);
      statesArray = statesArray.filter((item) => item.ubsAmount != 0);

      statesArray.sort((a, b) =>
        a.ubsAmount > b.ubsAmount ? -1 : b.ubsAmount > a.ubsAmount ? 1 : 0,
      );

      setNoUbsStates(noUbsStatesArray);
      setBrazilianStates(statesArray);
      setOriginalData(statesArray);
    } catch (err) {
      console.log('Something went wrong while trying to fetch data from database or State API.');
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(() => setIsLoading(false));
  }, []);

  const handleCardPress = (item) => {
    props.navigation.navigate('CitySelection', {
      stateID: item.id,
      stateName: item.name,
    });
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header onPress={() => props.navigation.goBack()} />
          <SearchArea>
            <SearchInput>
              <SearchInputText
                placeholder="Buscar estado"
                placeholderTextColor="#C4C4C4"
                numberOfLines={1}
                onChangeText={(t) => search(t)}
              />
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
            <List
              data={brazilianStates}
              notRegistredData={noUbsStates}
              onRefresh={fetchData}
              handleCardPress={handleCardPress}
            />
          )}
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
};
