import React, { useState } from "react";

import { TextInput, View, ScrollView, Text, Button, Image } from "react-native";
import DashedCircle from "../../components/DashedCircle";
import Header from "../../components/Header";
import { BigTitle, InputBox, RegisterButton } from "../../defaultStyles";
import { ButtonView, Container, InputArea, MediumTitle } from "./styles";
import { colors, fonts } from "../../defaultStyles";
import SelectList from "react-native-dropdown-select-list";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import { Icon } from "react-native-elements";

export default (props) => {
  const [ubsName, setUbsName] = useState("");
  const [brazilianState, setBrazilianState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selected, setSelected] = useState("");
  const [indicatorGradeInput, setIndicatorGradeInput] = useState("");

  const data = [
    { id: "0", value: "Goiás" },
    { id: "1", value: "Maranhão" },
    { id: "2", value: "Rio Grande do Norte" },
    { id: "3", value: "Goiás" },
    { id: "4", value: "Maranhão" },
    { id: "5", value: "Rio Grande do Norte" },
    { id: "6", value: "Goiás" },
    { id: "7", value: "Maranhão" },
    { id: "8", value: "Rio Grande do Norte" },
  ];

  const grades = [
    {
      id: "0",
      value: "Bronze",
      fillColor: "#BB9152",
      unfillColor: "#DFC29A",
      size: 48,
    },
    {
      id: "1",
      value: "Silver",
      fillColor: "#85A4C5",
      unfillColor: "#CADCEB",
      size: 48,
    },
    {
      id: "2",
      value: "Gold",
      fillColor: "#F8B805",
      unfillColor: "#FFE64B",
      size: 48,
    },
    {
      id: "3",
      value: "Diamond",
      fillColor: "#AB6BFF",
      unfillColor: "#D9D5FD",
      size: 48,
    },
    {
      id: "4",
      value: "NA",
      fillColor: "#D9D9D9",
      unfillColor: "#ffffff",
      size: 48,
    },
  ];

  const indicatorGrade = () => (
    <>
      <View style={{ marginBottom: 30 }}>
        <View style={{}}>
          <Text style={{ color: "#7F7F7F", fontSize: 16, fontWeight: "300" }}>
            Serviço 1 - Indicador 1
          </Text>
        </View>
        <View
          style={{
            marginTop: 12,
            justifyContent: "center",
          }}
        >
          <BouncyCheckboxGroup style={{ alignItems: "center" }} data={grades} />

          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 5,
              marginTop: 16,
            }}
          >
            <TextInput
              style={{
                height: 50,
                fontSize: 16,
                fontFamily: fonts.spartanR,
                color: colors.text,
                paddingHorizontal: 20,
              }}
              type="text"
              placeholder="Descrição"
              value={indicatorGradeInput}
              onChangeText={setIndicatorGradeInput}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: "20%",
          height: 1,
          backgroundColor: "#c4c4c4",
          alignContent: "center",
          marginBottom: 20,
        }}
      ></View>
    </>
  );

  return (
    <>
      <DashedCircle />
      <Container>
        <Header
          text={"Administrativo - UBS - Cadastrar UBS"}
          numberOfLines={1}
          onPress={() => props.navigation.goBack()}
        />

        <BigTitle text="CADASTRAR UBS" />
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <InputArea>
            <MediumTitle>Localização</MediumTitle>

            <View //UBS Name input
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 5,
                marginTop: 5,
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  fontSize: 16,
                  fontFamily: fonts.spartanR,
                  color: colors.text,
                  paddingHorizontal: 20,
                }}
                type="text"
                placeholder="Nome da UBS"
                value={ubsName}
                onChangeText={setUbsName}
              />
            </View>

            <SelectList //State Selection
              onSelect={() => alert(selected)}
              setSelected={setSelected}
              data={data}
              search={false}
              placeholder="Estado"
              boxStyles={{
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: "white",
                marginTop: 25,
              }}
              dropdownStyles={{
                marginTop: -5,
                borderRadius: 0,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderWidth: 0,
                backgroundColor: "white",
                marginBottom: 20,
              }}
              inputStyles={{
                color: "#ababab",
                fontSize: 16,
                fontFamily: fonts.spartanR,
              }}
              dropdownTextStyles={{
                color: "#ababab",
                fontSize: 16,
                fontFamily: fonts.spartanL,
              }}
            />

            <SelectList //City Selection
              onSelect={() => alert(selected)}
              setSelected={setSelected}
              data={data}
              search={false}
              placeholder="Cidade"
              boxStyles={{
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: "white",
                marginTop: 25,
              }}
              dropdownStyles={{
                marginTop: -5,
                borderRadius: 0,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderWidth: 0,
                backgroundColor: "white",
              }}
              inputStyles={{
                color: "#ababab",
                fontSize: 16,
                fontFamily: fonts.spartanR,
              }}
              dropdownTextStyles={{
                color: "#ababab",
                fontSize: 16,
                fontFamily: fonts.spartanL,
              }}
            />

            <View //Latitude and Longitude inputs
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  height: 50,
                  width: "48%",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  marginTop: 25,
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: fonts.spartanR,
                    color: colors.text,
                    paddingHorizontal: 20,
                  }}
                  type="number"
                  placeholder="Longitude"
                  value={longitude}
                  onChangeText={setLongitude}
                />
              </View>
              <View
                style={{
                  height: 50,
                  width: "48%",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  marginTop: 25,
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: fonts.spartanR,
                    color: colors.text,
                    paddingHorizontal: 20,
                  }}
                  type="number"
                  placeholder="Latitude"
                  value={latitude}
                  onChangeText={setLatitude}
                />
              </View>
            </View>

            <MediumTitle>Notas</MediumTitle>

            <View>{indicatorGrade()}</View>
            <View>{indicatorGrade()}</View>
            <View>{indicatorGrade()}</View>
            <View>{indicatorGrade()}</View>
            <View>{indicatorGrade()}</View>
          </InputArea>
          <ButtonView>
            <RegisterButton text="CADASTRAR" />
          </ButtonView>
        </ScrollView>
      </Container>
    </>
  );
};
