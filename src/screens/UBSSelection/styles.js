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

export const NoResults = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #9bb5cc;
  font-weight: bold;
  margin-top: 16px;
`;

export const SimpleText = styled.Text`
  font-size: 20px;
  font-weight: 300;
  color: #808080;
  text-align: center;
  margin: 16px 30px 16px 30px;
`;
