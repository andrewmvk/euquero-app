import styled from 'styled-components/native';
import { colors, fonts, fontSize } from '../../defaultStyles';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  margin-top: 45px;
  margin-bottom: 25px;
  font-size: ${fontSize.bigTitle};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
  text-align: center;
`;

export const InputArea = styled.View`
  width: 85%;
`;

export const InputBox = styled.View`
  height: 55px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 18px;
  padding-right: 18px;
  flex-direction: row;
`;

export const Input = styled.TextInput`
  width: 100%;
  font-size: ${fontSize.cardText};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
`;
