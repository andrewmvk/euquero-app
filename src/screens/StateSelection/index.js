import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Container, SearchInput, SearchInputText, Card1 } from "./styles";
import Header from "../../components/Header";
import DashedCircle from "../../components/DashedCircle";

import axios from "axios";

export default (props) => {
  const [brazilianStates, setBrazilianStates] = useState([]);

  //api request
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"
      );

      setBrazilianStates(response.data);
    }

    fetchData();
  }, []);

  //render card from flatlist
  const stateCard = ({ item }) => {
    return (
      <Card1
        value={item.id}
        key={item.id}
        activeOpacity={0.7}
        style={{ borderLeftColor: "#c4c4c4", borderLeftWidth: 7 }}
        onPress={() =>
          props.navigation.navigate("CitySelection", {
            stateID: item.id,
            stateName: item.nome,
          })
        }
      >
        <Text
          style={{
            textAlign: "left",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            marginLeft: 22,
            color: "#7F7F7F",
          }}
          key={item.id}
        >
          {item.nome}
        </Text>

        <Text
          style={{
            position: "absolute",
            textAlign: "right",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            bottom: 10,
            right: 22,
            color: "#7F7F7F",
          }}
        >
          00 UBS
        </Text>
      </Card1>
    );
  };

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
        <FlatList
          style={{ width: "85%", marginTop: 25, marginBottom: 25 }}
          data={brazilianStates}
          renderItem={stateCard}
          keyExtractor={(item) => item.id}
        />
      </Container>
    </>
  );
};
