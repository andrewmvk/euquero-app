import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors, fonts, fontSize } from '../../defaultStyles';

const screenWidth = Dimensions.get('window').width;

export const SelectButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: ${screenWidth * 0.8}px;
  height: 55px;
  border-radius: 5px;
  overflow: hidden;
`;

export const SelectButtonText = styled.Text`
  position: absolute;
  text-align: center;
  font-size: ${fontSize.cardText};
  font-family: ${fonts.spartanR};
`;
