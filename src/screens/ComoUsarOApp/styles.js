import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';

import * as defaultS from '../../defaultStyles';

const { width } = Dimensions.get('window');

export const Title = styled.Text`
  text-align: center;
  margin-top: 15px;
  color: ${defaultS.colors.orange};
  font-size: ${defaultS.fontSize.bigTitle};
  font-family: ${defaultS.fonts.spartanBold};
`;

export const PhaseText = styled.Text`
  text-align: center;
  color: ${defaultS.colors.text};
  width: 80%;
  font-size: 15px;
  font-family: ${defaultS.fonts.spartanR};
  line-height: 30px;
`;

export const DotsView = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DesactivatedDot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: ${defaultS.colors.gray};
`;

export const extraStyles = StyleSheet.create({
  containerOut: {
    marginTop: 20,
    flex: 0.85,
    alignItems: 'center',
    width,
  },
  tutorialImage: {
    flex: 0.76,
    resizeMode: 'contain',
    width: '100%',
  },
  containerIn: {
    flex: 0.24,
    width: '80%',
    marginTop: 10,
  },
});
