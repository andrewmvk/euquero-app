import React, { useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Alert, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { DropdownSelection, RegisterButton } from '../../components/common';
import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { Container, Input, InputArea, InputBox, Title } from './styles';
import { db } from '../../services/firebase.config';
import { colors } from '../../defaultStyles';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: '', description: '' });
  const [periods, setPeriods] = useState({
    items: [
      { name: 'Pré-natal', id: 1 },
      { name: 'Pós-natal', id: 2 },
      { name: 'Saúde da Criança', id: 3 },
    ],
    selected: 'Período',
    value: -1,
  });

  const searchBoxShadow = {
    distance: 2,
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
  };

  const addNewScorecard = async () => {
    if (periods.value != -1) {
      setIsLoading(true);
      try {
        const scorecardsQuery = query(
          collection(db, 'scorecards'),
          where('id', '>', periods.value * 100),
          where('id', '<', periods.value * 100 + 100),
        );
        const querySnapshot = await getDocs(scorecardsQuery);

        if (querySnapshot.empty) {
          setNewScorecard(periods.value * 100 + 1);
        } else {
          let highestValue = 0;
          querySnapshot.forEach((doc) => {
            if (doc.data().id > highestValue) {
              highestValue = doc.data().id;
            }
          });
          setNewScorecard(highestValue + 1);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert(
        'Selecione um período',
        'Para adicionar um novo indicardor é nessessário selecionar um período.',
      );
    }
  };

  const setNewScorecard = (id) => {
    setDoc(doc(db, 'scorecards', id.toString()), {
      name: data.name,
      description: data.description,
      id: id,
    });
  };

  const resetInputs = () => {
    setData({ name: '', description: '' });
    setPeriods({
      items: [
        { name: 'Pré-natal', id: 1 },
        { name: 'Pós-natal', id: 2 },
        { name: 'Saúde da Criança', id: 3 },
      ],
      selected: 'Período',
      value: -1,
    });
  };

  return (
    <>
      <DashedCircle />
      <Header text={'Administrativo - Indicadores'} onPress={() => props.navigation.goBack()} />
      <Container>
        <InputArea>
          <Title>Adicionando Indicador</Title>
          <Shadow
            {...searchBoxShadow}
            containerViewStyle={{
              height: 55,
              marginTop: 15,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <InputBox>
              <Input
                placeholder="Nome"
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
              style={{ height: 150, alignItems: 'flex-start', paddingTop: 15, paddingBottom: 15 }}
            >
              <Input
                placeholder="Descrição"
                value={data.description}
                multiline
                onChangeText={(t) => setData({ ...data, description: t })}
              />
            </InputBox>
          </Shadow>
          <DropdownSelection
            data={periods}
            onSelect={setPeriods}
            disabled={false}
            containerStyle={{ marginTop: 15 }}
            placeholder={periods.value == -1 ? true : false}
          />
        </InputArea>
        <View style={{ paddingBottom: 40, width: '100%', alignItems: 'center' }}>
          <RegisterButton
            text="Adicionar"
            pointerEvents={isLoading ? 'none' : 'auto'}
            onPress={() =>
              addNewScorecard().then(() => {
                setIsLoading(false);
                resetInputs();
              })
            }
            isLoading={isLoading}
            containerStyle={{ backgroundColor: periods.value == -1 ? colors.gray : colors.orange }}
          />
        </View>
      </Container>
    </>
  );
};
