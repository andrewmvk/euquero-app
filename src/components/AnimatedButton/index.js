import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';

import { SelectButton, SelectButtonText } from './styles';
import { buttonOpacity, colors } from '../../defaultStyles';

const screenWidth = Dimensions.get('window').width;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const perimeter = 2 * screenWidth * 0.8 + 110;

export default (props) => {
  const pressed = props.active;
  const firstUpdate = useRef(true);

  const animatedStroke = useSharedValue(0);

  const rectProps = useAnimatedProps(() => ({
    strokeDashoffset: perimeter * (1 - animatedStroke.value),
  }));

  const animation = (toValue) => {
    animatedStroke.value = withSpring(toValue);
  };

  const handleOnPress = () => {
    animation(pressed ? 0 : 1);
    props.onPress();
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else if (!pressed) {
      animation(0);
    }
  }, [pressed]);

  return (
    <SelectButton activeOpacity={buttonOpacity} onPress={handleOnPress}>
      <Svg width={screenWidth * 0.8} height="55">
        <Rect
          width={screenWidth * 0.8}
          height="55"
          rx={5}
          ry={5}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="4"
          stroke={colors.gray}
        />
        <AnimatedRect
          width={screenWidth * 0.8}
          height="55"
          rx={5}
          ry={5}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="4"
          stroke={colors.orange}
          strokeDasharray={`${perimeter}, ${perimeter}`}
          animatedProps={rectProps}
        />
      </Svg>
      <SelectButtonText style={{ color: pressed ? colors.orange : colors.gray }}>
        {props.text}
      </SelectButtonText>
    </SelectButton>
  );
};
