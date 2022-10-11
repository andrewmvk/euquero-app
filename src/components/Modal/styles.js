import styled from 'styled-components/native';
import { fonts, fontSize, colors } from '../../defaultStyles';

export const Title = styled.Text`
  font-size: ${fontSize.title};
  color: ${colors.text};
  font-family: ${fonts.spartanR};
  margin-bottom: 10px;
  width: 70%;
  text-align: center;
`;

export const Description = styled.Text`
  text-align: center;
  width: 80%;
  font-size: ${fontSize.text};
  color: ${colors.text};
  font-family: ${fonts.spartanBold};
`;

export const TextView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 0.75;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.title};
  color: ${colors.titleSubtitle};
`;
