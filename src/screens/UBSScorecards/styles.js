import styled from 'styled-components/native';
import { colors, fonts, fontSize } from '../../defaultStyles';
import * as defaultS from '../../defaultStyles';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const SearchArea = styled.View`
  width: 85%;
  flex-direction: row;
  align-items: center;
`;

export const SearchInput = styled.View`
  height: 55px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 18px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const SearchInputText = styled.TextInput`
  flex: 1;
  font-size: ${fontSize.cardText};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
`;

export const TextView = styled.View`
  width: 80%;
  margin-top: 30px;
  margin-bottom: 30px;
  align-items: flex-start;
  justify-content: space-between;
  height: 7.5%;
`;

export const Period = styled.Text`
  font-size: ${fontSize.bigTitle};
  color: ${colors.text};
  font-family: ${fonts.spartanR};
`;

export const UBSName = styled.Text`
  font-size: ${fontSize.text};
  color: ${colors.text};
  font-family: ${fonts.spartanR};
`;

export const DescriptionBox = styled.View`
  background-color: white;
  padding: 25px;
  border-radius: 5px;
`;

export const DescriptionText = styled.Text`
  width: 100%;
  max-height: 100%;
  font-size: ${fontSize.text};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
`;

export const ButtonView = styled.View`
  align-items: center;
`;
