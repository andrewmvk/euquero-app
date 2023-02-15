import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase.config';
import * as NavigationBar from 'expo-navigation-bar';

import Header from '../../components/Header';
import { colors } from '../../defaultStyles';
import { Container, Period, TextView, UBSName } from './styles';
import ScorecardsCard from '../../components/ScorecardsCard';
import { Map } from '../../components/common';

export default (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const routeParams = props.route.params;
  const headerName = `${routeParams.stateName} - ${routeParams.cityName} - ${routeParams.ubsName}`;
  const ubsID = +routeParams.ubsID;

  const fetchData = async () => {
    let scorecardsList = [];
    let criteriasList = [];
    try {
      const scorecardsQuery = query(
        collection(db, 'ubsScorecards'),
        where('ubsid', '==', ubsID),
        where('scorecard', '>', routeParams.periodID * 100),
        where('scorecard', '<', routeParams.periodID * 100 + 100),
      );
      const scorecardsSnap = await getDocs(scorecardsQuery);

      scorecardsSnap.forEach(async (item) => {
        const scorecardSnap = await getDoc(doc(db, 'scorecards', `${item.data().scorecard}`));
        if (scorecardSnap.exists()) {
          scorecardsList.push({
            id: +item.data().scorecard,
            name: scorecardSnap.data().name,
            description: scorecardSnap.data().description,
            score: +item.data().score,
          });
        }
      });

      const criteriasSnap = await getDocs(collection(db, 'diretriz'));

      criteriasSnap.forEach((doc) => {
        const scorecardsArray = scorecardsList.filter(
          (scorecard) => doc.data().id == Math.floor(scorecard.id / 10),
        );
        if (scorecardsArray.length > 0) {
          criteriasList.push({
            id: doc.data().id,
            name: doc.data().name,
            scorecards: scorecardsArray,
          });
        }
      });

      setData(criteriasList);
    } catch (err) {
      console.log('Something went wrong while trying to fetch data');
      console.log(err);
    }
  };

  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync('relative');
      await NavigationBar.setBackgroundColorAsync('#f2f2f2');
      await NavigationBar.setButtonStyleAsync('dark');
    };
    navBarConfig();
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Container>
        <Header
          margin={getStatusBarHeight()}
          text={headerName}
          onPress={() => props.navigation.goBack()}
        />
        <Map routeParams={routeParams} />
        <TextView>
          <Period>Período</Period>
          <UBSName numberOfLines={2}>{routeParams.ubsName}</UBSName>
        </TextView>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <ScrollView
            style={{ paddingTop: 10, marginBottom: 15, width: '100%', zIndex: 0 }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {data.map((item) => {
              return (
                <ScorecardsCard key={item.id} title={item.name} scorecards={item.scorecards} />
              );
            })}
          </ScrollView>
        )}
      </Container>
    </>
  );
};
