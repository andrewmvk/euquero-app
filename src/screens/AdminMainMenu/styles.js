import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #f8f8f8;
  flex: 1;
  align-items: center;
  padding-top: 5%;
`;

export const Header = styled.SafeAreaView`
  height: 30px;
  width: 90%;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

export const HeaderText = styled.Text`
  /* font-family: 'Spartan_700Bold'; */
  font-size: 15px;
  color: #c4c4c4;
  margin-left: 10px;
`;

export const ManageText = styled.Text`
  padding-top: 10px;
  font-size: 20px;
  color: #7f7f7f;
  /* font-family: 'Spartan_400Regular'; */
`;

export const ManageTouchableBox = styled.TouchableOpacity`
  margin-bottom: 25px;
  background: #fff;
  border-radius: 5px;
  width: 300px;
  height: 160px;
  justify-content: center;
  align-items: center;
`;
