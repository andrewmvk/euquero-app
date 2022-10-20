import React, { useState } from 'react';
import { TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { buttonOpacity } from '../../defaultStyles';
import { Description, Scorecard, ScorecardText, ScorecardTitle } from './styles';

const AnimatedView = Animated.createAnimatedComponent(View);

export default (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useSharedValue(20);
  const scoreCardWidth = Dimensions.get('window').width * 0.8;

  const viewProps = useAnimatedProps(() => {
    return {
      height: animatedHeight.value,
      style: {
        width: scoreCardWidth,
        marginTop: -5,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
    };
  }, [isExpanded]);

  const increaseDecreaseHeight = () => {
    setIsExpanded(!isExpanded);
    animatedHeight.value = withSpring(!isExpanded ? 200 : 20);
  };

  let color = '#0f0f0f0';
  switch (props.item.score) {
    case 1:
      color = '#D1B183';
      break;
    case 2:
      color = '#8096AD';
      break;
    case 3:
      color = '#FDB318';
      break;
    case 4:
      color = '#996CFF';
      break;
    default:
      break;
  }

  const cardShadow = {
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
    containerViewStyle: {
      height: 80,
      width: '100%',
      zIndex: 3,
    },
  };

  return (
    <View
      key={props.item.scorecard}
      style={{ width: scoreCardWidth, alignItems: 'center', marginBottom: 15, zIndex: 10 }}
    >
      <Shadow {...cardShadow}>
        <Scorecard
          style={{ borderRightColor: color }}
          activeOpacity={buttonOpacity}
          onPress={increaseDecreaseHeight}
        >
          <ScorecardTitle numberOfLines={1}>{props.item.name}</ScorecardTitle>
          <ScorecardText>Nota: {props.item.score} </ScorecardText>
        </Scorecard>
      </Shadow>
      <AnimatedView animatedProps={viewProps}>
        {isExpanded ? (
          <ScrollView nestedScrollEnabled={true}>
            <Description>{props.item.description}</Description>
          </ScrollView>
        ) : null}
      </AnimatedView>
    </View>
  );
};
