import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import * as defaultS from '../../defaultStyles';

export const Background = styled.View`
  background: ${defaultS.colors.backgroundMain};
  flex: 1;
  align-items: center;
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
  color: ${defaultS.colors.titleSubtitle};
  font-family: ${defaultS.fonts.spartanR};
  margin-top: 20px;
  font-size: ${defaultS.fontSize.subtitle};
`;

export const InputArea = styled.View`
  justify-content: space-around;
  height: 35%;
  width: 285px;
`;

export const TextInput = styled.TextInput`
  font-family: ${defaultS.fonts.spartanR};
  height: 28%;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 18px;
`;

export const extraStyles = {
  containerView: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'space-evenly',
  },
  keyboardAvoidView: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 2,
  },
};
