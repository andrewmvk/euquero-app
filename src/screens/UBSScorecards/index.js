import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, View, Dimensions } from "react-native";
import Header from "../../components/Header";
import * as NavigationBar from "expo-navigation-bar";
import {
  buttonOpacity,
  colors,
  fonts,
  fontSizeNoUnits,
  shadow,
} from "../../defaultStyles";
import { Container, Period, TextView, UBSName } from "./styles";

import ScorecardsCard from "../../components/ScorecardsCard";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default (props) => {
  const teste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync("relative");
      await NavigationBar.setBackgroundColorAsync("#f2f2f2");
      await NavigationBar.setButtonStyleAsync("dark");
    };
    navBarConfig();
  }, []);

  //const routeParams = props.route.params;
  //const headerName = `${routeParams.stateName} - ${routeParams.cityName} - ${routeParams.ubsName}`;
  return (
    <>
      <Container>
        <Header
          margin={getStatusBarHeight()}
          text={"Histórico"}
          onPress={() => props.navigation.goBack()}
        />
        <View
          style={{
            marginTop: 20,
            height: Dimensions.get("window").height * 0.3,
            width: Dimensions.get("window").width,
            backgroundColor: "gray",
          }}
        ></View>
        <TextView>
          <Period>Período</Period>
          <UBSName numberOfLines={2}>routeParams.ubsName</UBSName>
        </TextView>
        <ScrollView
          style={{ marginTop: 10, marginBottom: 25, width: "100%", zIndex: 0 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {teste.map((item) => {
            return <ScorecardsCard key={item} text={item} />;
          })}
        </ScrollView>
      </Container>
    </>
  );
};
