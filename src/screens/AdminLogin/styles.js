import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import * as defaultS from '../../defaultStyles';

export const Background = styled.View`
  background: ${defaultS.colors.backgroundMain};
  flex: 1;
  align-items: center;
`;

export const Header = styled.SafeAreaView`
  position: absolute;
  height: 30px;
  width: 90%;
  margin-top: 40px;
  flex-direction: row;
  align-items: flex-start;
`;

export const Container = styled.SafeAreaView`
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

export const CustomButtonShadow = {
  distance: 0,
  startColor: 'rgba(0,0,0,0.1)',
  offset: [0, 4],
  radius: 20,
};

export const extraStyles = {
  alignItems: 'center',
  height: Dimensions.get('window').height * 0.6,
  justifyContent: 'space-evenly',
};
