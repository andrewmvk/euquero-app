import React from "react";
import { Icon } from "react-native-elements";
import { View, TextInput, ScrollView } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Container, SearchInput, SearchInputText } from "./styles";
import Header from "../../components/Header";
import DashedCircle from "../../components/DashedCircle";
import Card1 from "../../components/Card1";
import { buttonOpacity } from "../../defaultStyles";

export default (props) => {
  return (
    <>
      <DashedCircle />
      <Container>
        <Header onPress={() => props.navigation.goBack()} />

        <SearchInput>
          <SearchInputText placeholder="Buscar estado" />
          <Icon
            name="search-outline"
            type="ionicon"
            color="#c4c4c4"
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          />
        </SearchInput>

        <ScrollView
          style={{
            marginTop: 30,
            height: 100,
            width: "85%",
          }}
        >
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
        </ScrollView>
      </Container>
    </>
  );
};
