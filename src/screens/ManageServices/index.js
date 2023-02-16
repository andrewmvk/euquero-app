import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AddButton, EmptyListMessage } from '../../components/common';
import { auth, db } from '../../services/firebase.config';
import * as NavigationBar from 'expo-navigation-bar';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { SearchArea, SearchInput, SearchInputText } from './styles';
import EditableCard from '../../components/EditableCard';
import { colors, shadow } from '../../defaultStyles';

export default (props) => {
  const [services, setServices] = useState([]);
  const [servicesBackup, setServicesBackup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, 'services'));

    let servicesArray = [];
    querySnapshot.forEach((doc) => {
      const service = {
        id: +doc.id,
        name: doc.data().name,
        editing: false,
        creating: false,
      };
      servicesArray.push(service);
    });

    setServices(servicesArray);
    setServicesBackup(servicesArray);
  };

  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync('relative');
      await NavigationBar.setBackgroundColorAsync('#f2f2f2');
      await NavigationBar.setButtonStyleAsync('dark');
    };
    navBarConfig();

    const unsubscribe = props.navigation.addListener('focus', async () => {
      const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (currentUserSnap.exists()) {
        fetchData().then(() => setIsLoading(false));
      }
    });
    return () => unsubscribe();
  }, []);

  const search = useCallback(
    (t) => {
      if (servicesBackup.length > 0) {
        setIsLoading(true);
        let arr = [...servicesBackup];
        setServices(
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
    },
    [servicesBackup],
  );

  const checkId = (id) => {
    if (isNaN(id)) {
      Alert.alert(
        'Número de ID inválido!',
        'O número de identificação (ID) da diretriz deve ser um número',
      );
      return false;
    } else if (services.some((item) => +item.id === id)) {
      Alert.alert(
        'Número de ID já existe!',
        'O número de identificação (' + id + ') não pode ser duplicado',
      );
      return false;
    } else {
      return true;
    }
  };

  const handleNewCriteria = () => {
    if (services.some((item) => item.id === '')) {
      Alert.alert(
        'Não foi possível adicionar!',
        'Para adicionar um novo serviço é necessário preencher todos os dados do serviço adicionado anteriormente e salvá-los',
      );
    } else {
      setServices([...services, { id: '', name: '', editing: false, creating: true }]);
    }
  };

  const saveNewService = (data) => {
    let servicesArray = services.filter((item) => item.id !== '');
    servicesArray.push(data);
    setServices(servicesArray);
  };

  const deleteCriteria = async (id) => {
    try {
      await deleteDoc(doc(db, 'services', `${id}`)).then(() => {
        const c = services.find((item) => `${item.id}` === `${id}`);
        Alert.alert(
          'Operação realizada com sucesso!',
          'O serviço (' + c.id + ") - '" + c.name + "' foi removido com sucesso",
        );
        setServices(services.filter((item) => `${item.id}` !== `${id}`));
      });
    } catch (err) {
      console.log(
        'An error occurred while trying to delete the service with id "' +
          id +
          '"(maybe it does not exist in the database)',
      );
      setServices(services.filter((item) => `${item.id}` !== `${id}`));
      console.log(err);
    }
  };

  return (
    <>
      <DashedCircle />
      <Header text={'Administrativo - Serviços'} onPress={() => props.navigation.goBack()} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ alignItems: 'center' }}>
          <SearchArea>
            <SearchInput style={shadow}>
              <SearchInputText
                placeholder="Buscar Serviços"
                onChangeText={(t) => search(t)}
                placeholderTextColor="#C4C4C4"
                numberOfLines={1}
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
          </SearchArea>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
          ) : (
            <ScrollView
              style={{ marginTop: 32, marginBottom: 25, width: '100%', zIndex: 0 }}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              {services.length > 0 ? (
                <>
                  <View style={{ height: 5 }} />
                  {services.map((item) => {
                    return (
                      <View key={item.id} style={{ marginBottom: 20 }}>
                        <EditableCard
                          type={'services'}
                          checkId={checkId}
                          itemId={item.id}
                          text={item.name}
                          editing={item.editing}
                          creating={item.creating}
                          navigation={props.navigation}
                          saveNew={saveNewService}
                          deleteItem={() => deleteCriteria(item.id)}
                        />
                      </View>
                    );
                  })}
                </>
              ) : (
                <EmptyListMessage alterText />
              )}
              {services.length > 0 ? (
                <AddButton small relative margin={10} onPress={handleNewCriteria} />
              ) : null}
            </ScrollView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
