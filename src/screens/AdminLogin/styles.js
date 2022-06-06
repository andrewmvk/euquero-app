import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  background: #63c2d1;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LogoView = styled.View`
  height: 30%;
  align-items: center;
`;

export const Subtitle = styled.Text`
  color: #fff;
  margin-top: 25px;
  font-size: 17px;
`;

export const InputArea = styled.View`
  justify-content: space-around;
  height: 35%;
  width: 285px;
`;

export const TextInput = styled.TextInput`
  height: 28%;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 18px;
`;

export const CustomButton = styled.TouchableOpacity`
  width: 200px;
  height: 40px;
  background-color: #ff6b0f;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
`;

export const CustomButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
