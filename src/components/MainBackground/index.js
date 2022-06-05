import React from 'react';
import { Dimensions } from 'react-native';

import { DashedCircle } from './styles';

export default () => {
  let circleDiameter = Dimensions.get('window').width * 0.78;
  let topPosition = -(circleDiameter * 0.68);
  let leftPostion = Dimensions.get('window').width * 0.695;

  return (
    <DashedCircle
      style={{
        width: circleDiameter,
        height: circleDiameter,
        marginTop: topPosition,
        marginLeft: leftPostion,
      }}
    />
  );
};
