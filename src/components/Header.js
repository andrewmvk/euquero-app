import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, fonts, buttonOpacity } from '../defaultStyles';

export default props => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          position: props.position,
          marginTop: props.margin
            ? props.margin + 15
            : Platform.OS == 'ios'
            ? 15
            : '12%'
        }
      ]}
    >
      <TouchableOpacity
        {...props}
        activeOpacity={buttonOpacity}
        style={styles.arrowBack}
      >
        <Icon
          name="chevron-back-outline"
          type="ionicon"
          color={props.color ? props.color : colors.orange}
        />
      </TouchableOpacity>
      {props.text ? (
        <Text style={styles.text} numberOfLines={1}>{`${props.text}`}</Text>
      ) : null}
      {props.children ? props.children : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5
  },
  arrowBack: {
    height: '100%',
    width: 30,
    justifyContent: 'center'
  },
  text: {
    fontFamily: fonts.spartanBold,
    fontSize: 13,
    color: colors.gray,
    marginLeft: 10,
    flex: 4
  }
});
