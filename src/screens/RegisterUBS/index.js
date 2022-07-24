import React, { useState } from "react";

import { TextInput, View, ScrollView } from "react-native";
import DashedCircle from "../../components/DashedCircle";
import Header from "../../components/Header";
import { BigTitle, InputBox, RegisterButton } from "../../defaultStyles";
import { ButtonView, Container, InputArea, MediumTitle } from "./styles";
import { Picker } from "@react-native-picker/picker";
import { colors, fonts } from "../../defaultStyles";
import SelectList from "react-native-dropdown-select-list";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Icon } from "react-native-elements";

export default (props) => {
  const [ubsName, setUbsName] = useState("");
  const [brazilianState, setBrazilianState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selected, setSelected] = React.useState("");

  const data = [
    { id: "2", value: "Goiás" },
    { id: "3", value: "Maranhão" },
    { id: "4", value: "Rio Grande do Norte" },
    { id: "2", value: "Goiás" },
    { id: "3", value: "Maranhão" },
    { id: "4", value: "Rio Grande do Norte" },
    { id: "2", value: "Goiás" },
    { id: "3", value: "Maranhão" },
    { id: "4", value: "Rio Grande do Norte" },
  ];
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

            <View //UBS Name input
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 5,
                marginTop: 5,
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
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  height: 50,
                  width: "48%",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  marginTop: 25,
                  marginBottom: 20,
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
            <BouncyCheckbox
              size={25}
              fillColor="red"
              unfillColor="#FFFFFF"
              text="Custom Checkbox"
              iconStyle={{ borderColor: "red" }}
              onPress={(isChecked: boolean) => {}}
            />
          </InputArea>
        </ScrollView>
      </Container>
    </>
  );
};
