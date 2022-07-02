import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import * as defaultS from '../../defaultStyles';

export const Background = styled.View`
  background: ${defaultS.colors.backgroundMain};
  height: 100%;
  width: 100%;
  align-items: center;
`;

export const Container = styled.SafeAreaView`
  height: 100%;
  width: 100%;
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
  width: 75%;
`;

export const SearchInput = styled.View`
  font-family: ${defaultS.fonts.spartanR};
  justify-content: center;
  margin-top: 25px;
  flex-direction: row;
  height: 28%;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
`;

export const SearchInputText = styled.TextInput`
  flex: 1;
  font-size: 18px;
  color: #7f7f7f;
`;

export const extraStyles = {
  containerView: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'space-evenly',
  },
  keyboardAvoidView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 2,
  },
};
