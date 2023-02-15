import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;

export const TouchableCard = styled.TouchableOpacity`
  width: ${screenWidth * 0.85}px;
  height: 70px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

export const ScorecardsView = styled.View`
  z-index: 0;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;
