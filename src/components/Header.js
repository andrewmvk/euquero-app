import React from 'react';
import { TouchableOpacity, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, fonts } from '../defaultStyles';

export default (props) => {
  return (
    <SafeAreaView
      style={[styles.container, { position: props.absolute ? 'absolute' : 'relative' }]}
    >
      <TouchableOpacity {...props} style={styles.arrowBack}>
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
  },
  arrowBack: {
    height: '100%',
    width: 30,
    justifyContent: 'center',
    zIndex: 5,
  },
  text: {
    fontFamily: fonts.spartanR,
    fontSize: 13,
    color: colors.gray,
    marginLeft: 10,
  },
});
