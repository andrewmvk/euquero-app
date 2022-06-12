import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../../defaultStyles';

const { width, height } = Dimensions.get('screen');
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default (props) => {
  const waveAnimated = useSharedValue(1);
  const chartHeight = height * props.size;

  const bottomWaveProps = useAnimatedProps(() => {
    const firstCHeight = (chartHeight * 0.5) / Math.pow(waveAnimated.value, 0.1);
    const secondCHeight = (chartHeight * 0.7) / Math.pow(waveAnimated.value, 0.1);
    const thirdCHeight = 1 * waveAnimated.value;

    const pathStart = `0, ${(chartHeight * 0.68) / Math.pow(waveAnimated.value, 0.3)}`;

    const qPointA1 = `${width * 0.05} ${firstCHeight}`;
    const qPointB1 = `${width * 0.11} ${firstCHeight}`;

    const cPointA1 = `${width * 0.18} ${firstCHeight}`;
    const cPointB1 = `${width * 0.2} ${secondCHeight}`;
    const cPointC1 = `${width * 0.37} ${secondCHeight}`;

    const cPointA2 = `${width * 0.6} ${secondCHeight}`;
    const cPointB2 = `${width * 0.57} ${thirdCHeight}`;
    const cPointC2 = `${width * 0.78} ${thirdCHeight}`;

    const qPointA2 = `${width * 0.9} ${thirdCHeight}`;
    const qPointB2 = `${width} ${chartHeight * 0.2 * Math.pow(waveAnimated.value, 0.2)}`;

    return {
      d: `
      M${pathStart} 
      Q${qPointA1} ${qPointB1} 
      C${cPointA1} ${cPointB1} ${cPointC1} 
      C${cPointA2} ${cPointB2} ${cPointC2}
      Q${qPointA2} ${qPointB2} 
      V${chartHeight} H0 Z
      `,
    };
  });

  function waveMove() {
    waveAnimated.value = 1;

    waveAnimated.value = withRepeat(
      withTiming(55, {
        duration: 200,
        easing: Easing.ease,
      }),
      2,
      true,
    );
  }

  const rotateStyle =
    props.top != null ? { transform: [{ rotate: '180deg' }], top: 0 } : { bottom: 0 };

  return (
    <Svg width={width} height={chartHeight} style={[{ position: 'absolute' }, rotateStyle]}>
      <AnimatedPath animatedProps={bottomWaveProps} fill={colors.orange} />
    </Svg>
  );
};
