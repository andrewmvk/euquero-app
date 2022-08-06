import styled from 'styled-components/native';
import * as defaultS from '../../defaultStyles';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  margin-right: 20px;
  transform: rotate(180deg);
`;

export const ManageText = styled.Text`
  padding-top: 10px;
  font-family: ${defaultS.fonts.spartanR};
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
