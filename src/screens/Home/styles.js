import styled from 'styled-components/native';
import * as defaultS from '../../defaultStyles';
import { Dimensions } from 'react-native';

export const Container = styled.SafeAreaView`
  background: ${defaultS.colors.backgroundMain};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LogoView = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1.2;
  margin-top: 20px;
`;

export const Subtitle = styled.Text`
  color: ${defaultS.colors.titleSubtitle};
  margin-top: 0px;
  margin-bottom: 60px;
  font-family: ${defaultS.fonts.spartanR};
  font-size: ${defaultS.fontSize.subtitle};
  text-align: center;
  line-height: 22px;
`;

export const Buttons = styled.View`
  justify-content: center;
  align-items: center;
  flex: 2;
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

export const extraStyles = {
  adminIcon: {
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 15,
    borderBottomWidth: 5,
    borderColor: '#c4c4c4',
    borderEndWidth: 3,
  },
  viewBody: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.5,
    justifyContent: 'center',
  },
};
