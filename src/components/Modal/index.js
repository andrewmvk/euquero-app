import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';

import { colors, buttonOpacity } from '../../defaultStyles';
import { ButtonText, ContainerIn, Name, ObservationText, Title, TouchableText } from './styles';

export default (props) => {
  const [obsModalVisibility, setObsModalVisibility] = useState(false);

  const params = props.params ? props.params : { name: '', type: '' };
  const deviceHeight = Dimensions.get('window').height;

  let modalHeight = 0;
  let iconName = '';
  let text = '';
  if (params.type === 'add') {
    modalHeight = 0.35 * deviceHeight;
    iconName = 'check';
    text = 'Conta cadastrada com sucesso!';
  } else if (params.type != 'advice') {
    modalHeight = 0.5 * deviceHeight;
    if (params.disabled) {
      iconName = 'account-reactivate';
      text = 'Deseja mesmo REATIVAR esta conta?';
    } else {
      iconName = 'trash-can-outline';
      text = 'Deseja mesmo DESATIVAR esta conta?';
    }
  }

  const adminAdvice =
    'A conta NÃO será completamente excluída e sim desativada! Um aviso será exibido dizendo que a conta está desativada e inacessível e, caso a pessoa pesista em acessá-la, a conta será permanentemente excluída! Você, como administrador, pode reativá-la a qualquer momento.';

  function toggleModalVisibility() {
    setObsModalVisibility(!obsModalVisibility);
  }

  const accountDisabledAdvice = () => {
    const accountAdvice =
      params?.type === 'disabledAccountAdvice' || params?.type === 'deletedAccountAdvice'
        ? params.type
        : false;

    const closeModal = accountAdvice ? () => props.onPress() : toggleModalVisibility;

    return (
      <Modal
        isVisible={accountAdvice ? props.isVisible : obsModalVisibility}
        onBackdropPress={() => closeModal()}
        onBackButtonPress={() => closeModal()}
      >
        <View style={[styles.observationModal, { height: modalHeight * 0.6 }]}>
          <View style={{ flex: 3, width: '95%', justifyContent: 'center' }}>
            <ObservationText>
              {params?.type === 'disabledAccountAdvice'
                ? 'AVISO! Esta conta foi desativada por um administrador e está inacessível. Até o momento da reativação por um administrador, você não poderá acessar esta conta e, caso persista por mais ' +
                  params?.maximumAcessAttempts +
                  ' tentativas, a conta será permanentemente excluída.'
                : params?.type === 'deletedAccountAdvice'
                ? 'Conta deletada permanentemente por excessivas tentativas de acesso após avisos de ter sido desativada por um administrador!'
                : adminAdvice}
            </ObservationText>
          </View>
          <View style={{ flex: 1, marginTop: 10, justifyContent: 'center' }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.gray }]}
              onPress={() => closeModal()}
              activeOpacity={buttonOpacity}
            >
              <ButtonText>OK!</ButtonText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  if (params?.type != 'disabledAccountAdvice' && params?.type != 'deletedAccountAdvice') {
    return (
      <Modal
        isVisible={props.isVisible}
        onBackButtonPress={() => props.onPress()}
        onBackdropPress={() => props.onPress()}
        style={{ margin: 0 }}
      >
        <View style={[styles.container, { height: modalHeight }]}>
          <View style={styles.lineBar} />
          <ContainerIn>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Icon name={iconName} size={90} type="material-community" color={colors.gray} />
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'space-evenly' }}>
              <Title>{text}</Title>
              <Name>{params.email ? params.email : 'EMAIL'}</Name>
            </View>

            {params.type != 'add' ? (
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.orange }]}
                  activeOpacity={buttonOpacity}
                  onPress={() => props.onPressYes(props.params)}
                >
                  <ButtonText>SIM</ButtonText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.gray }]}
                  activeOpacity={buttonOpacity}
                  onPress={() => props.onPress()}
                >
                  <ButtonText>NÃO</ButtonText>
                </TouchableOpacity>
              </View>
            ) : null}

            {params.type != 'add' && !params.disabled ? (
              <TouchableOpacity
                activeOpacity={buttonOpacity}
                style={{ marginTop: '10%', justifyContent: 'center', alignItems: 'center' }}
                onPress={toggleModalVisibility}
              >
                <TouchableText>OBS.: A conta não será excluida...</TouchableText>
              </TouchableOpacity>
            ) : null}
          </ContainerIn>
          {accountDisabledAdvice()}
        </View>
      </Modal>
    );
  } else {
    return accountDisabledAdvice();
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
  },
  lineBar: {
    backgroundColor: colors.orange,
    height: 5,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  buttonView: {
    flex: 1,
    marginTop: 20,
    width: '75%',
    alignItems: 'center',
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
  observationModal: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
