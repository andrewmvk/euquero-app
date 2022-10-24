import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

import { Card, EmptyListMessage } from '../../components/common';
import { FlatList, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Header from '../../components/Header';
import { Container, Period, TextView, UBSName } from './styles';
import Pin from '../../../assets/images/map-pin.svg';
import { colors } from '../../defaultStyles';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);

  const routeParams = props.route?.params;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const ubsServicesQuery = query(
        collection(db, 'ubsServices'),
        where('ubsid', '==', +routeParams.ubsID),
      );

      const ubsServicesSnap = await getDocs(ubsServicesQuery);
      let servicesArray = [];
      for (i = 0; i < ubsServicesSnap.docs.length; i++) {
        const service = ubsServicesSnap.docs[i].data();
        let servicesObject = {
          name: service.name,
          id: service.id,
        };
        servicesArray.push(servicesObject);
      }

      setServices(servicesArray);
    };
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const serviceCard = ({ item }) => <Card color={'#fff'} text={item.name} />;
  const headerName = `${routeParams.stateName} - ${routeParams.cityName} - ${routeParams.ubsName}`;

  return (
    <Container>
      <Header text={headerName} onPress={() => props.navigation.goBack()} />
      <MapView
        style={{
          marginTop: 20,
          height: Dimensions.get('window').height * 0.3,
          width: Dimensions.get('window').width,
        }}
        initialRegion={{
          ...routeParams.coordinate,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={routeParams.coordinate} provider={PROVIDER_GOOGLE}>
          <Pin width={31} height={48} />
        </Marker>
      </MapView>

      <TextView>
        <Period>Serviços</Period>
        <UBSName numberOfLines={2}>{routeParams.ubsName}</UBSName>
      </TextView>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          style={{ paddingBottom: 25, width: '100%', zIndex: 0 }}
          contentContainerStyle={{ alignItems: 'center' }}
          data={services}
          renderItem={serviceCard}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <EmptyListMessage
              containerStyle={{ marginTop: '0%', width: '80%', height: '65%' }}
              alterText
            />
          }
        />
      )}
    </Container>
  );
};
