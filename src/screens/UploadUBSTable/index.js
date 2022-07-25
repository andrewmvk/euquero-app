import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors, fonts, RegisterButton } from '../../defaultStyles';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { SimpleText, Title, Container, ButtonView, TouchableText } from './styles';

export default (props) => {
  return (
    <>
      <DashedCircle />
      <Header text={'Administrativo - Upload'} onPress={() => props.navigation.goBack()} />
      <Container>
        <View style={{ marginTop: '25%' }}>
          <Icon
            name="file-excel-outline"
            type="material-community"
            size={120}
            color={colors.orange}
          />
        </View>

        <Title>Adicionar UBS</Title>

        <SimpleText>
          <Text>
            Para adicionar várias UBS's ao mesmo tempo, faça UPLOAD do arquivo .xlsx contendo os
            dados das UBS's e{' '}
          </Text>
          <Text style={{ fontFamily: fonts.spartanBold }}>seguindo a formatação padrão.</Text>
        </SimpleText>

        <ButtonView>
          <RegisterButton text="Fazer Upload" />
        </ButtonView>

        <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' }}>
          <SimpleText>
            <Text>Modelo com a </Text>
            <Text style={{ fontFamily: fonts.spartanBold }}>formatação padrão</Text>
          </SimpleText>

          <TouchableOpacity style={{ marginBottom: 40 }}>
            <TouchableText>Baixe aqui</TouchableText>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};
