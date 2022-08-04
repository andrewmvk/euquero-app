import styled from 'styled-components/native';
import { fonts, fontSize, colors } from '../../defaultStyles';

export const Title = styled.Text`
  font-size: ${fontSize.title};
  color: ${colors.text};
  font-family: ${fonts.spartanR};
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: ${fontSize.text};
  color: ${colors.text};
  font-family: ${fonts.spartanBold};
`;

export const TextView = styled.View`
  width: 100%;
  align-items: center;
  flex: 1;
`;

export const ButtonText = styled.Text`
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.title};
  color: ${colors.titleSubtitle};
`;
