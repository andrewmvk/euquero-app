import React, { useEffect } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';

import { DescriptionBox, DescriptionText, Subtitle, SubtitleContainer, Title } from './styles';
import { navBarConfig, shadow } from '../../defaultStyles';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default (props) => {
  const routeParams = props.route.params;

  useEffect(() => {
    navBarConfig('relative', '#f2f2f2');
  }, []);

  return (
    <>
      <DashedCircle />
        <View
          style={{
            height: screenHeight,
            alignItems: 'center'
          }}
        >
          <SafeAreaView>
            <Header text={routeParams.headerName} onPress={() => props.navigation.goBack()} />
          </SafeAreaView>
          <View
            style={{
              width: screenWidth * 0.85,
              justifyContent: 'space-between',
              height: screenHeight * 0.55,
              marginTop: 20
            }}
          >
            <View style={{ minHeight: '7%' }}>
              <Title numberOfLines={2}>{routeParams.criteriaName}</Title>
              <SubtitleContainer>
                <Subtitle numberOfLines={1}>{routeParams.scorecard.name}</Subtitle>
              </SubtitleContainer>
            </View>
            <DescriptionBox style={{ minHeight: '65%', ...shadow }}>
              <DescriptionText multiline lineHeight={23} textAlignVertical="top">
                {routeParams.scorecard.description}
              </DescriptionText>
            </DescriptionBox>
          </View>
        </View>
    </>
  );
};
