import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

import { Container, TrashIcon, SearchInput, SearchInputText, SearchArea } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { AddButton, buttonOpacity, Card, colors } from '../../defaultStyles';
import Modal from '../../components/Modal';

export default (props) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalData, setModalData] = useState({ title: '', text: '', iconName: '', iconType: '' });
  const [selectedUbs, setSelectedUbs] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [ubs, setUbs] = useState([]);
  const [ubsBackup, setUbsBackup] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let list = [];
      try {
        const ubsQuerySnapshot = await getDocs(collection(db, 'ubs'));

        ubsQuerySnapshot.forEach((ubs) => {
          list.push({ id: ubs.id, ...ubs.data() });
        });
        setUbs(list);
        setUbsBackup(list);
      } catch (err) {
        console.log('Something went wrong while trying to fetch data');
        console.log(err);
      }
    };

    fetchData().then(() => setIsLoading(false));
  }, []);

  const deleteUbs = () => {
    const filteredData = ubs.filter((ubs) => ubs.id !== selectedUbs.id);
    setUbs(filteredData);
    setSelectedUbs(null);
  };

  function deleteUbsModal(item) {
    setSelectedUbs(item);
    const title = 'Deseja mesmo EXCLUIR esta UBS ?';
    const text = item.name;
    const iconData = { name: 'trash-can-outline', type: 'material-community' };
    setModalData({ title, text, iconName: iconData.name, iconType: iconData.type });
    toggleModal();
  }

  function onPressYes() {
    toggleModal();
    deleteUbs();
  }

  function toggleModal() {
    setModalVisibility(!modalVisibility);
  }

  const search = (t) => {
    let arr = [...ubsBackup];
    setUbs(
      arr.filter((d) =>
        d.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            t
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase(),
          ),
      ),
    );
  };

  const cards = ({ item }) => {
    return (
      <Card value={item.id} key={item.id} text={item.name} color={colors.orange}>
        <TrashIcon activeOpacity={buttonOpacity} onPress={() => deleteUbsModal(item)}>
          <Icon name="trash-can-outline" size={35} type="material-community" color="#c4c4c4" />
        </TrashIcon>
      </Card>
    );
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - UBS'} onPress={() => props.navigation.goBack()} />
        <SearchArea>
          <SearchInput>
            <SearchInputText placeholder="Buscar UBS" onChangeText={(t) => search(t)} />
            <Icon
              name="search-outline"
              type="ionicon"
              color="#c4c4c4"
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}
            />
          </SearchInput>
          <TouchableOpacity>
            <Icon
              name="order-alphabetical-ascending"
              type="material-community"
              color={colors.gray}
              size={32}
              style={{ marginTop: 45, marginLeft: 25 }}
            />
          </TouchableOpacity>
        </SearchArea>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            style={{ marginTop: 32, marginBottom: 25, width: '100%' }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={ubs}
            renderItem={cards}
            keyExtractor={(item) => item.id}
          />
        )}
      </Container>
      <AddButton onPress={() => props.navigation.navigate('RegisterUBS')} />
      <Modal
        isVisible={modalVisibility}
        onPressYes={selectedUbs ? onPressYes : null}
        onBackPress={toggleModal}
        icon={{ name: modalData.iconName, type: modalData.iconType }}
        data={{ title: modalData.title, text: modalData.text }}
      />
    </>
  );
};
