import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors, fonts, fontSize } from '../../defaultStyles';

const screenWidth = Dimensions.get('window').width;

export const TouchableIcon = styled.TouchableOpacity`
  justify-content: center;
  flex: 0.5;
  margin-right: 10px;
  height: 90%;
`;

export const TouchableCard = styled.TouchableOpacity`
  width: ${screenWidth * 0.85}px;
  z-index: 3;
  height: 70px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

export const TouchableInnerCard = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 8px;
`;
