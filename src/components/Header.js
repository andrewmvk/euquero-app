import React from 'react';
import { TouchableOpacity, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, fonts, buttonOpacity } from '../defaultStyles';

export default (props) => {
  return (
    <SafeAreaView
      style={[styles.container, { position: props.absolute ? 'absolute' : 'relative' }]}
    >
      <TouchableOpacity {...props} activeOpacity={buttonOpacity} style={styles.arrowBack}>
        <Icon
          name="chevron-back-outline"
          type="ionicon"
          color={props.color ? props.color : colors.orange}
        />
      </TouchableOpacity>
      {props.text ? <Text style={styles.text}>{`${props.text}`}</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: '100%',
    marginTop: 50,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
  },
  arrowBack: {
    height: '100%',
    width: 30,
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.spartanR,
    fontSize: 13,
    color: colors.gray,
    marginLeft: 10,
  },
});
