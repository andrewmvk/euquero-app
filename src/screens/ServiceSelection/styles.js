import styled from 'styled-components/native';
import * as defaultS from '../../defaultStyles';
import { Dimensions } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Map = styled.View`
  height: 250px;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  height: 35%;
  background-color: ${defaultS.colors.text};
`;

export const UBSName = styled.Text`
  font-family: ${defaultS.fonts.spartanR};
  font-size: ${defaultS.fontSize.bigTitle};
  color: ${defaultS.colors.text};
  text-align: left;
`;
