import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('screen').height * 0.92 + 'px';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const InputArea = styled.View`
  justify-content: space-between;
  height: 25%;
  width: 75%;
`;

export const ButtonView = styled.View`
  height: ${deviceHeight};
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  padding: 10%;
`;
