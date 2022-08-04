import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';

import { buttonOpacity, colors } from '../../defaultStyles';
import { ButtonText, Description, TextView, Title } from './styles';

export default (props) => {
  const deviceHeight = Dimensions.get('window').height;
  const defaultHeight = deviceHeight * 0.35;
  let modalContainerHeight = defaultHeight;

  if (props.children) {
    modalContainerHeight = deviceHeight * 0.5;
  } else if (props.onPressYes) {
    modalContainerHeight = deviceHeight * 0.45;
  }

  return (
    <Modal
      isVisible={props.isVisible}
      onBackButtonPress={props?.onBackPress}
      onBackdropPress={props?.onBackPress}
      style={{ margin: 0 }}
    >
      <View style={[styles.container, { height: modalContainerHeight }]}>
        <View style={styles.straightLine} />
        {props.icon ? (
          <View style={styles.iconView}>
            <Icon name={props.icon?.name} size={90} type={props.icon?.type} color={colors.gray} />
          </View>
        ) : null}

        <TextView>
          <Title>{props?.data?.title ? props?.data.title : 'TÍTULO'}</Title>
          {props?.data?.text ? <Description>{props?.data.text}</Description> : null}
        </TextView>

        {props.onPressYes ? (
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.orange }]}
              activeOpacity={buttonOpacity}
              onPress={() => props.onPressYes()}
            >
              <ButtonText>SIM</ButtonText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.gray }]}
              activeOpacity={buttonOpacity}
              onPress={() => props.onBackPress()}
            >
              <ButtonText>NÃO</ButtonText>
            </TouchableOpacity>
          </View>
        ) : null}

        {props.children ? props.children : null}
      </View>
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
  straightLine: {
    backgroundColor: colors.orange,
    height: 5,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.75,
  },
  buttonView: {
    flex: 0.75,
    width: '75%',
    flexDirection: 'row',
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
