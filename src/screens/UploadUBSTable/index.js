import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Linking, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { db, storage } from '../../services/firebase.config';
import { getDownloadURL, ref } from 'firebase/storage';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { colors, fonts, RegisterButton } from '../../defaultStyles';
import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { SimpleText, Title, Container, ButtonView, TouchableText } from './styles';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadDefaultExcel = async () => {
    const fileName = 'cadastro_estabelecimentos_final10.xlsx';
    const pathReference = ref(storage, fileName);

    await getDownloadURL(pathReference).then(async (url) => {
      Linking.openURL(url);
    });
  };

  const handleDocument = async () => {
    setIsLoading(true);
    try {
      const fileDoc = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      if (fileDoc.type === 'cancel') {
        return;
      }

      if (fileDoc.type !== 'success') {
        return Alert.alert('Não foi possivel carregar o arquivo');
      }

      await FileSystem.readAsStringAsync(`${fileDoc.uri}`, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then(async (b64) => XLSX.read(b64, { type: 'base64' }))
        .then(async (workbook) => {
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];

          const dataFile = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
          await uploadToDatabase(dataFile)
            .then(async () => {
              await updateUbsCount();
            })
            .finally(() => {
              Alert.alert(
                'Upload completo!',
                'Todos os dados foram carregados e enviados com sucesso.',
              );
            });
        });
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Erro ao carregar arquivo!',
        'Por favor verifique a formatação do arquivo o mesmo deve seguir o modelo e ter extensão .xlsx',
      );
    }
  };

  const uploadToDatabase = async (dataFile) => {
    try {
      for (i = 0; i < dataFile.length; i++) {
        let location = {
          latitude: 0,
          longitude: 0,
        };

        if (dataFile[i].latitude && dataFile[i].longitude) {
          location = {
            latitude: dataFile[i].latitude,
            longitude: dataFile[i].longitude,
          };
        }

        const promises = dataFile.map(async (data) => {
          await setDoc(doc(db, 'ubs', data.id.toString()), {
            uf: data.uf,
            city: data.city,
            name: data.name,
            location,
          });
        });

        await Promise.all(promises).catch((err) => {
          console.log('Error while trying to send the data from the datafile');
          console.log(err);
        });
      }
    } catch (err) {
      Alert.alert(
        'Algo deu errado!',
        'Durante a inserção dos dados o programa falhou, por favor verifique a formatação do arquivo o mesmo deve seguir o modelo.',
      );
      console.log(err);
    }
  };

  const updateUbsCount = async () => {
    //Get all UBS
    const querySnapshot = await getDocs(collection(db, 'ubs'));

    //The array that will contain the amount of UBS in a State and the amount of UBS in its cities
    let ubsAmountStates = [];
    let ubsAmountCities = [];
    querySnapshot.forEach((doc) => {
      //Search for the State in the array
      const stateIndex = ubsAmountStates.findIndex((state) => {
        return state?.id == doc.data().uf;
      });
      if (stateIndex !== -1) {
        //State exists: icrement State amount UBS
        ubsAmountStates[stateIndex].amount += 1;
        //Search for the City in the array
        const cityIndex = ubsAmountCities.findIndex((city) => {
          return city?.id == doc.data().city;
        });
        if (cityIndex !== -1) {
          //City exists: icrement City amount UBS
          ubsAmountCities[cityIndex].amount += 1;
        } else {
          //City doesnt exists: create and push the new City
          ubsAmountCities.push({
            id: doc.data().city,
            amount: 1,
          });
        }
      } else {
        //State doesnt exists: create and push the new State and the new City
        ubsAmountStates.push({
          id: doc.data().uf,
          amount: 1,
        });
        ubsAmountCities.push({
          id: doc.data().city,
          amount: 1,
        });
      }
    });

    //Push to the database
    try {
      const promisesStates = ubsAmountStates.map(async (state) => {
        await setDoc(doc(db, 'ubsAmountStates', state.id.toString()), {
          amount: state.amount,
        });
      });
      const promisesCities = ubsAmountCities.map(async (city) => {
        await setDoc(doc(db, 'ubsAmountCities', city.id.toString()), {
          amount: city.amount,
        });
      });
      //Handle all the promises
      await Promise.all(promisesStates);
      await Promise.all(promisesCities);
    } catch (err) {
      console.log('Error while trying to update the ubsCount amount');
    }
  };

  return (
    <>
      <DashedCircle />
      <Header
        text={'Administrativo - Upload'}
        onPress={() => props.navigation.goBack()}
        pointerEvents={isLoading ? 'none' : 'auto'}
      />
      <Container>
        <View style={{ marginTop: '25%' }}>
          <Icon
            name="file-excel-outline"
            type="material-community"
            size={120}
            color={colors.orange}
          />
        </View>

        <Title>Adicionar UBS</Title>

        <SimpleText>
          <Text>
            Para adicionar várias UBS's ao mesmo tempo, faça UPLOAD do arquivo .xlsx contendo os
            dados das UBS's e{' '}
          </Text>
          <Text style={{ fontFamily: fonts.spartanBold }}>seguindo a formatação padrão.</Text>
        </SimpleText>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
        ) : (
          <ButtonView>
            <RegisterButton
              text="Fazer Upload"
              pointerEvents={isLoading ? 'none' : 'auto'}
              onPress={() => handleDocument().then(() => setIsLoading(false))}
            />
          </ButtonView>
        )}

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <SimpleText>
            <Text>Modelo com a </Text>
            <Text style={{ fontFamily: fonts.spartanBold }}>formatação padrão</Text>
          </SimpleText>

          <TouchableOpacity style={{ marginBottom: 40 }} onPress={downloadDefaultExcel}>
            <TouchableText>Baixe aqui</TouchableText>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};
