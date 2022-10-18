import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors, fonts, fontSize } from '../../defaultStyles';

const screenWidth = Dimensions.get('window').width;

export const TouchableIcon = styled.TouchableOpacity`
  justify-content: center;
  height: 90%;
`;

export const TouchableCard = styled.TouchableOpacity`
  width: ${screenWidth * 0.85}px;
  height: 70px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

export const Icons = styled.View`
  height: 70px;
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 10px;
`;

export const Description = styled.TextInput`
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.text};
  color: ${colors.text};
  margin: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;
