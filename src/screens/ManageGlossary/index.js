import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Dimensions, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase.config';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { colors } from '../../defaultStyles';
import {
  ButtonView,
  DescriptionBox,
  DescriptionText,
  Subtitle,
  SubtitleContainer,
  Title,
} from './styles';
import { RegisterButton } from '../../components/common';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(props.route.params.data);

  const updateScorecard = async () => {
    let noErrors = false;
    const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (data.name.length > 0 && currentUserSnap.exists()) {
      setIsLoading(true);
      try {
        await setDoc(doc(db, 'scorecards', data.id.toString()), {
          name: data.name,
          description: data.description,
          criteriaId: +data.criteriaId,
        }).then(() => {
          noErrors = true;
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert(
        'Nome em branco!',
        'É necessário preencher o nome do indicador para poder atualizá-lo',
      );
    }
    return noErrors;
  };

  const handleUpdateScorecard = async () => {
    await updateScorecard().then((noErrors) => {
      setIsLoading(false);

      if (noErrors) {
        props.navigation.goBack();
        Alert.alert(
          'Operação realizada com sucesso!',
          'O indicador (' +
            data.id +
            ") - '" +
            data.name +
            "' da diretriz (" +
            data.criteriaId +
            ") - '" +
            data.criteriaName +
            "' foi atualizado com sucesso!",
        );
      }
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
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
            height: screenHeight * 0.84,
          }}
        >
          <View
            style={{ width: screenWidth * 0.85, height: '100%', justifyContent: 'space-between' }}
          >
            <View style={{ minHeight: '7%' }}>
              <Title numberOfLines={1}>{data.criteriaName}</Title>
              <SubtitleContainer>
                <Subtitle onChangeText={(t) => setData({ ...data, name: t })} numberOfLines={1}>
                  {data.name}
                </Subtitle>
                <Icon
                  name={'pencil-outline'}
                  size={30}
                  type="material-community"
                  color={colors.text}
                />
              </SubtitleContainer>
            </View>
            <DescriptionBox style={{ minHeight: '70%' }}>
              <DescriptionText
                onChangeText={(t) => setData({ ...data, description: t })}
                multiline
                lineHeight={23}
                textAlignVertical="top"
              >
                {data.description}
              </DescriptionText>
            </DescriptionBox>
            <ButtonView style={{ minHeight: '7.5%' }}>
              <RegisterButton
                text="Atualizar"
                pointerEvents={isLoading ? 'none' : 'auto'}
                onPress={handleUpdateScorecard}
                isLoading={isLoading}
                containerStyle={{
                  position: 'absolute',
                  backgroundColor: data.name.length > 0 ? colors.orange : colors.gray,
                }}
              />
            </ButtonView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
