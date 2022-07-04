import styled from 'styled-components/native';
import { colors, fonts, fontSize } from '../../defaultStyles';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Card = styled.View`
  width: 100%;
  height: 70px;
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin: 7px 0;
  border-left-color: ${colors.orange};
  border-left-width: 7px;
`;

export const CardText = styled.Text`
  font-family: ${fonts.spartanR};
  text-align: left;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.cardText};
  margin-left: 22px;
  color: ${colors.text};
`;

export const TrashIcon = styled.TouchableOpacity`
  justify-content: center;
  height: 90%;
  padding-right: 5%;
`;
