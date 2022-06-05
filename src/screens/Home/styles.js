import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #6a426e;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LogoView = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

export const Subtitle = styled.Text`
  color: #fff;
  margin-top: 15px;
  font-family: 'Spartan_400Regular';
  font-size: 14px;
`;

export const Btns = styled.View`
  height: 30%;
  justify-content: center;
`;

export const BuscarBtn = styled.TouchableOpacity`
  width: 250px;
  height: 50px;
  background-color: #ff6b0f;
  border-radius: 99px;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  margin-bottom: 35px;
`;

export const ComoUsarBtn = styled.TouchableOpacity`
  width: 200px;
  height: 40px;
  background-color: #ff6b0f;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-left: 26px;
  padding-bottom: 2px;
  margin-bottom: 20px;
`;

export const SobreProjetoBtn = styled.TouchableOpacity`
  width: 200px;
  height: 40px;
  background-color: #ff6b0f;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-left: 26px;
  padding-bottom: 2px;
`;

export const TxtBtn = styled.Text`
  color: #fff;
  font-family: 'Spartan_400Regular';
  font-size: 17px;
`;

export const TxtBtn2 = styled.Text`
  color: #fff;
  font-family: 'Spartan_400Regular';
  font-size: 13px;
`;

export const Icon = styled.View`
  background-color: #fff;
  color: blue;
`;

export const AdminBtn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 60px;
  z-index: 100;
`;
