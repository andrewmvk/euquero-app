import styled from "styled-components/native";
import { colors, fonts, fontSize } from "../../defaultStyles";
import * as defaultS from "../../defaultStyles";

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
  font-weight: 200;
`;

export const SearchInput = styled.View`
  height: 55px;
  width: 72%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 18px;
  justify-content: center;
  margin-top: 45px;
  flex-direction: row;
`;

export const SearchInputText = styled.TextInput`
  flex: 1;
  font-size: ${defaultS.fontSize.cardText};
  font-family: ${defaultS.fonts.spartanR};
  color: ${defaultS.colors.text};
`;

export const SearchArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
