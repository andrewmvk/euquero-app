import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase.config';

import { Container, TrashIcon } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { AddButton, buttonOpacity, Card, colors } from '../../defaultStyles';
import Modal from '../../components/Modal';

export default (props) => {
  const [accounts, setAccounts] = useState([]);
  const [modalData, setModalData] = useState({ email: '', type: '' });
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));

        querySnapshot.forEach((doc) => {
          if (doc.data().email != auth.currentUser.email) {
            list.push({ id: doc.id, ...doc.data() });
          }
        });

        setAccounts(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const disableAccount = async (user) => {
    try {
      await updateDoc(doc(db, 'users', user.id), {
        disabled: !user.disabled,
      }).then(() => {
        const filteredData = accounts.filter((item) => item.id !== user.id);
        user.disabled = !user.disabled;
        if (user.disabled) {
          setAccounts([...filteredData, user]);
        } else {
          setAccounts([user, ...filteredData]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  function dataModal(user) {
    setModalData({ ...user, type: 'delete' });
    toggleModal();
  }

  function onPressYes(user) {
    toggleModal();
    disableAccount(user);
  }

  function toggleModal() {
    setModalVisibility(!modalVisibility);
  }

  const stateCard = ({ item }) => {
    return (
      <Card
        value={item.id}
        key={item.id}
        text={item.email}
        color={item.disabled ? colors.gray : colors.orange}
      >
        <TrashIcon activeOpacity={buttonOpacity} onPress={() => dataModal(item)}>
          <Icon
            name={item.disabled ? 'account-reactivate' : 'trash-can-outline'}
            size={35}
            type="material-community"
            color={item.disabled ? colors.orange : colors.gray}
          />
        </TrashIcon>
      </Card>
    );
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - Contas'} onPress={() => props.navigation.goBack()} />
        <FlatList
          style={{ marginTop: 45, marginBottom: 25 }}
          data={accounts}
          renderItem={stateCard}
          keyExtractor={(item) => item.id}
        />
      </Container>
      <AddButton onPress={() => props.navigation.navigate('RegisterAccounts')} />
      <Modal
        isVisible={modalVisibility}
        params={modalData}
        onPress={toggleModal}
        onPressYes={onPressYes}
      />
    </>
  );
};
