import React, { useState } from 'react';
// import { Icon } from 'react-native-elements';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import { colors } from '../../defaultStyles';
import { Shadow } from 'react-native-shadow-2';
import {
  Container,
  Map,
  UBSName,
  Menu,
  PeriodosCard,
  Periodos,
  OptionText,
  Option,
  OrText,
} from './styles';
import { Icon } from 'react-native-elements';
import { Card, EmptyListMessage } from '../../components/common';
import Header from '../../components/Header';

import services from './services';

export default (props) => {
  const [isLoading, setIsloading] = useState(true);

  return (
    <>
      <Container>
        <Header onPress={() => props.navigation.goBack()} />

        <Map />

        <Menu>
          <UBSName>Nome da Ubs</UBSName>
          <View>
            <PeriodosCard>
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  marginLeft: 22,
                  marginTop: -5,
                  color: '#7F7F7F',
                  fontFamily: 'Spartan_400Regular',
                }}
                numberOfLines={1}
              >
                Períodos
              </Text>
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  marginLeft: 22,
                  color: '#7F7F7F',
                  fontFamily: 'Spartan_300Light',
                }}
              >
                Selecione um dos períodos abaixo
              </Text>
            </PeriodosCard>

            <Periodos>
              <Option>
                <OptionText>Pré-natal</OptionText>
                <Icon
                  name='chevron-forward-outline'
                  type='ionicon'
                  color='rgba(127, 127, 127, 0.4)'
                  style={{ marginLeft: 5 }}
                />
              </Option>

              <Option>
                <OptionText>Pós-natal</OptionText>
                <Icon
                  name='chevron-forward-outline'
                  type='ionicon'
                  color='rgba(127, 127, 127, 0.4)'
                  style={{ marginLeft: 5 }}
                />
              </Option>

              <Option>
                <OptionText>Saúde da criança</OptionText>
                <Icon
                  name='chevron-forward-outline'
                  type='ionicon'
                  color='rgba(127, 127, 127, 0.4)'
                  style={{ marginLeft: 5 }}
                />
              </Option>
            </Periodos>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '20%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <View
              style={{
                backgroundColor: '#c4c4c4',
                height: 2,
                flex: 1,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                paddingHorizontal: 5,
                fontSize: 14,
                color: '#7f7f7f',
              }}
            >
              ou
            </Text>
            <View
              style={{
                backgroundColor: '#c4c4c4',
                height: 2,
                flex: 1,
                alignSelf: 'center',
              }}
            />
          </View>

          <PeriodosCard>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                marginLeft: 22,
                marginTop: -5,
                color: '#7F7F7F',
                fontFamily: 'Spartan_400Regular',
              }}
              numberOfLines={1}
            >
              Serviços
            </Text>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                marginLeft: 22,
                color: '#7F7F7F',
                fontFamily: 'Spartan_300Light',
              }}
            >
              Veja a lista de serviços disponíveis
            </Text>
          </PeriodosCard>
        </Menu>
      </Container>
    </>
  );
};
