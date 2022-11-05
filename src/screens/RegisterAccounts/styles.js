import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import * as defaultS from '../../defaultStyles';

const deviceHeight = Dimensions.get('screen').height * 0.92 + 'px';

export const Container = styled.SafeAreaView`
  height: ${Dimensions.get('screen').height}px;
  align-items: center;
`;

export const InputArea = styled.View`
  justify-content: space-around;
  height: 30%;
  width: 75%;
`;

export const SearchInput = styled.View`
  height: 55px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 18px;
  justify-content: center;
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
  width: 85%;
  flex-direction: row;
  align-items: center;
`;

export const ButtonView = styled.View`
  height: ${deviceHeight};
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  padding: 10%;
`;
