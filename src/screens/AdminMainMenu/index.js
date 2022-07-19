import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { auth } from '../../services/firebase.config';

import { Container, ManageTouchableBox, ManageBoxShadow, ManageText } from './styles';
import Modal from '../../components/Modal';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { buttonOpacity, colors } from '../../defaultStyles';

export default (props) => {
  const [modalData, setModalData] = useState({ email: '', type: '' });
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    if (props.route.params.newUser) {
      setModalData(props.route.params.newUser);
      toggleModal();
    }
  }, [props.route.params.newUser]);

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        props.navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleModal() {
    setModalVisibility(!modalVisibility);
  }

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={"Administrativo"} onPress={handleSignOut} />

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          {props.route.params.isAdmin ? (
            <Shadow {...ManageBoxShadow}>
              <ManageTouchableBox
                activeOpacity={buttonOpacity}
                onPress={() => props.navigation.navigate('ManageAccounts')}
              >
                <Icon name="account-cog" size={70} type="material-community" color={colors.gray} />
                <ManageText>Gerenciar Contas</ManageText>
              </ManageTouchableBox>
            </Shadow>
          ) : null}

          <Shadow {...ManageBoxShadow}>
            <ManageTouchableBox activeOpacity={buttonOpacity}>
              <Icon name="bank" size={70} type="material-community" color={colors.gray} />
              <ManageText>Gerenciar UBS</ManageText>
            </ManageTouchableBox>
          </Shadow>

          <Shadow {...ManageBoxShadow}>
            <ManageTouchableBox activeOpacity={buttonOpacity}>
              <Icon
                name="file-upload"
                size={70}
                type="material-community"
                color="#c4c4c4"
              />
              <ManageText>Cadastrar UBS</ManageText>
            </ManageTouchableBox>
          </Shadow>
        </View>
      </Container>
      <Modal isVisible={modalVisibility} params={modalData} onPress={toggleModal} />
    </>
  );
};
