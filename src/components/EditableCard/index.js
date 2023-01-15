import React, { useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Dimensions, View, StyleSheet, TextInput, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { buttonOpacity, colors, fonts, fontSizeNoUnits } from '../../defaultStyles';
import { db } from '../../services/firebase.config';
import { TouchableCard, TouchableIcon, TouchableInnerCard } from './styles';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

export default (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState(props.text);
  const [innerScorecards, setInnerScorecards] = useState([]);

  const screenWidth = Dimensions.get('window').width;

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
  }, [isEditing]);

  const increaseDecreaseHeight = async () => {
    setIsEditing(!isEditing);
    if (innerScorecards.length == 0 && !isEditing) {
      setIsLoading(true);
      const criteriaScorecards = query(
        collection(db, 'scorecards'),
        where('criteriaId', '==', +props.itemId),
      );

      const scorecardsSnapshot = await getDocs(criteriaScorecards);

      const innerScorecardsArray = [];
      scorecardsSnapshot.forEach((scorecard) => {
        const scorecardObject = {
          id: +scorecard.id,
          description: scorecard.data().description,
          name: scorecard.data().name,
        };
        innerScorecardsArray.push(scorecardObject);
      });

      setInnerScorecards(innerScorecardsArray);
    }
    animatedHeight.value = withSpring(!isEditing ? 150 : 10);
  };

  const save = async () => {
    setIsLoading(true);
    await setDoc(doc(db, 'diretriz', props.itemId.toString()), {
      name: itemName,
      id: props.itemId,
    })
      .catch((err) => console.log(err))
      .then(() => setIsLoading(false));
  };

  const deleteOrCancel = () => {
    if (isEditing) {
      increaseDecreaseHeight();
    } else {
      setIsLoading(true);
      deleteScorecard().then(() => setIsLoading(false));
    }
  };

  const deleteExample = (id) => {
    setInnerScorecards(innerScorecards.filter((e) => e.id !== id));
  };

  const deleteScorecard = async (id) => {
    const scorecardsQuery = query(
      collection(db, 'ubsScorecards'),
      where('scorecard', '==', props.itemId),
    );
    const scorecardsSnapshot = await getDocs(scorecardsQuery);

    const promises = scorecardsSnapshot.docs.map(async (data) => {
      await deleteDoc(doc(db, 'ubsScorecards', data.id));
    });

    await Promise.all(promises);

    await deleteDoc(doc(db, 'scorecards', props.itemId.toString()))
      .catch((err) => {
        console.log(err);
      })
      .then(() => props.deletedItem())
      .finally(() => {
        Alert.alert(
          'Indicador excluído!',
          'O indicador ' +
            `"${itemName}"` +
            ' e sua(s) ' +
            scorecardsSnapshot.docs.length +
            ' referência(s) foram excluídos.',
        );
      });
  };

  const cardShadow = {
    startColor: 'rgba(0,0,0,0.035)',
    finalColor: 'rgba(0,0,0,0.0)',
    distance: 10,
    radius: 5,
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Shadow
        {...cardShadow}
        containerViewStyle={{
          height: 70,
          width: screenWidth * 0.85,
          zIndex: 3,
        }}
      >
        <TouchableCard
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
          ) : isEditing ? (
            <>
              <Text style={styles.number}>{props.itemId}</Text>
              <TextInput
                style={[styles.title, { textDecorationLine: 'underline' }]}
                numberOfLines={1}
                value={itemName}
                placeholder="Nome"
                onChangeText={setItemName}
              />
            </>
          ) : (
            <>
              <Text style={styles.number}>{props.itemId}</Text>
              <Text style={styles.title} numberOfLines={1}>
                {itemName}
              </Text>
            </>
          )}

          <TouchableIcon
            activeOpacity={buttonOpacity}
            onPress={() => {
              increaseDecreaseHeight().then(() => {
                setIsLoading(false);
              });
              if (isEditing) {
                save();
              }
            }}
          >
            <Icon
              name={isEditing ? 'check' : 'pencil-outline'}
              size={35}
              type="material-community"
              color={isEditing ? colors.orange : colors.text}
            />
          </TouchableIcon>
        </TouchableCard>
      </Shadow>
      <AnimatedView animatedProps={viewProps}>
        {isEditing ? (
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
                  <Shadow
                    key={data.id}
                    {...cardShadow}
                    containerViewStyle={{
                      marginVertical: 8,
                    }}
                  >
                    <TouchableInnerCard activeOpacity={buttonOpacity}>
                      <Text style={[styles.number, { fontSize: fontSizeNoUnits.text }]}>
                        {data.id}
                      </Text>
                      <Text style={[styles.title, { fontSize: 16 }]} numberOfLines={1}>
                        {data.name}
                      </Text>
                      <TouchableIcon
                        activeOpacity={buttonOpacity}
                        onPress={() => deleteExample(data.id)}
                      >
                        <Icon
                          name={'trash-can-outline'}
                          size={27}
                          type="material-community"
                          color={colors.text}
                        />
                      </TouchableIcon>
                    </TouchableInnerCard>
                  </Shadow>
                );
              })}
            </View>
          </ScrollView>
        ) : null}
      </AnimatedView>
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
