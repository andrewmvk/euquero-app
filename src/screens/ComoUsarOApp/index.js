import { BackgroundImage } from "@rneui/base";
import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import {
  Container,
  Header,
  ManageTouchableBox,
  ManageBoxShadow,
  HeaderText,
  ManageText,
} from "./styles";

import { TouchableArrow, buttonOpacity } from "../../defaultStyles";

import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: 1,
    image: require("../../../assets/images/passo.png"),
    title: "PASSO 1",
    text: "Para encontrar a UBS, clique no botão “Buscar UBS” da tela inicial;",
  },
  {
    key: 2,
    image: require("../../../assets/images/passo.png"),
    title: "PASSO 2",
    text: "Selecione o Estado ao qual sua Cidade pertence;",
  },
  {
    key: 3,
    image: require("../../../assets/images/passo.png"),
    title: "PASSO 3",
    text: "Selecione a Cidade para encontrar uma UBS;",
  },
];

export default (props) => {
  function renderSlides({ item }) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Image
            source={item.image}
            style={{
              resizeMode: "contain",
              height: "60%",
              width: "100%",
              marginTop: 60,
            }}
          />
          <View
            style={{
              height: "40%",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#FF6B0F",
                paddingTop: 35,
                paddingBottom: 30,
                fontSize: 23,

                fontFamily: "Spartan_700Bold",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#7F7F7F",
                paddingHorizontal: 25,
                fontSize: 16,
                width: "80%",
                alignSelf: "center",
                fontFamily: "Spartan_400Regular",
              }}
            >
              {item.text}
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Header>
        <TouchableArrow
          activeOpacity={buttonOpacity}
          onPress={() => props.navigation.goBack()}
        />
      </Header>

      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={{
          backgroundColor: "#FF6B0F",
          width: 30,
        }}
      />
    </>
  );
};
