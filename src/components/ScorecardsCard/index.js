import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { buttonOpacity, colors, fonts, fontSizeNoUnits, shadow } from '../../defaultStyles';
import { DeviceCard } from '../../components/common';
import { ScorecardsView, TouchableCard } from './styles';
import { ScrollView } from 'react-native';
const AnimatedView = Animated.createAnimatedComponent(View);

export default (props) => {
  const [isOpened, setIsOpened] = useState(false);

  const screenWidth = Dimensions.get('window').width;

  const animatedHeight = useSharedValue(15);
  const viewProps = useAnimatedProps(() => {
    return {
      height: animatedHeight.value,
      width: screenWidth * 0.85,
      style: {
        backgroundColor: '#fff',
        paddingTop: 5,
        marginTop: -5,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
    };
  }, []);

  const switchTab = async () => {
    animatedHeight.value = withSpring(isOpened ? 15 : 210);
    setIsOpened(!isOpened);
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TouchableCard
        style={{ ...shadow, zIndex: 1 }}
        activeOpacity={buttonOpacity}
        onPress={switchTab}
      >
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
      </TouchableCard>

      <AnimatedView animatedProps={viewProps}>
        {isOpened ? (
          <ScrollView style={{ width: '100%' }} nestedScrollEnabled={true}>
            <ScorecardsView>
              {props.scorecards.map((item) => {
                return <DeviceCard key={item.id} score={item.score} text={item.name} />;
              })}
            </ScorecardsView>
          </ScrollView>
        ) : null}
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontFamily: fonts.spartanR,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeNoUnits.cardText,
    paddingHorizontal: 20,
    color: colors.text,
    flex: 2,
  },
  number: {
    textAlign: 'center',
    fontFamily: fonts.spartanR,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeNoUnits.cardText,
    color: colors.orange,
    marginLeft: 10,
    flex: 0.5,
  },
});
