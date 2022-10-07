import React, { useState } from 'react';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { DropdownSelection, RegisterButton } from '../../components/common';
import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { Container, Input, InputArea, InputBox, Title } from './styles';

export default (props) => {
  const [isLoading, setIsloading] = useState(false);
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
              <Input placeholder="Nome" />
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
            <InputBox style={{ height: 150, alignItems: 'flex-start', paddingTop: 15 }}>
              <Input placeholder="Descrição" />
            </InputBox>
          </Shadow>
          <DropdownSelection
            data={periods}
            onSelect={setPeriods}
            disabled={false}
            containerStyle={{ marginTop: 15 }}
            placeholder
          />
        </InputArea>
        <View style={{ paddingBottom: 40, width: '100%', alignItems: 'center' }}>
          <RegisterButton text="Adicionar" pointerEvents={isLoading ? 'none' : 'auto'} />
        </View>
      </Container>
    </>
  );
};
