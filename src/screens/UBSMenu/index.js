import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

import {
  Container,
  UBSName,
  Menu,
  PeriodosCard,
  Periodos,
  OptionText,
  Option,
  Space,
} from "./styles";
import { Icon } from "react-native-elements";
import Header from "../../components/Header";
import {
  buttonOpacity,
  colors,
  fonts,
  fontSizeNoUnits,
  shadow,
} from "../../defaultStyles";
import { Map } from "../../components/common";
import { ScrollView } from "react-native";

const periods = [
  { name: "Pré-Natal", id: 1 },
  { name: "Pós-Natal", id: 2 },
  { name: "Saúde da Criança", id: 3 },
];

export default (props) => {
  const routeParams = props.route.params;
  const headerName = `${routeParams.stateName} - ${routeParams.cityName} - ${routeParams.ubsName}`;

  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync("relative");
      await NavigationBar.setBackgroundColorAsync("#f2f2f2");
      await NavigationBar.setButtonStyleAsync("dark");
    };
    navBarConfig();
  }, []);

  const handleNavigate = (item, page) => {
    props.navigation.navigate(page, {
      coordinate: routeParams?.coordinate,
      ubsID: routeParams?.ubsID,
      stateName: routeParams?.stateName,
      cityName: routeParams?.cityName,
      ubsName: routeParams?.ubsName,
      periodName: item ? item.name : null,
      periodID: item ? item.id : null,
    });
  };

  return (
    <>
      <Container>
        <Header text={headerName} onPress={() => props.navigation.goBack()} />

        <Map routeParams={routeParams} />

        <Menu>
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <UBSName numberOfLines={2}>{routeParams.ubsName}</UBSName>
            <PeriodosCard style={shadow}>
              <Text style={styles.cardTitle}>Períodos</Text>
              <Text style={styles.cardText} numberOfLines={1}>
                Selecione um dos períodos abaixo
              </Text>
            </PeriodosCard>

            <Periodos>
              {periods.map((item) => {
                return (
                  <Option
                    key={item.id}
                    onPress={() => handleNavigate(item, "UBSScorecards")}
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
            <Space>
              <View style={styles.line} />
              <Text style={styles.spaceText}> ou </Text>
              <View style={styles.line} />
            </Space>

            <PeriodosCard
              style={shadow}
              onPress={() => handleNavigate(null, "UBSServices")}
            >
              <Text style={styles.cardTitle}>Serviços</Text>
              <Text style={styles.cardText} numberOfLines={1}>
                Veja a lista de serviços disponíveis
              </Text>
            </PeriodosCard>
          </ScrollView>
        </Menu>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    backgroundColor: "#c4c4c4",
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
  spaceText: {
    alignSelf: "center",
    paddingHorizontal: 5,
    fontSize: 14,
    color: colors.text,
  },
  cardTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSizeNoUnits.cardText,
    marginLeft: 22,
    marginTop: -5,
    color: colors.text,
    fontFamily: fonts.spartanR,
  },
  cardText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSizeNoUnits.subtitle,
    marginLeft: 22,
    color: colors.text,
    fontFamily: fonts.spartanL,
  },
});
