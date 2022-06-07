import React from 'react';
import { Dimensions } from 'react-native';

import { DashedCircleC } from './styles';

export default () => {
  let circleDiameter = Dimensions.get('window').width * 0.78;
  let topPosition = -(circleDiameter * 0.68);
  let leftPostion = Dimensions.get('window').width * 0.695;

  return (
    <DashedCircleC
      style={{
        width: circleDiameter,
        height: circleDiameter,
        marginTop: topPosition,
        marginLeft: leftPostion,
      }}
    />
  );
};
