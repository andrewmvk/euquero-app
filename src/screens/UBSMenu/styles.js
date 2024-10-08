import styled from 'styled-components/native';
import * as defaultS from '../../defaultStyles';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const UBSName = styled.Text`
  width: ${screenWidth * 0.8}px;
  font-family: ${defaultS.fonts.spartanR};
  font-size: ${defaultS.fontSize.bigTitle};
  color: ${defaultS.colors.text};
  text-align: left;
  margin-bottom: 30px;
`;

export const Menu = styled.View`
  width: 100%;
  height: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const PeriodosCard = styled.TouchableOpacity`
  border-left-color: #ff6b0f;
  z-index: 3;
  width: ${screenWidth * 0.8}px;
  height: 80px;
  background-color: #fff;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  border-left-width: 7px;
  justify-content: center;
`;

export const Periodos = styled.View`
  width: ${screenWidth * 0.8 * 0.95}px;
  background-color: #fff;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 5px 20px 15px 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  align-self: center;
`;

export const Space = styled.View`
  flex-direction: row;
  width: 20%;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const OptionText = styled.Text`
  font-family: 'Spartan_400Regular';
  font-size: 15px;
  color: ${defaultS.colors.text};
`;

export const Option = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  align-items: center;
`;
