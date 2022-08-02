import React, { useEffect, useState } from 'react';
// import { Icon } from 'react-native-elements';
import { FlatList, View } from 'react-native';
// import { colors } from '../../defaultStyles';
import { Container, Map, UBSName } from './styles';
import { Card } from '../../defaultStyles';
import Header from '../../components/Header';

import services from './services';

export default props => {
  const [isLoading, setIsloading] = useState(true);

  const serviceCard = ({ item }) => {
    return <Card value={item.id} key={item.id} text={item.nome} />;
  };

  return (
    <>
      <Container>
        <Header
          text={`${props.route.params.stateName} - ${props.route.params.cityName} - ${props.route.params.ubsName}`}
          onPress={() => props.navigation.goBack()}
        />
        <Map />
        <View style={{ width: '85%', justifyContent: 'left' }}>
          <UBSName>{`${props.route.params.ubsName}`}</UBSName>
        </View>
        <FlatList
          style={{ width: '85%', marginTop: 25, marginBottom: 25 }}
          data={services}
          renderItem={serviceCard}
          keyExtractor={item => item.id}
        />
      </Container>
    </>
  );
};
