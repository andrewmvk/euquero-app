import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { FlatList, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

import { colors } from '../../defaultStyles';
import {
  Container,
  SearchInput,
  SearchInputText,
  SearchArea,
  NoResults,
  Title,
  SimpleText,
} from './styles';
import { Card } from '../../defaultStyles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';

export default (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ubs, setUbs] = useState('');
  const [ubsBackup, setUbsBackup] = useState(ubs);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let list = [];
      try {
        const ubsQuerySnapshot = await getDocs(collection(db, 'ubs'));

        ubsQuerySnapshot.forEach((ubs) => {
          if (ubs.data().uf === props.route.params.stateID) {
            list.push({ id: ubs.id, ...ubs.data() });
          }
        });
        setUbs(list);
        setUbsBackup(list);
      } catch (err) {
        console.log('Something went wrong while trying to fetch data');
        console.log(err);
      }
    };

    fetchData().then(() => setIsLoading(false));
  }, []);

  const search = (t) => {
    setIsLoading(false);
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
  };

  const handleCardPress = (item) => {
    props.navigation.navigate('ServiceSelection', {
      ubsID: item.id,
      stateID: props.route.params.stateID,
      stateName: props.route.params.stateName,
      cityName: props.route.params.cityName,
      ubsName: item.name,
    });
  };

  const ubsCard = ({ item }) => {
    return (
      <Card
        value={item.id}
        key={item.id}
        onPress={() => handleCardPress(item)}
        text={item.name}
        color={colors.orange}
      />
    );
  };

  const EmptyListMessage = () => {
    return (
      <NoResults>
        <View>
          <Image
            source={require('../../../assets/images/noResultsImg.png')}
            style={{ resizeMode: 'contain', height: 200 }}
          />
        </View>
        <Title>NADA POR AQUI!</Title>
        <SimpleText>Não encontramos nenhum item correspondente à sua pesquisa.</SimpleText>
      </NoResults>
    );
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
            <SearchInputText
              placeholder="Buscar UBS"
              onChangeText={(t) => search(t).then(() => setIsLoading(false))}
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
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            style={{
              width: '100%',
              marginTop: 25,
              marginBottom: 0,
              paddingTop: 5,
            }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={ubs}
            renderItem={ubsCard}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={EmptyListMessage}
          />
        )}
      </Container>
    </>
  );
};
