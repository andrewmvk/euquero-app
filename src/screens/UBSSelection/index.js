import React, { useEffect, useState, useCallback } from 'react';
import { Icon } from 'react-native-elements';
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

import { colors, navBarConfig, shadow } from '../../defaultStyles';
import { Container, SearchInput, SearchInputText, SearchArea } from './styles';
import { List, SortButton } from '../../components/common';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';

export default (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ubs, setUbs] = useState('');
  const [ubsBackup, setUbsBackup] = useState(ubs);

  const fetchData = async () => {
    let list = [];
    try {
      const cityID = props.route.params.cityID;
      const ubsQuery = query(collection(db, 'ubs'), where('city', '==', cityID));
      const ubsSnapshot = await getDocs(ubsQuery);

      for (i = 0; i < ubsSnapshot.docs.length; i++) {
        list.push({
          id: ubsSnapshot.docs[i].id,
          ...ubsSnapshot.docs[i].data(),
        });
      }

      setUbs(list);
      setUbsBackup(list);
    } catch (err) {
      console.log('Something went wrong while trying to fetch data');
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    navBarConfig('relative', '#f2f2f2');
    fetchData().then(() => setIsLoading(false));
  }, []);

  const search = useCallback(
    (t) => {
      let arr = [...ubsBackup];
      setUbs(
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
    [ubsBackup],
  );

  const handleCardPress = (item) => {
    props.navigation.navigate('UBSMenu', {
      ubsID: item.id,
      coordinate: item.location,
      stateName: props.route.params.stateName,
      cityName: props.route.params.cityName,
      ubsName: item.name,
    });
  };

  return (
    <>
      <DashedCircle />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header
            text={`${props.route.params.stateName} - ${props.route.params.cityName}`}
            onPress={() => props.navigation.goBack()}
          />
          <SearchArea>
            <SearchInput style={shadow}>
              <SearchInputText
                placeholder="Buscar UBS"
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
            <SortButton data={ubs} setData={setUbs} dataBackup={ubsBackup} />
          </SearchArea>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
          ) : (
            <List
              data={ubs}
              onRefresh={fetchData}
              handleCardPress={handleCardPress}
              safeArea={80}
            />
          )}
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
};
