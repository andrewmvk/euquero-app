import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

import { Container, TrashIcon } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { AddButton, buttonOpacity, Card, colors } from '../../defaultStyles';

export default (props) => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: 'John',
      email: 'john@example.com',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@example2.com',
    },
  ]);

  const deleteAccount = (id) => {
    const filteredData = accounts.filter((item) => item.id !== id);
    setAccounts(filteredData);
  };

  const stateCard = ({ item }) => {
    return (
      <Card value={item.id} key={item.id} text={item.name} color={colors.orange}>
        <TrashIcon activeOpacity={buttonOpacity} onPress={() => deleteAccount(item.id)}>
          <Icon name="trash-can-outline" size={35} type="material-community" color="#c4c4c4" />
        </TrashIcon>
      </Card>
    );
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - Contas'} onPress={() => props.navigation.goBack()} />
        <FlatList
          style={{ width: '85%', marginTop: 25, marginBottom: 25 }}
          data={accounts}
          renderItem={stateCard}
          keyExtractor={(item) => item.id}
        />
      </Container>
      <AddButton />
    </>
  );
};
