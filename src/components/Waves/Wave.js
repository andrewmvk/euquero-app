import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../../defaultStyles';

const { width, height } = Dimensions.get('screen');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default (props) => {
  const waveAnimated = useSharedValue(0.1);
  const initialHeight = height * props.size;
  const heightAnimated = useSharedValue(initialHeight * 1.8);

  const rotateStyle =
    props.top != null ? { transform: [{ rotate: '180deg' }], top: -10 } : { bottom: -10 };

  const svgProps = useAnimatedProps(() => {
    return {
      width: width,
      height: heightAnimated.value,
      style: [{ position: 'absolute' }, rotateStyle],
    };
  });

  const bottomWaveProps = useAnimatedProps(() => {
    const waveHeight = props.size * height * waveAnimated.value;

    const firstCHeight = waveHeight * 0.5;
    const secondCHeight = waveHeight * 0.7;
    const thirdCHeight = 1 * Math.pow(waveAnimated.value, 3);

    const pathStart = `0, ${waveHeight * 0.68}`;

    const qPointA1 = `${width * 0.05} ${firstCHeight}`;
    const qPointB1 = `${width * 0.11} ${firstCHeight}`;

    const cPointA1 = `${width * 0.18} ${firstCHeight}`;
    const cPointB1 = `${width * 0.2} ${secondCHeight}`;
    const cPointC1 = `${width * 0.37} ${secondCHeight}`;

    const cPointA2 = `${width * 0.6} ${secondCHeight}`;
    const cPointB2 = `${width * 0.57} ${thirdCHeight}`;
    const cPointC2 = `${width * 0.78} ${thirdCHeight}`;

    const qPointA2 = `${width * 0.9} ${thirdCHeight}`;
    const qPointB2 = `${width} ${waveHeight * 0.2}`;

    return {
      d: `
      M${pathStart} 
      Q${qPointA1} ${qPointB1} 
      C${cPointA1} ${cPointB1} ${cPointC1} 
      C${cPointA2} ${cPointB2} ${cPointC2}
      Q${qPointA2} ${qPointB2} 
      V${heightAnimated.value * 5} H0 Z
      `,
    };
  });

  useEffect(() => {
    if (!props.navigate.n) {
      setTimeout(() => {
        waveAnimated.value = 0.3;

        heightAnimated.value = withTiming(heightAnimated.value / 1.8, {
          duration: 700,
          easing: Easing.linear,
        });

        waveAnimated.value = withTiming(1, {
          duration: 700,
          easing: Easing.linear,
        });
      }, 500);
    } else {
      navigationTypeAnimation(props.navigate.type);
    }
  }, [props.navigate]);

  function navigationTypeAnimation(nType) {
    if (props.top === undefined) {
      if (nType === 'to' && heightAnimated.value == initialHeight) {
        const animationDirection = heightAnimated.value * 6;
        animation(animationDirection);
      } else if (nType === 'from' && heightAnimated.value == initialHeight * 6) {
        const animationDirection = heightAnimated.value / 6;
        animation(animationDirection);
      }
    } else {
      if (nType === 'to' && heightAnimated.value == initialHeight) {
        const animationDirection = heightAnimated.value / 6;
        animation(animationDirection);
      } else if (nType === 'from' && heightAnimated.value == initialHeight / 6) {
        const animationDirection = heightAnimated.value * 6;
        animation(animationDirection);
      }
    }
  }

  function animation(animationD) {
    heightAnimated.value = withTiming(animationD, {
      duration: 500,
      easing: Easing.ease,
    });
  }

  return (
    <AnimatedSvg animatedProps={svgProps}>
      <AnimatedPath animatedProps={bottomWaveProps} fill={colors.orange} />
    </AnimatedSvg>
  );
};
