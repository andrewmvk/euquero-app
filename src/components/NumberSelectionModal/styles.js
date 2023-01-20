import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { fonts, colors, fontSize } from '../../defaultStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const ItemButton = styled.TouchableOpacity`
  width: ${screenWidth * 0.2}px;
  height: ${screenWidth * 0.2}px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${colors.text};
`;

export const ItemText = styled.Text`
  text-align: center;
  font-size: ${screenWidth * 0.062}px;
  font-family: ${fonts.spartanR};
  color: ${colors.orange};
`;

export const ModalContainer = styled.View`
  height: ${screenHeight}px;
  flex: 1;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  width: ${screenWidth * 0.8}px;
  height: ${screenWidth * 0.2}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-bottom: 2px;
`;

export const HeaderText = styled.Text`
  font-size: ${screenWidth * 0.055}px;
  text-align: center;
  font-family: ${fonts.spartanR};
  color: ${colors.orange};
`;

export const ModalContent = styled.View`
  width: ${screenWidth * 0.8}px;
  height: ${screenWidth * 0.8}px;
  background-color: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const Grid = styled.View`
  flex-direction: row;
  z-index: 6;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
