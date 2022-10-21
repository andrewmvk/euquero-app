import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  Space,
} from './styles';
import { Icon } from 'react-native-elements';
import Header from '../../components/Header';

import { buttonOpacity, colors, fonts, fontSizeNoUnits } from '../../defaultStyles';

const periods = [
  { name: 'Pré-Natal', id: 1 },
  { name: 'Pós-Natal', id: 2 },
  { name: 'Saúde da Criança', id: 3 },
];

export default (props) => {
  const routeParams = props.route.params;
  const headerName = `${routeParams.stateName} - ${routeParams.cityName} - ${routeParams.ubsName}`;

  const handlePeriodChoice = (item) => {
    props.navigation.navigate('UBSScorecards', {
      ubsID: routeParams?.ubsID,
      stateName: routeParams?.stateName,
      cityName: routeParams?.cityName,
      ubsName: routeParams?.ubsName,
      periodName: item.name,
      periodID: item.id,
    });
  };

  const cardShadow = {
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
    containerViewStyle: {
      height: 80,
      width: '100%',
      zIndex: 3,
    },
  };

  return (
    <>
      <Container>
        <Header text={headerName} onPress={() => props.navigation.goBack()} />

        <Map />

        <Menu>
          <UBSName numberOfLines={2}>{routeParams.ubsName}</UBSName>
          <View>
            <Shadow {...cardShadow}>
              <PeriodosCard>
                <Text style={styles.cardTitle}>Períodos</Text>
                <Text style={styles.cardText} numberOfLines={1}>
                  Selecione um dos períodos abaixo
                </Text>
              </PeriodosCard>
            </Shadow>

            <Periodos>
              {periods.map((item) => {
                return (
                  <Option
                    key={item.id}
                    onPress={() => handlePeriodChoice(item)}
                    activeOpacity={buttonOpacity}
                  >
                    <OptionText>{item.name}</OptionText>
                    <Icon
                      name="chevron-forward-outline"
                      type="ionicon"
                      color="rgba(127, 127, 127, 0.4)"
                      style={{ marginLeft: 5 }}
                    />
                  </Option>
                );
              })}
            </Periodos>
          </View>
          <Space>
            <View style={styles.line} />
            <Text style={styles.spaceText}>ou</Text>
            <View style={styles.line} />
          </Space>

          <PeriodosCard>
            <Text style={styles.cardTitle} numberOfLines={1}>
              Serviços
            </Text>
            <Text style={styles.cardText}>Veja a lista de serviços disponíveis</Text>
          </PeriodosCard>
        </Menu>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    backgroundColor: '#c4c4c4',
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  spaceText: {
    alignSelf: 'center',
    paddingHorizontal: 5,
    fontSize: 14,
    color: colors.text,
  },
  cardTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeNoUnits.cardText,
    marginLeft: 22,
    marginTop: -5,
    color: colors.text,
    fontFamily: fonts.spartanR,
  },
  cardText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeNoUnits.subtitle,
    marginLeft: 22,
    color: colors.text,
    fontFamily: fonts.spartanL,
  },
});
