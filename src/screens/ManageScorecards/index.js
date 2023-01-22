import React, { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Shadow } from 'react-native-shadow-2';

import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { AddButton, EmptyListMessage } from '../../components/common';
import { colors } from '../../defaultStyles';
import { Container, SearchArea, SearchInput, SearchInputText } from './styles';
import EditableCard from '../../components/EditableCard';
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../services/firebase.config';

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
    const unsubscribe = props.navigation.addListener('focus', async () => {
      //const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
      //if (currentUserSnap.exists()) {
      fetchData().then(() => setIsLoading(false));
      //}
    });
    return () => unsubscribe();
  }, []);

  const searchBoxShadow = {
    distance: 2,
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
  };

  const search = (t) => {
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
  };

  const deleteCriteria = async (id) => {
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
        await deleteDoc(doc(db, 'diretriz', `${id}`));
        setCriteria(criteria.filter((item) => `${item.id}` !== `${id}`));
      });
    } catch (err) {
      console.log('An error occurred while trying to delete the criteria with id"' + id + '"');
      setCriteria(criteria.filter((item) => `${item.id}` !== `${id}`));
      console.log(err);
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

  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo - Indicadores'} onPress={() => props.navigation.goBack()} />
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
            <SearchInput>
              <SearchInputText
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
          </Shadow>
        </SearchArea>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <ScrollView
            style={{ marginTop: 32, marginBottom: 25, width: '100%', zIndex: 0 }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {criteria.length > 0 ? (
              criteria.map((item) => {
                return (
                  <EditableCard
                    checkId={checkId}
                    itemId={item.id}
                    key={item.id}
                    text={item.name}
                    editing={item.editing}
                    creating={item.creating}
                    navigation={props.navigation}
                    deleteItem={() => deleteCriteria(item.id)}
                  />
                );
              })
            ) : (
              <EmptyListMessage alterText />
            )}
            <AddButton small relative onPress={handleNewCriteria} />
          </ScrollView>
        )}
      </Container>
    </>
  );
};
