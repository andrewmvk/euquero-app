import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import * as defaultS from '../../defaultStyles';

const screenWidth = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
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
  width: ${screenWidth * 0.85}px;
  height: 160px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
