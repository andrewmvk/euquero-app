import React, { useState, useEffect } from 'react';
import { TextInput, View, ScrollView, Text } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import axios from 'axios';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { BigTitle, colors, RegisterButton } from '../../defaultStyles';
import {
  ButtonView,
  Container,
  InputArea,
  extraStyles,
  MediumTitle,
  BigInputView,
  BigInput,
  SmallInputsArea,
  SmallInputView,
  SmallInput,
} from './styles';

export default (props) => {
  const [ubsName, setUbsName] = useState('');

  const [brazilianStates, setBrazilianStates] = useState([]);
  const [brazilianCities, setBrazilianCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [indicatorGradeInput, setIndicatorGradeInput] = useState('');

  const grades = [
    {
      id: '0',
      value: 'Bronze',
      fillColor: '#BB9152',
      unfillColor: '#DFC29A',
      size: 48,
    },
    {
      id: '1',
      value: 'Silver',
      fillColor: '#85A4C5',
      unfillColor: '#CADCEB',
      size: 48,
    },
    {
      id: '2',
      value: 'Gold',
      fillColor: '#F8B805',
      unfillColor: '#FFE64B',
      size: 48,
    },
    {
      id: '3',
      value: 'Diamond',
      fillColor: '#AB6BFF',
      unfillColor: '#D9D5FD',
      size: 48,
    },
    {
      id: '4',
      value: 'NA',
      fillColor: '#D9D9D9',
      unfillColor: '#ffffff',
      size: 48,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
      );

      let treatedData = [];
      for (i = 0; i < response.data.length; i++) {
        const stateObject = {
          id: response.data[i].id,
          value: response.data[i].nome,
        };
        treatedData.push(stateObject);
      }

      treatedData.sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0));

      setBrazilianStates(treatedData);
    }

    fetchData();
  }, []);

  const onStateSelect = async (state) => {
    setSelectedState(state);
    const stateObject = brazilianStates.find((s) => s.value == state);

    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateObject.id}/municipios`,
    );

    let treatedData = [];
    for (i = 0; i < response.data.length; i++) {
      const cityObject = {
        id: response.data[i].id,
        value: response.data[i].nome,
      };
      treatedData.push(cityObject);
    }

    treatedData.sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0));

    setBrazilianCities(treatedData);
    setSelectedCity(treatedData[0].value);
    console.log(selectedCity);
  };

  const indicatorGrade = () => (
    <>
      <View style={{ marginBottom: 30 }}>
        <View style={{ marginBottom: 5 }}>
          <Text style={extraStyles.indicatorTitle}>Serviço 1 - Indicador 1</Text>
        </View>
        <View style={extraStyles.bodyView}>
          <BouncyCheckboxGroup style={{ alignItems: 'center' }} data={grades} />

          <View style={extraStyles.textInputView}>
            <TextInput
              style={extraStyles.textInput}
              type="text"
              placeholder="Descrição"
              value={indicatorGradeInput}
              onChangeText={setIndicatorGradeInput}
            />
          </View>
        </View>
      </View>
      <View style={extraStyles.dividingLine} />
    </>
  );

  return (
    <>
      <DashedCircle />
      <Container>
        <Header
          text={'Administrativo - UBS - Cadastrar UBS'}
          onPress={() => props.navigation.goBack()}
        />

        <BigTitle text="CADASTRAR UBS" />
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <InputArea>
            <MediumTitle>Localização</MediumTitle>

            {/* UBS Name input */}
            <BigInputView>
              <BigInput
                type="text"
                placeholder="Nome da UBS"
                value={ubsName}
                onChangeText={setUbsName}
              />
            </BigInputView>

            <SelectList //State Selection
              setSelected={onStateSelect}
              data={brazilianStates}
              search={false}
              placeholder="Estado"
              boxStyles={extraStyles.selectionBox}
              dropdownStyles={extraStyles.selectionDropdownBox}
              inputStyles={[
                extraStyles.selectionDropdownText,
                { color: selectedState ? colors.text : '#ababab' },
              ]}
              dropdownTextStyles={extraStyles.selectionDropdownText}
            />

            <View opacity={selectedState ? 1 : 0.7} pointerEvents={selectedState ? 'auto' : 'none'}>
              <SelectList //City Selection
                disabled={selectedState}
                setSelected={setSelectedCity}
                data={brazilianCities}
                search={false}
                placeholder={selectedCity ? selectedCity : 'Cidade'}
                boxStyles={extraStyles.selectionBox}
                dropdownStyles={extraStyles.selectionDropdownBox}
                inputStyles={[
                  extraStyles.selectionDropdownText,
                  { color: selectedCity ? colors.text : '#ababab' },
                ]}
                dropdownTextStyles={extraStyles.selectionDropdownText}
              />
            </View>

            {/* Latitude and Longitude inputs */}
            <SmallInputsArea>
              <SmallInputView>
                <SmallInput
                  keyboardType="numeric"
                  type="number"
                  placeholder="Longitude"
                  value={longitude}
                  onChangeText={setLongitude}
                />
              </SmallInputView>
              <SmallInputView>
                <SmallInput
                  keyboardType="numeric"
                  type="number"
                  placeholder="Latitude"
                  value={latitude}
                  onChangeText={setLatitude}
                />
              </SmallInputView>
            </SmallInputsArea>

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
