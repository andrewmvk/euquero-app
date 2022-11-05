import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import * as defaultS from '../../defaultStyles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${defaultS.colors.backgroundMain};
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
  height: 55px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 18px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const SearchInputText = styled.TextInput`
  flex: 1;
  font-size: ${defaultS.fontSize.cardText};
  font-family: ${defaultS.fonts.spartanR};
  color: ${defaultS.colors.text};
`;

export const SearchArea = styled.View`
  width: 85%;
  flex-direction: row;
  align-items: center;
`;

export const extraStyles = {
  containerView: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'space-evenly',
  },
  keyboardAvoidView: {
    width: '100%',
    height: Dimensions.get('screen').height,
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 2,
  },
};
