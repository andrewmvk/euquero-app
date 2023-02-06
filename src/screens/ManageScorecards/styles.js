import styled from 'styled-components/native';
import { colors, fonts, fontSize } from '../../defaultStyles';

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
  margin-top: 45px;
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
