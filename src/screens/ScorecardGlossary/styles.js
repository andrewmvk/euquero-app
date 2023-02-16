import styled from 'styled-components/native';
import { colors, fonts, fontSize } from '../../defaultStyles';

export const Title = styled.Text`
  width: 100%;
  font-size: ${fontSize.bigTitle};
  font-family: ${fonts.spartanM};
  color: ${colors.text};
`;

export const Subtitle = styled.Text`
  max-width: 88%;
  margin-right: 2%;
  font-size: ${fontSize.cardText};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
`;

export const SubtitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DescriptionBox = styled.View`
  margin-top: 15px;
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
