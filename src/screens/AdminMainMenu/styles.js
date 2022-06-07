import styled from 'styled-components/native';
import * as defaultS from '../../defaultStyles';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Header = styled.SafeAreaView`
  height: 30px;
  width: 90%;
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: ${defaultS.fontSize.header};
  color: ${defaultS.colors.gray};
  margin-left: 10px;
  font-family: ${defaultS.fonts.spartanR};
`;

export const ManageText = styled.Text`
  padding-top: 10px;
  font-size: ${defaultS.fontSize.title};
  color: ${defaultS.colors.text};
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
