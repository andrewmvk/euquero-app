import React, { useState } from 'react';
import { TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';

import { buttonOpacity, shadow } from '../../defaultStyles';
import { Description, Scorecard, ScorecardText, ScorecardTitle } from './styles';

import Diamond from '../../../assets/images/diamond.svg';
import Gold from '../../../assets/images/gold.svg';
import Silver from '../../../assets/images/silver.svg';
import Bronze from '../../../assets/images/bronze.svg';

const AnimatedView = Animated.createAnimatedComponent(View);

export default (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useSharedValue(30);
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
    animatedHeight.value = withSpring(!isExpanded ? 200 : 30);
  };

  let color = '#0f0f0f0';
  let scoreIcon = () => {};
  switch (props.item.score) {
    case 1:
      color = '#D1B183';
      scoreIcon = () => {
        return <Bronze width={60} height={60} style={{ marginRight: 20 }} />;
      };
      break;
    case 2:
      color = '#8096AD';
      scoreIcon = () => {
        return <Silver width={60} height={60} style={{ marginRight: 20 }} />;
      };
      break;
    case 3:
      color = '#FDB318';
      scoreIcon = () => {
        return <Gold width={60} height={60} style={{ marginRight: 20 }} />;
      };
      break;
    case 4:
      color = '#996CFF';
      scoreIcon = () => {
        return <Diamond width={60} height={60} style={{ marginRight: 20 }} />;
      };
      break;
    default:
      break;
  }

  return (
    <View
      key={props.item.scorecard}
      style={{ width: scoreCardWidth, alignItems: 'center', marginBottom: 15, zIndex: 10 }}
    >
      <Scorecard
        style={{ borderRightColor: color, ...shadow }}
        activeOpacity={buttonOpacity}
        onPress={increaseDecreaseHeight}
      >
        <View style={{ width: scoreCardWidth - 100 }}>
          <ScorecardTitle numberOfLines={1}>{props.item.name}</ScorecardTitle>
          <ScorecardText>Nota: {props.item.score} </ScorecardText>
        </View>
        {scoreIcon()}
      </Scorecard>
      <AnimatedView animatedProps={viewProps}>
        {isExpanded ? (
          <ScrollView nestedScrollEnabled={true}>
            <Description>{props.item.description}</Description>
          </ScrollView>
        ) : (
          <TouchableOpacity onPress={increaseDecreaseHeight} activeOpacity={buttonOpacity}>
            <Icon
              name="dots-horizontal"
              type="material-community"
              color="#7f7f7f"
              style={{ marginLeft: '80%', paddingTop: 5 }}
            />
          </TouchableOpacity>
        )}
      </AnimatedView>
    </View>
  );
};
