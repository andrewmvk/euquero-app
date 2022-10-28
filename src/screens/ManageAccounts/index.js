import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Switch } from 'react-native';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase.config';

import { Container, SwitchView } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { colors, buttonOpacity } from '../../defaultStyles';
import { AddButton, Card, List } from '../../components/common';
import Modal from '../../components/Modal';

export default (props) => {
  const [accounts, setAccounts] = useState([]);
  const [modalData, setModalData] = useState({
    title: '',
    text: '',
    iconName: '',
    iconType: '',
    advice: {
      title: 'A conta não será excluída...',
      text: 'Toda conta que estiver desativada não será excluída completamente. O usuário, ao tentar acessá-la, receberá um aviso de que a conta está desativada e que, caso persista em acessá-la (3 vezes), esta será excluída por completo.',
    },
  });
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    let list = [];
    try {
      const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (currentUserSnap.data().isAdmin) {
        const querySnapshot = await getDocs(collection(db, 'users'));

        querySnapshot.forEach((doc) => {
          if (doc.data().email != auth.currentUser.email) {
            list.push({ id: doc.id, ...doc.data() });
          }
        });

        list.sort((a, b) => {
          return a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1;
        });
        setAccounts(list);
      } else {
        console.log('This account does not have a admin permission to access other accounts');
      }
    } catch (err) {
      console.log('Something went wront while trying to access database accounts');
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (props.route.params?.newUser) {
      setIsLoading(true);
      const title = 'Conta cadastrada com sucesso';
      const text = props.route.params.newUser.email;
      const icon = { name: 'check', type: 'material-community' };
      setModalData({ title, text, iconName: icon.name, iconType: icon.type, advice: null });
      setSelectedUser(null);
      toggleModal();

      setAccounts([props.route.params.newUser, ...accounts]);
      setIsLoading(false);
    }
  }, [props.route.params?.newUser]);

  const enableDisableAccount = async () => {
    try {
      await updateDoc(doc(db, 'users', selectedUser.id), {
        disabled: !selectedUser.disabled,
        maximumAcessAttempts: !selectedUser.disabled ? 3 : null,
      }).then(() => {
        const filteredData = accounts.filter((item) => item.id !== selectedUser.id);
        selectedUser.disabled = !selectedUser.disabled;
        if (selectedUser.disabled) {
          setAccounts([...filteredData, selectedUser]);
        } else {
          setAccounts([selectedUser, ...filteredData]);
        }
        setSelectedUser(null);
      });
    } catch (err) {
      console.log('Erro while trying to disable/enable account in the database');
      console.log(err);
    }
  };

  function enableDisableAccountModal(account) {
    let title = 'Deseja mesmo ';
    let iconData = {};

    if (account.disabled) {
      title += 'REATIVAR esta conta ?';
      iconData = { name: 'account-reactivate', type: 'material-community' };
    } else {
      title += 'DESATIVAR esta conta ?';
      iconData = {
        name: 'close-circle-outline',
        type: 'material-community',
      };
    }

    setModalData({
      title,
      text: account.email,
      iconName: iconData.name,
      iconType: iconData.type,
      advice: {
        title: 'A conta não será excluída...',
        text: 'Toda conta que estiver desativada não será excluída completamente. O usuário, ao tentar acessá-la, receberá um aviso de que a conta está desativada e que, caso persista em acessá-la (3 vezes), esta será excluída por completo.',
      },
    });
    toggleModal();
    setSelectedUser(account);
  }

  function onPressYes() {
    toggleModal();
    enableDisableAccount();
  }

  function toggleModal() {
    setModalVisibility(!modalVisibility);
  }

  const card = ({ item }) => {
    return (
      <Card
        value={item.id}
        key={item.id}
        text={item.email}
        color={item.disabled ? colors.gray : colors.orange}
        textWidth={0.65}
      >
        <SwitchView onPress={() => enableDisableAccountModal(item)} activeOpacity={buttonOpacity}>
          <Switch
            trackColor={{ false: colors.gray, true: colors.orange }}
            thumbColor={item.disabled ? colors.gray : colors.orange}
            value={!item.disabled}
            disabled={true}
          />
        </SwitchView>
      </Card>
    );
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - Contas'} onPress={() => props.navigation.goBack()} />
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <List data={accounts} onRefresh={fetchData} card={card} />
        )}
      </Container>
      <AddButton onPress={() => props.navigation.navigate('RegisterAccounts')} />
      <Modal
        isVisible={modalVisibility}
        onPressYes={selectedUser ? onPressYes : null}
        onBackPress={toggleModal}
        icon={{ name: modalData.iconName, type: modalData.iconType }}
        data={{ title: modalData.title, text: modalData.text }}
        advice={modalData.advice}
      />
    </>
  );
};
