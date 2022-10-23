import styled from 'styled-components/native';
import { fonts, colors, fontSize } from '../../defaultStyles';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Map = styled.View`
  width: 100%;
  height: 30%;
  margin-top: 20px;
  background-color: ${colors.text};
`;

export const TextView = styled.View`
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
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
