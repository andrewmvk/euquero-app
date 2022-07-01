import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Svg, { LinearGradient, Path, Defs, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../../defaultStyles';

const { width, height } = Dimensions.get('screen');
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default (props) => {
  let size = 0.2;
  const initialHeight = height * size + 5;

  const waveAnimated = useSharedValue(props.transition.type === 'nothing' ? 1 : 0.3);
  const heightAnimated = useSharedValue(
    props.transition.type === 'nothing' ? initialHeight : initialHeight * 1.8,
  );

  const rotateStyle =
    props.top != null ? { transform: [{ rotate: '180deg' }], top: -10 } : { bottom: -10 };

  const svgProps = useAnimatedProps(() => {
    return {
      width: width,
      height: heightAnimated.value,
      style: [{ position: 'absolute', zIndex: 2 }, rotateStyle],
    };
  });

  const waveProps = useAnimatedProps(() => {
    const waveHeight = size * height * waveAnimated.value;

    const firstCHeight = waveHeight * 0.55;
    const secondCHeight = waveHeight * 0.7;
    const thirdCHeight = 5 * Math.pow(waveAnimated.value, 3);

    const pathStart = `0, ${waveHeight * 0.68}`;

    const qPointA1 = `${width * 0.05} ${firstCHeight}`;
    const qPointB1 = `${width * 0.11} ${firstCHeight}`;

    const cPointA1 = `${width * 0.18} ${firstCHeight}`;
    const cPointB1 = `${width * 0.2} ${secondCHeight}`;
    const cPointC1 = `${width * 0.37} ${secondCHeight}`;

    const cPointA2 = `${width * 0.6} ${secondCHeight}`;
    const cPointB2 = `${width * 0.57} ${thirdCHeight}`;
    const cPointC2 = `${width * 0.82} ${thirdCHeight}`;

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

  const [waveFirstState, setWaveFirstState] = useState(false);
  const [awayWave, setAwayWave] = useState(false);

  useEffect(() => {
    if (!props.transition.n && props.transition.type === '') {
      setTimeout(() => {
        waveAnimated.value = 0.3;

        heightAnimated.value = withSpring(heightAnimated.value / 1.8);

        waveAnimated.value = withSpring(1);
      }, 500);
    } else if (!(props.transition.type === 'nothing')) {
      waveFirstState ? navigationTypeAnimation(props.transition.type) : setWaveFirstState(true);
    }
  }, [props.transition]);

  function navigationTypeAnimation(nType) {
    let awayFactor = 3;
    let factor = awayWave ? 6 * awayFactor : 6;
    let animationDirection = initialHeight;
    let isSpring = false;

    if (props.top === undefined || nType === 'away') {
      if (nType === 'to') {
        animationDirection = initialHeight * factor;
      } else if (nType === 'from') {
        animationDirection = initialHeight;
      } else if (nType === 'away') {
        if (awayWave) {
          animationDirection = initialHeight;
        } else {
          animationDirection = initialHeight / awayFactor;
        }
        setAwayWave(!awayWave);
        isSpring = true;
      }
    } else {
      if (nType === 'to') {
        animationDirection = initialHeight / factor;
      } else if (nType === 'from') {
        animationDirection = initialHeight;
      }
    }
    transtionAnimation(animationDirection, isSpring);
    isSpring = false;
  }

  function transtionAnimation(animationD, spring) {
    if (spring) {
      heightAnimated.value = withSpring(animationD);
    } else {
      heightAnimated.value = withTiming(animationD, {
        duration: 500,
        easing: Easing.ease,
      });
    }
  }

  return (
    <AnimatedSvg animatedProps={svgProps}>
      <Defs>
        <LinearGradient id="grad" x1="50%" y1="100%" x2="0%" y2="0%">
          <Stop offset="0%" stopColor="#000" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#000" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <AnimatedPath animatedProps={waveProps} fill={'url(#grad)'} translateY={-5} />
      <AnimatedPath animatedProps={waveProps} fill={colors.orange} />
    </AnimatedSvg>
  );
};
