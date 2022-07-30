import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors, fonts, fontSize, fontSizeNoUnits } from '../../defaultStyles';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 15px;
  font-size: ${fontSize.bigTitle};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
`;

export const SimpleText = styled.Text`
  line-height: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80%;
  text-align: center;
  font-size: ${fontSize.text};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
`;

export const ButtonView = styled.View`
  margin-top: 20px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

export const TouchableText = styled.Text`
  text-align: center;
  color: ${colors.orange};
  font-size: ${fontSize.text};
  font-family: ${fonts.spartanR};
  text-decoration: underline;
`;
