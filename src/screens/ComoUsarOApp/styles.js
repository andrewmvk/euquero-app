import styled from "styled-components/native";
import * as defaultS from "../../defaultStyles";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Header = styled.SafeAreaView`
  height: 30px;
  width: 90%;
  margin-top: 50px;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

export const HeaderText = styled.Text`
  font-size: ${defaultS.fontSize.header};
  color: ${defaultS.colors.gray};
  margin-left: 10px;
  font-family: ${defaultS.fonts.spartanR};
`;
