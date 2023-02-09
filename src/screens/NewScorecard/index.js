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

import { DropdownSelection, RegisterButton } from '../../components/common';
import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { ButtonText, IDModalButton, Input, InputArea, InputBox, Title } from './styles';
import { auth, db } from '../../services/firebase.config';
import { colors, shadow } from '../../defaultStyles';
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

  const fetchCriteriasData = async (periodId) => {
    if (periodId != 0) {
      const criteriasQuery = query(
        collection(db, 'diretriz'),
        where('id', '>=', periodId * 10 + 1),
        where('id', '<=', periodId * 10 + 9),
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

      return criteriaArray[periodId].id;
    }
  };

  const fetchScorecardsData = async (criteriaId) => {
    if (criteriaId != 0) {
      const scorecardsQuery = query(
        collection(db, 'scorecards'),
        where('criteriaId', '==', criteriaId),
      );

      const scorecardsSnapshot = await getDocs(scorecardsQuery);

      let scorecardsArray = [];
      scorecardsSnapshot.forEach((doc) => {
        const scorecard = {
          id: +doc.id,
        };

        scorecardsArray.push(scorecard);
      });

      modalNumberHandler(scorecardsArray, criteriaId);
    }
  };

  const addNewScorecard = async () => {
    let noErrors = false;
    const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (periods.value != 0 && data.name.length > 0 && currentUserSnap.exists()) {
      setIsLoading({ loading: true, main: false });
      try {
        await setDoc(doc(db, 'scorecards', data.id.toString()), {
          name: data.name,
          description: data.description,
          criteriaId: criterias.value,
        }).then(() => {
          noErrors = true;
        });
      } catch (err) {
        console.log(err);
      }
    } else if (data.name.length == 0) {
      Alert.alert(
        'Nome em branco!',
        'É necessário preencher o nome do indicador para poder adicioná-lo',
      );
    } else if (periods.value == 0) {
      Alert.alert(
        'Dados incompletos!',
        'Para adicionar um novo indicador é necessário selecionar um período',
      );
    }

    return noErrors;
  };

  const handleSetCriteria = async (data) => {
    setIsLoading({ loading: true, main: true });
    setCriterias(data);
    await fetchScorecardsData(+data.value);
  };

  const handleSetPeriods = async (data) => {
    setIsLoading({ loading: true, main: true });
    setPeriods(data);
    const selectedCriteria = await fetchCriteriasData(+data.value);
    await fetchScorecardsData(+selectedCriteria);
  };

  const handleAddScorecard = async () => {
    await addNewScorecard().then((noErrors) => {
      setIsLoading({ loading: false, main: false });
      if (noErrors) {
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
      }
    });
  };

  const firstFetch = async () => {
    const selectedCriteria = await fetchCriteriasData(+periods.value);
    await fetchScorecardsData(+selectedCriteria);
  };

  useEffect(() => {
    setIsLoading({ loading: true, main: true });
    firstFetch().then(() => setIsLoading({ loading: false, main: false }));
  }, []);

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
                  <InputBox style={{ justifyContent: 'space-evenly', ...shadow }}>
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
                  <InputBox
                    style={{
                      ...shadow,
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
                  <View style={{ width: '100%', height: 55, marginTop: 15 }}>
                    <DropdownSelection
                      data={periods}
                      onSelect={(data) =>
                        handleSetPeriods(data).then(() =>
                          setIsLoading({ loading: false, main: false }),
                        )
                      }
                      disabled={false}
                      zIndex={5}
                      containerStyle={{ width: '100%', position: 'absolute' }}
                      placeholder={periods.value == 0 ? true : false}
                    />
                  </View>
                  <View style={{ width: '100%', height: 55, marginTop: 15 }}>
                    <DropdownSelection
                      data={criterias}
                      onSelect={(data) =>
                        handleSetCriteria(data).then(() =>
                          setIsLoading({ loading: false, main: false }),
                        )
                      }
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
