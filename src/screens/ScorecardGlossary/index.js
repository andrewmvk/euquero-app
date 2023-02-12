import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as NavigationBar from 'expo-navigation-bar';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';

import { DescriptionBox, DescriptionText, Subtitle, SubtitleContainer, Title } from './styles';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default (props) => {
  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync('relative');
      await NavigationBar.setBackgroundColorAsync('#f2f2f2');
      await NavigationBar.setButtonStyleAsync('dark');
    };
    navBarConfig();
  }, []);

  return (
    <>
      <DashedCircle />
      <Header
        margin={getStatusBarHeight()}
        text={'Histórico'}
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
            style={{
              width: screenWidth * 0.85,
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ minHeight: '7%' }}>
              <Title numberOfLines={1}>Title </Title>
              <SubtitleContainer>
                <Subtitle numberOfLines={1}>Subtitle</Subtitle>
              </SubtitleContainer>
            </View>
            <DescriptionBox style={{ minHeight: '85%' }}>
              <DescriptionText multiline lineHeight={23} textAlignVertical="top">
                Descrição:
              </DescriptionText>
            </DescriptionBox>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
