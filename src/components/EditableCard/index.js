import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, TextInput, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { buttonOpacity, colors, fonts, fontSizeNoUnits } from '../../defaultStyles';
import { Description, Icons, TouchableCard, TouchableIcon } from './styles';

const AnimatedView = Animated.createAnimatedComponent(View);

export default (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState(props.text);
  const [itemDescription, setItemDescription] = useState(props.description);

  const screenWidth = Dimensions.get('window').width;

  const animatedHeight = useSharedValue(10);

  const viewProps = useAnimatedProps(() => {
    return {
      height: animatedHeight.value,
      width: screenWidth * 0.8,
      style: {
        backgroundColor: '#fff',
        marginBottom: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
    };
  }, [isEditing]);

  const increaseHeight = () => {
    setIsEditing(!isEditing);
    animatedHeight.value = withSpring(!isEditing ? 150 : 10);
  };

  const cardShadow = {
    distance: 2,
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
    containerViewStyle: {
      height: 70,
      width: screenWidth * 0.85,
      zIndex: 3,
    },
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Shadow {...cardShadow}>
        <TouchableCard
          activeOpacity={buttonOpacity}
          onPress={props.onPress ? props.onPress : null}
          disabled={props.onPress === undefined ? true : false}
        >
          {isEditing ? (
            <TextInput
              style={[styles.title, { textDecorationLine: 'underline' }]}
              numberOfLines={1}
              value={itemName}
              placeholder="Nome"
              onChangeText={setItemName}
            />
          ) : (
            <Text style={styles.title} numberOfLines={1}>
              {itemName}
            </Text>
          )}

          <Icons>
            <TouchableIcon activeOpacity={buttonOpacity} onPress={increaseHeight}>
              <Icon
                name={isEditing ? 'check' : 'pencil-outline'}
                size={35}
                type="material-community"
                color={colors.gray}
              />
            </TouchableIcon>
            <TouchableIcon activeOpacity={buttonOpacity}>
              <Icon
                name="trash-can-outline"
                size={35}
                type="material-community"
                color={colors.gray}
              />
            </TouchableIcon>
          </Icons>
        </TouchableCard>
      </Shadow>
      <AnimatedView animatedProps={viewProps}>
        {isEditing ? (
          <Description
            multiline
            value={itemDescription}
            placeholder="Descrição"
            onChangeText={setItemDescription}
          />
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
    marginLeft: 22,
    color: colors.text,
    flex: 2,
  },
});
