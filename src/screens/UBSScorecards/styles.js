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

export const Scorecard = styled.TouchableOpacity`
  height: 80px;
  width: 100%;
  background-color: #fff;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  border-right-width: 7px;
  justify-content: center;
`;

export const Description = styled.Text`
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.text};
  color: ${colors.text};
  margin: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

export const ScorecardTitle = styled.Text`
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-left: 22px;
  margin-top: -5px;
  color: ${colors.text};
  font-family: ${fonts.spartanR};
`;

export const ScorecardText = styled.Text`
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-left: 22px;
  color: ${colors.text};
  font-family: ${fonts.spartanL};
`;
