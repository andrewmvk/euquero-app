import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import * as defaultS from '../../defaultStyles';
import { StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const Title = styled.Text`
  text-align: center;
  color: ${defaultS.colors.orange};
  font-size: ${defaultS.fontSize.bigTitle};
  font-family: ${defaultS.fonts.spartanBold};
`;

export const PhaseText = styled.Text`
  text-align: center;
  color: ${defaultS.colors.text};
  font-size: 15px;
  width: 90%;
  font-family: ${defaultS.fonts.spartanR};
  line-height: 25px;
`;

export const DotsView = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const extraStyles = StyleSheet.create({
  containerOut: {
    marginTop: 20,
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  tutorialImage: {
    flex: 0.4,
    resizeMode: 'contain',
    width: '100%',
  },
  containerIn: {
    flex: 0.5,
    width: '80%',
    marginTop: 10,
  },
});
