import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { buttonOpacity, colors, fonts } from '../../defaultStyles';
import { ButtonText, Description, TextView, Title } from './styles';

const AnimatedLine = Animated.createAnimatedComponent(View);
const AnimatedContainer = Animated.createAnimatedComponent(View);

export default (props) => {
  const [showAdvice, setShowAdvice] = useState({ opened: false, title: '', text: '' });
  const [timer, setTimer] = useState();

  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  let defaultHeight = props.onPressYes ? deviceHeight * 0.75 : deviceHeight * 0.6;

  const animatedWidth = useSharedValue(deviceWidth);
  const animatedHeight = useSharedValue(defaultHeight);

  useEffect(() => {
    if (props.advice) {
      setShowAdvice({ opened: false, title: props.advice.title, text: props.advice.text });
    }
  }, []);

  const straightLineProps = useAnimatedProps(() => {
    return {
      width: animatedWidth.value,
      style: {
        backgroundColor: colors.orange,
        height: 6,
        left: 0,
        position: 'absolute',
        top: 0,
      },
    };
  });

  const containerProps = useAnimatedProps(() => {
    return {
      height: animatedHeight.value,
      style: {
        ...props?.containerStyle,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
    };
  });

  useEffect(() => {
    if (props.isVisible && !showAdvice.opened) {
      animatedWidth.value = deviceWidth;

      animatedWidth.value = withTiming(0, {
        duration: 5000,
        easing: Easing.ease,
      });
      setTimer(
        setTimeout(() => {
          props.onBackPress();
        }, 5100),
      );
    } else if (showAdvice.opened) {
      cancelAnimation(animatedWidth);
      animatedWidth.value = deviceWidth;
    }
  }, [props.isVisible, showAdvice.opened]);

  const heightAnimation = () => {
    const animationDirection = showAdvice.opened ? defaultHeight : deviceHeight * 0.8;

    animatedHeight.value = withTiming(animationDirection, {
      duration: 500,
      easing: Easing.ease,
    });

    const newTitle = !showAdvice.opened ? 'Voltar' : props.advice.title;
    if (!showAdvice.opened) {
      clearTimeout(timer);
    }
    setShowAdvice({ opened: !showAdvice.opened, title: newTitle, text: showAdvice.text });
  };

  return (
    <Modal
      isVisible={props.isVisible}
      onBackButtonPress={props?.onBackPress}
      onBackdropPress={props?.onBackPress}
      style={{ margin: 0 }}
    >
      <AnimatedContainer animatedProps={containerProps}>
        <AnimatedLine animatedProps={straightLineProps} />
        {props.icon ? (
          <View style={styles.iconView}>
            <Icon name={props.icon?.name} size={100} type={props.icon?.type} color={colors.gray} />
          </View>
        ) : null}

        <TextView style={{ marginBottom: 25 }}>
          <Title>{props.data?.title ? props.data.title : 'TÍTULO'}</Title>
          {props.data?.text ? <Description>{props.data.text}</Description> : null}
        </TextView>

        {props.onPressYes && !showAdvice.opened ? (
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.orange }]}
              activeOpacity={buttonOpacity}
              onPress={() => {
                props.onPressYes();
                clearTimeout(timer);
              }}
            >
              <ButtonText>SIM</ButtonText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.gray }]}
              activeOpacity={buttonOpacity}
              onPress={() => {
                props.onBackPress();
                clearTimeout(timer);
              }}
            >
              <ButtonText>NÃO</ButtonText>
            </TouchableOpacity>
          </View>
        ) : showAdvice.opened ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1.5,
              width: '80%',
              lineHeight: 1.5,
            }}
          >
            <Text style={{ fontFamily: fonts.spartanR, color: colors.text, textAlign: 'center' }}>
              {props.advice.text}
            </Text>
          </View>
        ) : null}

        {props.advice ? (
          <TouchableOpacity
            activeOpacity={buttonOpacity}
            style={{ flex: 0.5, alignItems: 'center' }}
            onPress={heightAnimation}
          >
            <Text
              style={{
                fontFamily: fonts.spartanR,
                color: colors.orange,
                textDecorationLine: 'underline',
              }}
            >
              {showAdvice.title}
            </Text>
          </TouchableOpacity>
        ) : null}
      </AnimatedContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.5,
  },
  buttonView: {
    flex: 0.75,
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
