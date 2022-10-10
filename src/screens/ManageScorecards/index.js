import React, { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Shadow } from 'react-native-shadow-2';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { AddButton, EmptyListMessage } from '../../components/common';
import { buttonOpacity, colors } from '../../defaultStyles';
import { Container, SearchArea, SearchInput, SearchInputText } from './styles';
import EditableCard from '../../components/EditableCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scorecards, setScoreCards] = useState([]);
  const [scorecardsBackup, setScoreCardsBackup] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, 'scorecards'));

    let scorecardsArray = [];
    querySnapshot.forEach((doc) => {
      const scorecard = {
        name: doc.data().name,
        description: doc.data().description,
        id: doc.data().id,
      };
      scorecardsArray.push(scorecard);
    });

    setScoreCards(scorecardsArray);
    setScoreCardsBackup(scorecardsArray);
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  const searchBoxShadow = {
    distance: 2,
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
  };

  const search = (t) => {
    if (scorecardsBackup.length > 0) {
      setIsLoading(true);
      let arr = [...scorecardsBackup];
      setScoreCards(
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
      setIsLoading(false);
    }
  };

  const deleteItem = (item) => {
    const newData = scorecards.filter((cards) => cards.id != item.id);
    setScoreCards(newData);
  };

  const cards = ({ item }) => {
    return (
      <EditableCard
        value={item.id}
        key={item.id}
        text={item.name}
        description={item.description}
        deletedItem={() => deleteItem(item)}
      />
    );
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - Indicadores'} onPress={() => props.navigation.goBack()}>
          <TouchableOpacity
            activeOpacity={buttonOpacity}
            onPress={() => fetchData().then(() => setIsLoading(false))}
            style={{ justifyContent: 'center', flex: 1, alignItems: 'flex-end', marginRight: '5%' }}
          >
            <Icon name="reload" size={25} type="material-community" color={colors.text} />
          </TouchableOpacity>
        </Header>
        <SearchArea>
          <Shadow
            {...searchBoxShadow}
            containerViewStyle={{
              height: 55,
              marginTop: 45,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <SearchInput>
              <SearchInputText placeholder="Buscar Indicador" onChangeText={(t) => search(t)} />
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
          </Shadow>
        </SearchArea>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            style={{ marginTop: 32, marginBottom: 25, width: '100%', zIndex: 0 }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={scorecards}
            renderItem={cards}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<EmptyListMessage containerStyle={{ marginTop: '0%' }} />}
          />
        )}
      </Container>
      <AddButton onPress={() => props.navigation.navigate('NewScorecard', deleteItem)} />
    </>
  );
};
