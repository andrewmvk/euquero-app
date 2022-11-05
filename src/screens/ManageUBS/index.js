import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../services/firebase.config';

import { Container, TrashIcon, SearchInput, SearchInputText, SearchArea } from './styles';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import DashedCircle from '../../components/DashedCircle';
import { AddButton, Card, DropdownSelection, List } from '../../components/common';
import { buttonOpacity, colors } from '../../defaultStyles';
import axios from 'axios';
import { Shadow } from 'react-native-shadow-2';

export default (props) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    text: '',
    iconName: '',
    iconType: '',
  });
  const [selectedUbs, setSelectedUbs] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [ubs, setUbs] = useState([]);
  const [ubsBackup, setUbsBackup] = useState([]);

  const [dropdownState, setDropdownState] = useState({
    items: [],
    selected: 'Estado',
    value: -1,
    disabled: true,
  });

  const [dropdownCity, setDropdownCity] = useState({
    items: [],
    selected: 'Cidade',
    value: -1,
    disabled: true,
  });

  const [currentUser, setCurrentUser] = useState(false);

  //One time useEffect to load brazilian States
  useEffect(() => {
    const fetchStateData = async () => {
      setIsLoading(true);
      try {
        const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
        setCurrentUser(currentUserSnap.exists());
        if (currentUserSnap.exists()) {
          const ubsAmountSnap = await getDocs(collection(db, 'ubsAmountStates'));

          const response = await axios.get(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
          );

          let statesArray = [];
          for (i = 0; i < response.data.length; i++) {
            let stateObject = {
              id: response.data[i].id,
              name: response.data[i].nome,
              ubsAmount: 0,
            };

            const index = ubsAmountSnap.docs.findIndex((state) => {
              return +state.id === response.data[i].id;
            });
            if (index !== -1) {
              stateObject.ubsAmount = ubsAmountSnap.docs[index].data().amount;
            }

            statesArray.push(stateObject);
          }

          statesArray.sort((a, b) =>
            a.ubsAmount > b.ubsAmount ? -1 : b.ubsAmount > a.ubsAmount ? 1 : 0,
          );

          setDropdownState({
            ...dropdownState,
            items: statesArray,
            disabled: false,
          });
        }
      } catch (err) {
        console.log('Something went wrong while trying to fetch data from database or State API.');
        console.log(err);
      }
    };

    fetchStateData().then(() => setIsLoading(false));
  }, []);

  //City useEffect, load every time a new State is selected
  useEffect(() => {
    if (dropdownState.value != -1 && currentUser) {
      setIsLoading(true);
      setDropdownCity({
        items: [],
        selected: 'Cidade',
        value: -1,
        disabled: true,
      });
      const fetchCityData = async () => {
        try {
          const response = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dropdownState.value}/municipios`,
          );

          const ubsAmountSnap = await getDocs(collection(db, 'ubsAmountCities'));

          let citiesArray = [];
          for (i = 0; i < response.data.length; i++) {
            const cityIDSlice = response.data[i].id.toString().slice(0, -1);
            const cityID = +cityIDSlice;

            let cityObject = {
              id: cityID,
              name: response.data[i].nome,
              ubsAmount: 0,
            };
            const index = ubsAmountSnap.docs.findIndex((city) => {
              return +city.id === cityID;
            });
            if (index !== -1) {
              cityObject.ubsAmount = ubsAmountSnap.docs[index].data().amount;
            }
            citiesArray.push(cityObject);
          }

          citiesArray.sort((a, b) =>
            a.ubsAmount > b.ubsAmount ? -1 : b.ubsAmount > a.ubsAmount ? 1 : 0,
          );

          setDropdownCity({
            items: citiesArray,
            selected: 'Cidade',
            value: -1,
            disabled: false,
          });
        } catch (err) {
          console.log('Something went wrong while trying to fetch data from Cities API.');
          console.log(err);
        }
      };

      fetchCityData().then(() => setIsLoading(false));
    }
  }, [dropdownState.selected]);

  //UBS useEffect, load every time a new city is selected
  const fetchData = async () => {
    let list = [];
    try {
      if (currentUser) {
        const cityID = dropdownCity.value;
        const ubsQuery = query(collection(db, 'ubs'), where('city', '==', cityID));
        const ubsSnapshot = await getDocs(ubsQuery);

        for (i = 0; i < ubsSnapshot.docs.length; i++) {
          list.push({
            id: ubsSnapshot.docs[i].id,
            ...ubsSnapshot.docs[i].data(),
          });
        }

        setUbs(list);
        setUbsBackup(list);
      }
    } catch (err) {
      console.log('Something went wrong while trying to fetch UBS data');
      console.log(err);
    }
  };

  useEffect(() => {
    if (dropdownCity.value != -1) {
      setIsLoading(true);
      fetchData().then(() => setIsLoading(false));
    } else {
      setUbs([]);
      setUbsBackup([]);
    }
  }, [dropdownCity.selected]);

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
    setModalData({
      title,
      text,
      iconName: iconData.name,
      iconType: iconData.type,
    });
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
    if (ubsBackup.length > 0) {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const card = ({ item }) => {
    return (
      <Card value={item.id} key={item.id} text={item.name} color={colors.orange} textWidth={0.65}>
        <TrashIcon activeOpacity={buttonOpacity} onPress={() => deleteUbsModal(item)}>
          <Icon name="trash-can-outline" size={35} type="material-community" color={colors.gray} />
        </TrashIcon>
      </Card>
    );
  };

  const searchBoxShadow = {
    distance: 2,
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - UBS'} onPress={() => props.navigation.goBack()} />
        <SearchArea>
          <Shadow
            {...searchBoxShadow}
            containerViewStyle={{
              height: 55,
              marginTop: 45,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <SearchInput pointerEvents={dropdownCity.value == -1 ? 'none' : 'auto'}>
              <SearchInputText
                placeholder="Buscar UBS"
                numberOfLines={1}
                placeholderTextColor="#C4C4C4"
                onChangeText={(t) => search(t)}
              />
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
          </Shadow>
        </SearchArea>
        <SearchArea style={{ justifyContent: 'space-between', marginTop: 20 }}>
          <DropdownSelection
            dropdownContainerStyle={{ paddingTop: 12 }}
            style={{ zIndex: 2 }}
            data={dropdownState}
            onSelect={setDropdownState}
            containerStyle={{ width: '45%' }}
            disabled={dropdownState.disabled}
          />
          <DropdownSelection
            dropdownContainerStyle={{ paddingTop: 12 }}
            style={{ zIndex: 2 }}
            data={dropdownCity}
            onSelect={setDropdownCity}
            containerStyle={{ width: '45%' }}
            disabled={dropdownCity.disabled}
          />
        </SearchArea>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <List data={ubs} onRefresh={fetchData} card={card} />
        )}
      </Container>
      <AddButton onPress={() => props.navigation.navigate('UploadUBSTable')} />
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
