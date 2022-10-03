import React, { useState } from 'react';
// import { Icon } from 'react-native-elements';
import { FlatList, View, Text } from 'react-native';
// import { colors } from '../../defaultStyles';
import { Container, Map, UBSName } from './styles';
import { Card, EmptyListMessage } from '../../components/common';
import Header from '../../components/Header';

import services from './services';

export default (props) => {
  const [isLoading, setIsloading] = useState(true);

  return (
    <>
      <Container>
        <Map />
        <Text>Nome da Ubs</Text>
      </Container>
    </>
  );
};
