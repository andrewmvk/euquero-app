import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import {
  Alert,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { DropdownSelection, RegisterButton } from '../../components/common';
import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { ButtonText, IDModalButton, Input, InputArea, InputBox, Title } from './styles';
import { auth, db } from '../../services/firebase.config';
import { colors } from '../../defaultStyles';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NumberSelectionModal from '../../components/NumberSelectionModal';

export default (props) => {
  const [isLoading, setIsLoading] = useState({ loading: true, main: true });
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({ id: 'ID', name: '', description: '' });
  const [criterias, setCriterias] = useState({ items: [], selected: 'Diretriz', value: 0 });
  const [modalNumbers, setModalNumbers] = useState([]);
  const [periods, setPeriods] = useState({
    items: [
      { name: 'Pré-natal', id: 1 },
      { name: 'Pós-natal', id: 2 },
      { name: 'Saúde da Criança', id: 3 },
    ],
    selected: props.route.params.period.name,
    value: props.route.params.period.id,
  });

  const modalNumberHandler = (scorecards, criteriaId) => {
    const possibleId = criteriaId * 10 + 1;

    let newArray = [];
    for (i = possibleId; i < possibleId + 9; i++) {
      if (scorecards.find((n) => n.id === i)) {
        newArray.push({ number: i, isValide: false });
      } else {
        newArray.push({ number: i, isValide: true });
      }
    }

    const firstValideNumberObject = newArray.find((n) => n.isValide === true);

    setData({ ...data, id: firstValideNumberObject.number });
    setModalNumbers(newArray);
  };

  const fetchCriteriasData = async () => {
    if (periods.value != 0) {
      const criteriasQuery = query(
        collection(db, 'diretriz'),
        where('id', '>=', periods.value * 10 + 1),
        where('id', '<=', periods.value * 10 + 9),
      );

      const criteriasSnapshot = await getDocs(criteriasQuery);

      let criteriaArray = [];
      criteriasSnapshot.forEach((doc) => {
        const criteria = {
          id: doc.data().id,
          name: doc.data().name,
        };

        criteriaArray.push(criteria);
      });

      setCriterias({
        items: criteriaArray,
        selected: criteriaArray[0].name,
        value: criteriaArray[0].id,
      });
    }
  };

  const fetchScorecardsData = async () => {
    if (criterias.value != 0) {
      const scorecardsQuery = query(
        collection(db, 'scorecards'),
        where('criteriaId', '==', criterias.value),
      );

      const scorecardsSnapshot = await getDocs(scorecardsQuery);

      let scorecardsArray = [];
      scorecardsSnapshot.forEach((doc) => {
        const scorecard = {
          id: +doc.id,
        };

        scorecardsArray.push(scorecard);
      });

      modalNumberHandler(scorecardsArray, criterias.value);
    }
  };

  useEffect(() => {
    setIsLoading({ loading: true, main: true });
    fetchCriteriasData().then(() => {
      fetchScorecardsData();
    });
  }, [periods.value, criterias.value]);

  useEffect(() => {
    if (data.id !== 'ID') {
      setIsLoading({ loading: false, main: false });
    }
  }, [data.id]);

  const searchBoxShadow = {
    distance: 2,
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
  };

  const addNewScorecard = async () => {
    //const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (periods.value != 0 && criterias.value !== 'ID' && data.name.length > 0) {
      setIsLoading({ loading: true, main: false });
      try {
        setDoc(doc(db, 'scorecards', data.id.toString()), {
          name: data.name,
          description: data.description,
          criteriaId: criterias.value,
        });
      } catch (err) {
        console.log(err);
      }
    } else if (data.name.length == 0) {
      Alert.alert(
        'Nome em branco!',
        'É necessário preencher o nome do indicador para poder adicioná-lo',
      );
    } else {
      Alert.alert(
        'Dados incompletos!',
        'Para adicionar um novo indicador é nessessário selecionar um período',
      );
    }
  };

  const handleAddScorecard = () => {
    addNewScorecard().then(() => {
      setIsLoading({ loading: false, main: false });
      const selectedCriteria = criterias.items.find((e) => e.id === criterias.value);

      props.navigation.goBack();
      Alert.alert(
        'Operação realizada com sucesso!',
        'O indicador (' +
          data.id +
          ") - '" +
          data.name +
          "' foi adicionado com sucesso a diretriz (" +
          selectedCriteria.id +
          ") - '" +
          selectedCriteria.name +
          "'",
      );
    });
  };

  return (
    <>
      <DashedCircle />
      <Header
        margin={getStatusBarHeight()}
        text={'Administrativo - Indicadores'}
        onPress={() => props.navigation.goBack()}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, height: '100%' }}>
          <ScrollView style={{ height: '90%' }} contentContainerStyle={{ alignItems: 'center' }}>
            <InputArea>
              <Title>Adicionando Indicador</Title>

              {isLoading.loading && isLoading.main ? (
                <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
              ) : (
                <>
                  <Shadow
                    {...searchBoxShadow}
                    containerViewStyle={{
                      height: 55,
                      marginTop: 15,
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <InputBox style={{ justifyContent: 'space-evenly' }}>
                      <IDModalButton onPress={() => setModalVisible(true)}>
                        <ButtonText>{data.id}</ButtonText>
                      </IDModalButton>
                      <Input
                        style={{ width: '85%' }}
                        placeholder="Nome"
                        placeholderTextColor="#C4C4C4"
                        numberOfLines={1}
                        value={data.name}
                        onChangeText={(t) => setData({ ...data, name: t })}
                      />
                    </InputBox>
                  </Shadow>
                  <Shadow
                    {...searchBoxShadow}
                    containerViewStyle={{
                      height: 150,
                      marginTop: 15,
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <InputBox
                      style={{
                        height: 150,
                        alignItems: 'flex-start',
                        paddingTop: 15,
                        paddingBottom: 15,
                      }}
                    >
                      <Input
                        enablesReturnKeyAutomatically
                        placeholder="Descrição"
                        placeholderTextColor="#C4C4C4"
                        value={data.description}
                        multiline
                        onChangeText={(t) => setData({ ...data, description: t })}
                      />
                    </InputBox>
                  </Shadow>
                  <View style={{ width: '100%', height: 55, marginTop: 15 }}>
                    <DropdownSelection
                      data={periods}
                      onSelect={setPeriods}
                      disabled={false}
                      zIndex={5}
                      containerStyle={{ width: '100%', position: 'absolute' }}
                      placeholder={periods.value == 0 ? true : false}
                    />
                  </View>
                  <View style={{ width: '100%', height: 55, marginTop: 15 }}>
                    <DropdownSelection
                      data={criterias}
                      onSelect={setCriterias}
                      disabled={periods.value == 0 ? true : false}
                      zIndex={3}
                      containerStyle={{ width: '100%', position: 'absolute' }}
                      placeholder={criterias.value == 0 ? true : false}
                    />
                  </View>
                </>
              )}
            </InputArea>
            <View style={{ zIndex: -1, height: 200 }} />
          </ScrollView>
          <View
            style={{
              height: '10%',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15,
            }}
          >
            <RegisterButton
              text="Adicionar"
              pointerEvents={isLoading.loading ? 'none' : 'auto'}
              disabled={
                isLoading.loading || criterias.value == 0 || isNaN(data.id) || data.name.length == 0
                  ? true
                  : false
              }
              onPress={handleAddScorecard}
              isLoading={isLoading.loading && !isLoading.main ? true : false}
              containerStyle={{
                position: 'absolute',
                backgroundColor:
                  criterias.value != 0 && data.name.length != 0 ? colors.orange : colors.gray,
              }}
            />
          </View>
          <NumberSelectionModal
            isVisible={isModalVisible}
            setVisibility={setModalVisible}
            setSelected={(id) => {
              setData({ ...data, id: id });
            }}
            numbers={modalNumbers}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
