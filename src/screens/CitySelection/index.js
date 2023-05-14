import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

import { Container, SearchInput, SearchInputText, SearchArea } from './styles';
import { List, SortButton } from '../../components/common';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { navBarConfig, shadow } from '../../defaultStyles';

export default (props) => {
  const [cities, setCities] = useState([]);
  const [noUbsCities, setNoUbsCities] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${props.route.params.stateID}/municipios`,
      );

      const ubsAmountSnap = await getDocs(collection(db, 'ubsAmountCities'));

      let citiesArray = [];
      for (i = 0; i < response.data.length; i++) {
        const cityIDSlice = response.data[i].id.toString().slice(0, -1);
        const cityID = +cityIDSlice;

        let cityObject = {
          id: cityID,
          name: response.data[i].nome,
          ubsAmount: 0,
        };
        const index = ubsAmountSnap.docs.findIndex((city) => {
          return +city.id === cityID;
        });
        if (index !== -1) {
          cityObject.ubsAmount = ubsAmountSnap.docs[index].data().amount;
        }
        citiesArray.push(cityObject);
      }

      const noUbsCitiesArray = citiesArray.filter((item) => item.ubsAmount === 0);
      citiesArray = citiesArray.filter((item) => item.ubsAmount != 0);

      citiesArray.sort((a, b) =>
        a.ubsAmount > b.ubsAmount ? -1 : b.ubsAmount > a.ubsAmount ? 1 : 0,
      );

      setCities(citiesArray);
      setNoUbsCities(noUbsCitiesArray);
      setOriginalData(citiesArray);
    } catch (err) {
      console.log('Something went wrong while trying to fetch data from database or Cities API.');
      console.log(err);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    navBarConfig('relative', '#f2f2f2');
    fetchData().then(() => setIsLoading(false));
  }, []);

  const handleCardPress = (item) => {
    props.navigation.navigate('UBSSelection', {
      cityID: item.id,
      stateID: props.route.params.stateID,
      stateName: props.route.params.stateName,
      cityName: item.name,
    });
  };

  const search = useCallback(
    (t) => {
      let arr = [...originalData];
      setCities(
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
    },
    [originalData],
  );

  return (
    <>
      <DashedCircle />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header text={props.route.params.stateName} onPress={() => props.navigation.goBack()} />
          <SearchArea>
            <SearchInput style={shadow}>
              <SearchInputText
                placeholder="Buscar cidade"
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
            <SortButton data={cities} setData={setCities} dataBackup={originalData} />
          </SearchArea>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FF6B0F" style={{ marginTop: 50 }} />
          ) : (
            <List
              keyboardDismiss
              safeArea={80}
              data={cities}
              notRegisteredData={noUbsCities}
              handleCardPress={handleCardPress}
            />
          )}
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
};
