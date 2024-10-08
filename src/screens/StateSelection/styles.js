import styled from 'styled-components/native';
import * as defaultS from '../../defaultStyles';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const SearchInput = styled.View`
  height: 55px;
  width: 72%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 18px;
  justify-content: center;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

export const SearchInputText = styled.TextInput`
  flex: 1;
  font-size: ${defaultS.fontSize.cardText};
  font-family: ${defaultS.fonts.spartanR};
  color: ${defaultS.colors.text};
`;

export const SearchArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
