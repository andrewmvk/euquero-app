import React, { useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Dimensions, View, StyleSheet, TextInput, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';

import { buttonOpacity, colors, fonts, fontSizeNoUnits, shadow } from '../../defaultStyles';
import { db } from '../../services/firebase.config';
import { TouchableCard, TouchableIcon, TouchableInnerCard } from './styles';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { AddButton } from '../common';

const AnimatedView = Animated.createAnimatedComponent(View);

export default (props) => {
  const [isCreating, setIsCreating] = useState(props.creating);
  const [isLoading, setIsLoading] = useState(false);
  const [itemData, setItemData] = useState({
    id: props.itemId,
    name: props.text,
    isEditing: false,
  });
  const [innerScorecards, setInnerScorecards] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const category = props?.type === 'services' ? 'O serviço' : 'A diretriz';

  const animatedHeight = useSharedValue(10);

  const viewProps = useAnimatedProps(() => {
    return {
      height: animatedHeight.value,
      width: screenWidth * 0.8,
      style: {
        backgroundColor: '#fff',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
    };
  }, [itemData.isEditing]);

  const increaseDecreaseHeight = async () => {
    setItemData({ ...itemData, isEditing: !itemData.isEditing });

    let scorecardsArrayLength = 0;
    if (innerScorecards.length == 0 && !itemData.isEditing && props?.type !== 'services') {
      setIsLoading(true);
      const criteriaScorecards = query(
        collection(db, 'scorecards'),
        where('criteriaId', '==', +itemData.id),
      );

      const scorecardsSnapshot = await getDocs(criteriaScorecards);

      const innerScorecardsArray = [];
      scorecardsSnapshot.forEach((scorecard) => {
        const scorecardObject = {
          criteriaId: +itemData.id,
          id: +scorecard.id,
          description: scorecard.data().description,
          name: scorecard.data().name,
        };
        innerScorecardsArray.push(scorecardObject);
      });
      scorecardsArrayLength = innerScorecardsArray.length;

      setInnerScorecards(innerScorecardsArray);
    }
    animatedHeight.value = withSpring(
      !itemData.isEditing ? (scorecardsArrayLength == 0 ? 110 : 150) : 10,
    );
  };

  const save = async () => {
    if (props.checkId(+itemData.id) && !(itemData.name.trim().length == 0)) {
      await setDoc(doc(db, props?.type, itemData.id.toString()), {
        name: itemData.name,
        id: +itemData.id,
      })
        .catch((err) => console.log(err))
        .then(() => {
          props.saveNew({
            name: itemData.name,
            id: +itemData.id,
            creating: false,
            editing: false,
          });
          setIsCreating(false);
          setIsLoading(false);
        });
    } else if (itemData.name.trim().length == 0) {
      Alert.alert(
        'Dados preenchidos incorretos!',
        category + ' deve ter um nome para que esta seja salva',
      );
      setIsCreating(true);
      setIsLoading(false);
    } else {
      setIsCreating(true);
      setIsLoading(false);
    }
  };

  const update = async () => {
    setIsLoading(true);
    if (!(itemData.name.trim().length == 0)) {
      await setDoc(doc(db, props?.type, itemData.id.toString()), {
        name: itemData.name,
        id: +itemData.id,
      })
        .catch((err) => console.log(err))
        .then(() => setIsLoading(false));
    } else {
      Alert.alert(
        'Dados preenchidos incorretos!',
        category + ' deve ter um nome para que esta seja atualizada',
      );
      setItemData({ ...itemData, isEditing: true });
      setIsLoading(false);
    }
  };

  const deleteScorecard = async (id) => {
    setIsLoading(true);
    try {
      const ubsScorecardsQuery = query(
        collection(db, 'ubsScorecards'),
        where('scorecard', '==', +id),
      );

      const ubsScorecardsSnapshot = await getDocs(ubsScorecardsQuery);

      const promises = ubsScorecardsSnapshot.docs.map(async (data) => {
        await deleteDoc(doc(db, 'ubsScorecards', id.toString()));
      });

      await Promise.all(promises)
        .then(async () => {
          await deleteDoc(doc(db, 'scorecards', id.toString()));
        })
        .then(() => {
          setInnerScorecards(innerScorecards.filter((e) => +e.id !== +id));
        });
    } catch (err) {
      console.log('Error while trying to delete the scorecard and its childrens');
      console.log(err);
    }
  };

  const handleDeleteScorecard = (data) => {
    Alert.alert(
      'Removendo indicador...',
      'Deseja realmente remover o indicador (' + data.id + ") - '" + data.name + "' ?",
      [
        { text: 'NÃO', style: 'cancel' },
        { text: 'SIM', onPress: () => remove() },
      ],
    );

    const remove = () => {
      animatedHeight.value = withSpring(10);
      deleteScorecard(data.id).then(() => {
        setIsLoading(false);
        Alert.alert(
          'Operação realizada com sucesso!',
          'O indicador (' + data.id + ") - '" + data.name + "' foi removido!",
        );
        animatedHeight.value = withSpring(innerScorecards.length == 0 ? 110 : 150);
      });
    };
  };

  const idInputHandler = (t) => {
    if (isNaN(t)) {
      setItemData({ ...itemData, id: '' });
    } else {
      setItemData({ ...itemData, id: t });
    }
  };

  const navigateToNewScorecard = () => {
    const periodId = Math.floor(itemData.id / 10);

    let periodName = 'Período';

    switch (periodId) {
      case 1:
        periodName = 'Pré-natal';
        break;
      case 2:
        periodName = 'Pós-natal';
        break;
      case 3:
        periodName = 'Saúde da Criança';
        break;
      default:
        break;
    }

    props.navigation.navigate('NewScorecard', {
      criteria: {
        id: itemData.id,
        text: itemData.name,
      },
      period: {
        id: periodId,
        name: periodName,
      },
      scorecards: innerScorecards,
    });
  };

  const navigateToGlossary = (data) => {
    props.navigation.navigate('ManageGlossary', {
      data: { ...data, criteriaName: itemData.name },
    });
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableCard
        style={{ ...shadow }}
        activeOpacity={buttonOpacity}
        onPress={props.onPress ? props.onPress : null}
        disabled={props.onPress === undefined ? true : false}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.orange}
            style={{ flex: 2.5, marginLeft: 15, paddingRight: 5 }}
          />
        ) : itemData.isEditing || isCreating ? (
          <>
            {isCreating ? (
              <TextInput
                style={[styles.number, { textDecorationLine: 'underline' }]}
                value={itemData.id}
                numberOfLines={1}
                maxLength={2}
                keyboardType="numeric"
                placeholder="ID"
                onChangeText={(t) => idInputHandler(t)}
              />
            ) : (
              <Text style={styles.number} numberOfLines={1}>
                {itemData.id}
              </Text>
            )}
            <TextInput
              style={[styles.title, { textDecorationLine: 'underline' }]}
              numberOfLines={1}
              value={itemData.name}
              placeholder="Nome"
              onChangeText={(t) => setItemData({ ...itemData, name: t })}
            />
          </>
        ) : (
          <>
            <Text style={styles.number} numberOfLines={1}>
              {itemData.id}
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {itemData.name}
            </Text>
          </>
        )}

        <View
          style={{
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginLEft: 5,
            marginRight: 10,
          }}
        >
          <TouchableIcon
            activeOpacity={buttonOpacity}
            disabled={isLoading}
            onPress={
              isLoading
                ? null
                : () => {
                    setIsLoading(true);
                    props.deleteItem().then(() => setIsLoading(false));
                  }
            }
          >
            <Icon
              name={'trash-can-outline'}
              size={35}
              type="material-community"
              color={colors.text}
            />
          </TouchableIcon>

          <TouchableIcon
            activeOpacity={buttonOpacity}
            onPress={() => {
              if (!isCreating) {
                increaseDecreaseHeight().then(() => {
                  setIsLoading(false);
                });
              }
              if (itemData.isEditing) {
                update();
              } else if (isCreating) {
                save();
              }
            }}
          >
            <Icon
              name={itemData.isEditing || isCreating ? 'check' : 'pencil-outline'}
              size={35}
              type="material-community"
              color={itemData.isEditing || isCreating ? colors.orange : colors.text}
            />
          </TouchableIcon>
        </View>
      </TouchableCard>
      {props?.type === 'services' ? null : (
        <AnimatedView animatedProps={viewProps}>
          {itemData.isEditing && !isLoading ? (
            <ScrollView style={{ width: '100%' }} nestedScrollEnabled={true}>
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                {innerScorecards.map((data) => {
                  return (
                    <TouchableInnerCard
                      key={data.id}
                      style={shadow}
                      onPress={() => navigateToGlossary(data)}
                      activeOpacity={buttonOpacity}
                    >
                      <Text style={[styles.number, { fontSize: fontSizeNoUnits.text }]}>
                        {data.id}
                      </Text>
                      <Text style={[styles.title, { fontSize: 16 }]} numberOfLines={1}>
                        {data.name}
                      </Text>
                      <TouchableIcon
                        activeOpacity={buttonOpacity}
                        onPress={() => handleDeleteScorecard(data)}
                      >
                        <Icon
                          name={'trash-can-outline'}
                          size={27}
                          type="material-community"
                          color={colors.text}
                        />
                      </TouchableIcon>
                    </TouchableInnerCard>
                  );
                })}
                <AddButton tiny relative onPress={navigateToNewScorecard} />
              </View>
            </ScrollView>
          ) : null}
        </AnimatedView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontFamily: fonts.spartanR,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeNoUnits.cardText,
    marginLeft: 5,
    paddingRight: 5,
    color: colors.text,
    flex: 2,
  },
  number: {
    textAlign: 'center',
    fontFamily: fonts.spartanR,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeNoUnits.cardText,
    color: colors.orange,
    marginLeft: 10,
    flex: 0.5,
  },
});
