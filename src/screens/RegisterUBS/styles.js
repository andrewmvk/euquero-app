import styled from "styled-components/native";
import { colors, fonts, fontSize } from "../../defaultStyles";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const InputArea = styled.View`
  width: 80%;
`;

export const MediumTitle = styled.Text`
  font-family: ${fonts.spartanM};
  font-size: 17px;
  color: ${colors.text};
  margin: 25px 0;
`;

export const ButtonView = styled.View`
  height: 25px;
  width: 90%;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;
