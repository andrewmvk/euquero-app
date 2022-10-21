import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { FlatList, ActivityIndicator } from 'react-native';
import { EmptyListMessage } from '../../components/common';

import Header from '../../components/Header';
import Scorecards from '../../components/Scorecards';
import { db } from '../../services/firebase.config';
import { Container, Map, Period, TextView, UBSName } from './styles';
import { colors } from '../../defaultStyles';

const cards = ({ item }) => {
  return <Scorecards item={item} />;
};

export default (props) => {
  const [scorecards, setScorecards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const ubsScorecardQuery = query(
        collection(db, 'ubsScorecards'),
        where('ubsid', '==', props.route.params.ubsID),
      );

      const ubsScorecardSnap = await getDocs(ubsScorecardQuery);
      let scorecardsArray = [];

      const promises = ubsScorecardSnap.docs.map(async (item) => {
        if (item?.data()) {
          const docRef = doc(db, 'scorecards', item.data().scorecard.toString());
          const scorecardData = await getDoc(docRef);

          if (scorecardData?.data()) {
            const scorecard = {
              name: scorecardData.data().name,
              description: scorecardData.data().description,
              score: item.data().score,
              id: item.data().scorecard,
            };

            scorecardsArray.push(scorecard);
          }
        }
      });

      await Promise.all(promises).then(() => {
        setScorecards(scorecardsArray);
      });
    };
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const routeParams = props.route.params;
  const headerName = `${routeParams.stateName} - ${routeParams.cityName} - ${routeParams.ubsName}`;

  return (
    <Container>
      <Header
        text={headerName ? headerName : 'Rota da página'}
        onPress={() => props.navigation.goBack()}
      />
      <Map />

      <TextView>
        <Period>{routeParams?.periodName ? routeParams.periodName : 'Nome do período'}</Period>
        <UBSName numberOfLines={2}>
          {routeParams?.ubsName ? routeParams.ubsName : 'Nome da UBS'}
        </UBSName>
      </TextView>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          style={{ marginBottom: 25, width: '100%', zIndex: 0 }}
          contentContainerStyle={{ alignItems: 'center' }}
          data={scorecards}
          renderItem={cards}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyListMessage containerStyle={{ marginTop: '0%' }} />}
        />
      )}
    </Container>
  );
};
