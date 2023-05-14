import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Keyboard,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AddButton, EmptyListMessage } from '../../components/common';
import { auth, db } from '../../services/firebase.config';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { SearchArea, SearchInput, SearchInputText } from './styles';
import EditableCard from '../../components/EditableCard';
import { colors, navBarConfig, shadow } from '../../defaultStyles';

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
    navBarConfig('relative', '#f2f2f2');

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

  const deleteService = async (id) => {
    setIsLoading(true);
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

  const handleDelete = (id, name, creating) => {
    if (!creating) {
      Alert.alert(
        'Confirmação!',
        'Deseja realmente deletar o serviço (' + id + ") - '" + name + "' ?",
        [
          { text: 'Cancelar' },
          { text: 'Confirmar', onPress: () => deleteService(id).then(() => setIsLoading(false)) },
        ],
      );
    } else {
      deleteService(id).then(() => setIsLoading(false));
    }
  };

  return (
    <>
      <DashedCircle />
      <SafeAreaView>
        <Header text={'Administrativo - Serviços'} onPress={() => props.navigation.goBack()} />
      </SafeAreaView>
      <View style={{ alignItems: 'center' }}>
        <SearchArea>
          <SearchInput style={shadow}>
            <SearchInputText
              onSubmitingEdit={() => Keyboard.dismiss()}
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
                    <EditableCard
                      key={item.id}
                      type={'services'}
                      checkId={checkId}
                      itemId={item.id}
                      text={item.name}
                      editing={item.editing}
                      creating={item.creating}
                      navigation={props.navigation}
                      saveNew={saveNewService}
                      deleteItem={() => handleDelete(item.id, item.name, item.creating)}
                    />
                  );
                })}
                <AddButton small relative margin={10} onPress={handleNewCriteria} />
                <View style={{ height: 200 }}/>
              </>
            ) : (
              <EmptyListMessage alterText />
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
};
