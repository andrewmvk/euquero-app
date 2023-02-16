import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase.config';
import * as NavigationBar from 'expo-navigation-bar';
import { ScrollView, ActivityIndicator } from 'react-native';

import { ServiceCard, Map, EmptyListMessage } from '../../components/common';
import Header from '../../components/Header';
import { Container, Period, TextView, UBSName } from './styles';
import { colors } from '../../defaultStyles';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);

  const routeParams = props.route?.params;
  const ubsId = +routeParams.ubsID;

  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync('relative');
      await NavigationBar.setBackgroundColorAsync('#f2f2f2');
      await NavigationBar.setButtonStyleAsync('dark');
    };
    navBarConfig();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const ubsServicesQuery = query(collection(db, 'ubsServices'), where('ubsid', '==', ubsId));
        const ubsServicesSnap = await getDocs(ubsServicesQuery);
        let servicesArray = [];
        const promises = [];

        ubsServicesSnap.forEach(async (item) => {
          promises.push(getDoc(doc(db, 'services', `${item.data().service}`)));
        });

        Promise.all(promises).then(async (docs) => {
          docs.forEach((doc) => {
            if (doc.exists()) {
              const servicesObject = {
                id: doc.data().id,
                name: doc.data().name,
              };
              servicesArray.push(servicesObject);
            }
          });

          setServices(servicesArray);
        });
      } catch (err) {
        console.log('Something went wrong while trying to fetch data');
        console.log(err);
      }
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const headerName = `${routeParams.stateName} - ${routeParams.cityName} - ${routeParams.ubsName}`;

  return (
    <>
      <Header text={headerName} onPress={() => props.navigation.goBack()} />
      <Container>
        <Map routeParams={routeParams} />

        <TextView>
          <Period>Serviços</Period>
          <UBSName numberOfLines={2}>{routeParams.ubsName}</UBSName>
        </TextView>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : services.length > 0 ? (
          <ScrollView
            style={{ paddingTop: 10, marginBottom: 15, width: '100%', zIndex: 0 }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {services.map((item) => {
              return <ServiceCard color={'#fff'} key={item.id} text={item.name} />;
            })}
          </ScrollView>
        ) : (
          <EmptyListMessage text="Nenhum serviço cadastrado para esta UBS." />
        )}
      </Container>
    </>
  );
};
