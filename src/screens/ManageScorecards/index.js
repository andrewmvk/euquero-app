import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { AddButton, EmptyListMessage } from '../../components/common';
import { colors, navBarConfig, shadow } from '../../defaultStyles';
import { Container, SearchArea, SearchInput, SearchInputText } from './styles';
import EditableCard from '../../components/EditableCard';
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../services/firebase.config';
import { View } from 'react-native';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState([]);
  const [criteriaBackup, setCriteriaBackup] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, 'diretriz'));

    let criteriaArray = [];
    querySnapshot.forEach((doc) => {
      const criteria = {
        id: doc.data().id,
        name: doc.data().name,
        editing: false,
        creating: false,
      };
      criteriaArray.push(criteria);
    });

    setCriteria(criteriaArray);
    setCriteriaBackup(criteriaArray);
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
      if (criteriaBackup.length > 0) {
        setIsLoading(true);
        let arr = [...criteriaBackup];
        setCriteria(
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
    [criteriaBackup],
  );

  const deleteCriteria = async (id) => {
    setIsLoading(true);
    try {
      const scorecardsQuery = query(collection(db, 'scorecards'), where('criteriaId', '==', +id));

      const scorecardsSnapshot = await getDocs(scorecardsQuery);

      const promises = scorecardsSnapshot.docs.map(async (data) => {
        const ubsScorecardsQuery = query(
          collection(db, 'ubsScorecards'),
          where('scorecard', '==', +data.id),
        );

        const ubsScorecardsSnapshot = await getDocs(ubsScorecardsQuery);

        const innerPromises = ubsScorecardsSnapshot.docs.map(async (data) => {
          await deleteDoc(doc(db, 'ubsScorecards', data.id.toString()));
        });

        await Promise.all(innerPromises).then(async () => {
          await deleteDoc(doc(db, 'scorecards', data.id.toString()));
        });
      });

      await Promise.all(promises).then(async () => {
        await deleteDoc(doc(db, 'diretriz', `${id}`)).then(() => {
          const c = criteria.find((item) => `${item.id}` === `${id}`);
          Alert.alert(
            'Operação realizada com sucesso!',
            'A diretriz (' + c.id + ") - '" + c.name + "' foi removida com sucesso",
          );
          setCriteria(criteria.filter((item) => `${item.id}` !== `${id}`));
        });
      });
    } catch (err) {
      console.log(
        'An error occurred while trying to delete the criteria with id "' +
          id +
          '" (maybe it does not exist in the database)',
      );
      setCriteria(criteria.filter((item) => `${item.id}` !== `${id}`));
      console.log(err);
    }
  };

  const handleDelete = (id, name, creating) => {
    if (!creating) {
      Alert.alert(
        'Confirmação!',
        'Deseja realmente deletar a diretriz (' + id + ") - '" + name + "' ?",
        [
          { text: 'Cancelar' },
          { text: 'Confirmar', onPress: () => deleteCriteria(id).then(() => setIsLoading(false)) },
        ],
      );
    } else {
      deleteCriteria(id).then(() => setIsLoading(false));
    }
  };

  const checkId = (id) => {
    if (isNaN(id) || +id < 11 || +id > 39) {
      Alert.alert(
        'Número de ID inválido!',
        'O número de identificação (ID) da diretriz deve ser um número que obedeça os limites deste tipo de identificador (11-39)',
      );
      return false;
    } else if (criteria.some((item) => +item.id === id)) {
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
    if (criteria.some((item) => item.id === '')) {
      Alert.alert(
        'Não foi possível adicionar!',
        'Para adicionar uma nova diretriz é necessário preencher todos os dados da diretriz adicionada anteriormente e salvá-los',
      );
    } else {
      setCriteria([...criteria, { id: '', name: '', editing: false, creating: true }]);
    }
  };

  const saveNewCriteria = (data) => {
    let criteriasArray = criteria.filter((item) => item.id !== '');
    criteriasArray.push(data);
    setCriteria(criteriasArray);
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - Indicadores'} onPress={() => props.navigation.goBack()} />
        <SearchArea>
          <SearchInput style={{ ...shadow }}>
            <SearchInputText
              onSubmitingEdit={() => Keyboard.dismiss()}
              placeholder="Buscar Indicador"
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
            style={{
              marginTop: 32,
              marginBottom: 25,
              width: '100%',
              zIndex: 0,
            }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {criteria.length > 0 ? (
              <>
                <View style={{ height: 5 }} />
                {criteria.map((item) => {
                  return (
                    <EditableCard
                      type={'diretriz'}
                      checkId={checkId}
                      itemId={item.id}
                      key={item.id}
                      text={item.name}
                      editing={item.editing}
                      creating={item.creating}
                      navigation={props.navigation}
                      saveNew={saveNewCriteria}
                      deleteItem={() => handleDelete(item.id, item.name, item.creating)}
                    />
                  );
                })}
                <AddButton small relative onPress={handleNewCriteria} />
              </>
            ) : (
              <EmptyListMessage alterText />
            )}
          </ScrollView>
        )}
      </Container>
    </>
  );
};
