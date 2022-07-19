import styled from 'styled-components/native';
import { fonts, fontSize, colors } from '../../defaultStyles';

export const ContainerIn = styled.View`
  height: 75%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const Title = styled.Text`
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.title};
  color: ${colors.text};
`;

export const Name = styled.Text`
  font-family: ${fonts.spartanBold};
  font-size: ${fontSize.title};
  color: ${colors.text};
`;

export const ButtonText = styled.Text`
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.title};
  color: ${colors.titleSubtitle};
`;

export const TouchableText = styled.Text`
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.subtitle};
  color: ${colors.orange};
  text-decoration: underline;
`;

export const ObservationText = styled.Text`
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.text};
  color: ${colors.titleSubtitle};
  text-align: center;
`;
