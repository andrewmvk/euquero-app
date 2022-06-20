import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import * as defaultS from '../../defaultStyles';

let titleDistanceTop = Dimensions.get('window').height * 0.025;
let titleDistanceBottom = titleDistanceTop * 0.85;

export const Title = styled.Text`
  text-align: center;
  color: ${defaultS.colors.orange};
  padding-top: ${titleDistanceTop}px;
  padding-bottom: ${titleDistanceBottom}px;
  font-size: ${defaultS.fontSize.bigTitle};
  font-family: ${defaultS.fonts.spartanBold};
`;

export const PhaseText = styled.Text`
  text-align: center;
  color: ${defaultS.colors.text};
  padding-left: 25px;
  padding-right: 25px;
  font-size: 15px;
  width: 90%;
  align-self: center;
  font-family: ${defaultS.fonts.spartanR};
  line-height: 25px;
  height: 100%;
`;

export const TextScroll = styled.ScrollView`
  max-height: 50%;
`;

export const extraStyles = {
  containerOut: {
    flex: 1,
    justifyContent: 'center',
  },
  tutorialImage: {
    resizeMode: 'contain',
    height: '30%',
    width: '100%',
    marginTop: 0,
  },
  containerIn: {
    height: '60%',
    marginTop: 15,
  },
};
