import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
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

export const TouchableArrow = styled.TouchableOpacity`
  height: 100%;
  width: 30px;
`;

export const HeaderText = styled.Text`
  font-size: 15px;
  color: #c4c4c4;
  margin-left: 10px;
  font-family: 'Spartan_400Regular';
`;

export const ManageText = styled.Text`
  padding-top: 10px;
  font-size: 17px;
  color: #7f7f7f;
`;

export const ManageTouchableBox = styled.TouchableOpacity`
  background: #fff;
  border-radius: 5px;
  width: 300px;
  height: 160px;
  justify-content: center;
  align-items: center;
`;

export const ManageBoxShadow = {
  distance: 0,
  startColor: 'rgba(0,0,0,0.25)',
  offset: [0, 4],
  radius: 5,
  containerViewStyle: { marginBottom: 20 },
};
