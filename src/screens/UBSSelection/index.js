import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import {
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../defaultStyles";
import {
  Container,
  SearchInput,
  SearchInputText,
  SearchArea,
  NoResults,
  Title,
  SimpleText,
} from "./styles";
import { Card } from "../../defaultStyles";
import Header from "../../components/Header";
import DashedCircle from "../../components/DashedCircle";

import ubs from "./ubsList";

export default (props) => {
  const [isLoading, setIsloading] = useState(true);
  const [searchUbs, setUbs] = useState("");
  const [list, setList] = useState(ubs);

  const ubsCard = ({ item }) => {
    return <Card value={item.id} key={item.id} text={item.nome} />;
  };

  useEffect(() => {
    if (searchUbs === "") {
      setList(ubs);
    } else {
      setList(
        ubs.filter((d) =>
          d.nome
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
              searchUbs
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            )
        )
      );
    }
  }, [searchUbs]);

  const EmptyListMessage = () => {
    return (
      <NoResults>
        <View>
          <Image source={require("../../../assets/images/noResultsImg.png")} />
        </View>
        <Title>NADA POR AQUI!</Title>
        <SimpleText>
          Não encontramos nenhum item correspondente à sua pesquisa.
        </SimpleText>
      </NoResults>
    );
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header
          text={`${props.route.params.stateName} - ${props.route.params.cityName}`}
          onPress={() => props.navigation.goBack()}
        />
        <SearchArea>
          <SearchInput>
            <SearchInputText
              placeholder="Buscar UBS"
              onChangeText={(t) => setUbs(t)}
            />
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
          <TouchableOpacity>
            <Icon
              name="order-alphabetical-ascending"
              type="material-community"
              color={colors.gray}
              size={32}
              style={{ marginTop: 25, marginLeft: 25 }}
            />
          </TouchableOpacity>
        </SearchArea>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#FF6B0F"
            style={{ marginTop: 50 }}
          />
        ) : (
          <FlatList
            style={{ width: "85%", marginTop: 25, marginBottom: 25 }}
            data={list}
            renderItem={ubsCard}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={EmptyListMessage}
          />
        )}
      </Container>
    </>
  );
};
