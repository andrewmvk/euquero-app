import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { fonts, colors, fontSize } from '../../defaultStyles';

export const Scorecard = styled.TouchableOpacity`
  height: 80px;
  width: ${Dimensions.get('window').width * 0.8}px;
  align-items: center;
  background-color: #fff;
  flex-direction: row;
  border-radius: 5px;
  border-right-width: 7px;
  justify-content: space-between;
`;

export const Description = styled.Text`
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.text};
  color: ${colors.text};
  margin: 15px;
  margin-left: 22px;
  margin-right: 22px;
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
