import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Linking, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { auth, db, storage } from '../../services/firebase.config';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as NavigationBar from 'expo-navigation-bar';

import { colors, fonts } from '../../defaultStyles';
import { RegisterButton } from '../../components/common';
import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';
import { SimpleText, Title, Container, ButtonView, TouchableText } from './styles';
import { useEffect } from 'react';
import AnimatedButton from '../../components/AnimatedButton';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [fileType, setFileType] = useState({
    items: [
      { id: 0, name: 'UNIDADES' },
      { id: 1, name: 'INDICADORES' },
      { id: 2, name: 'SERVIÇOS' },
    ],
    value: -1,
  });

  const downloadDefaultExcel = async () => {
    const fileName = 'padrao_tabelas_excel.pdf';
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

      let pageErrors = [];
      let numberOfPages = 0;
      let amountUploaded = 0;

      await FileSystem.readAsStringAsync(`${fileDoc.uri}`, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then(async (b64) => XLSX.read(b64, { type: 'base64' }))
        .then(async (workbook) => {
          for (i = 0; i < workbook.SheetNames.length; i++) {
            numberOfPages = workbook.SheetNames.length;
            const worksheetName = workbook.SheetNames[i];
            const worksheet = workbook.Sheets[worksheetName];

            const dataFile = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
            const error = await uploadToDatabase(dataFile, worksheetName);
            if (error != null) {
              pageErrors.push(error);
            } else {
              amountUploaded += dataFile.length;
            }
          }
        })
        .finally(() => {
          if (fileType != -1) {
            let alertDescription = {
              title: 'Upload completo!',
              text: 'Todos os dados foram carregados e enviados com sucesso.',
            };
            if (pageErrors.length != 0) {
              let errorMessage = '';
              for (i = 0; i < pageErrors.length; i++) {
                errorMessage += pageErrors[i];
                if (i != pageErrors.length - 1) {
                  errorMessage += ', ';
                }
              }
              const finalMessage =
                numberOfPages == pageErrors.length
                  ? '. Apenas alguns dados foram enviados.'
                  : '. Todos os outros ' +
                    amountUploaded +
                    ' dados das outras páginas do arquivo foram adicionados.';

              alertDescription = {
                title: 'Upload completo!',
                text:
                  pageErrors.length +
                  ' erro(s) encontrado(s) na(s) página(s) do arquivo: ' +
                  `"${errorMessage}"` +
                  finalMessage,
              };
            }
            setFileType({ items: fileType.items, value: -1 });
            Alert.alert(alertDescription.title, alertDescription.text);
          }
        });
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Erro ao carregar arquivo!',
        'Por favor verifique a formatação do arquivo, o mesmo deve a formatação padrão e ter extensão .xlsx',
      );
    }
  };

  const uploadUbs = async (dataFile) => {
    const promises = dataFile.map(async (data) => {
      await setDoc(doc(db, 'ubs', data.id.toString()), {
        uf: +data.uf,
        city: +data.city,
        name: data.name,
        location: {
          latitude: data?.latitude ? data.latitude : null,
          longitude: data?.longitude ? data.longitude : null,
        },
      });
    });

    await Promise.all(promises);
  };

  const uploadScorecards = async (dataFile) => {
    const promises = dataFile.map(async (data) => {
      await setDoc(doc(db, 'ubsScorecards', data.scorecard.toString() + data.ubsid.toString()), {
        ubsid: +data.ubsid,
        scorecard: +data.scorecard,
        score: +data.score,
      });
    });

    await Promise.all(promises);
  };

  const uploadServices = async (dataFile) => {
    const promises = dataFile.map(async (data) => {
      await setDoc(doc(db, 'ubsServices', data.service.toString() + data.ubsid.toString()), {
        ubsid: +data.ubsid,
        service: +data.service,
      });
    });

    await Promise.all(promises);
  };

  const uploadToDatabase = async (dataFile, worksheetName) => {
    let error = null;
    if (fileType.value === 0) {
      await uploadUbs(dataFile)
        .then(async () => {
          await updateUbsCount();
        })
        .catch((err) => {
          console.log(err);
          error = worksheetName;
        });
    } else if (fileType.value === 1) {
      await uploadScorecards(dataFile).catch(() => {
        error = worksheetName;
      });
    } else if (fileType.value === 2) {
      await uploadServices(dataFile).catch(() => {
        error = worksheetName;
      });
    } else {
      Alert.alert(
        'Selecione um tipo de arquivo',
        'Para adicionar os dados escolhidos é necessário selecionar qual tipo de arquivo você está enviando.',
      );
    }

    return error;
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

  const handleSelectFileType = (id) => {
    const newValue = fileType.value != id ? id : -1;
    setFileType({ items: fileType.items, value: newValue });
  };

  useEffect(() => {
    const navBarConfig = async () => {
      await NavigationBar.setPositionAsync('relative');
      await NavigationBar.setBackgroundColorAsync('#f2f2f2');
      await NavigationBar.setButtonStyleAsync('dark');
    };
    navBarConfig();

    const currentUser = async () => {
      const currentUserSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
      setUser(currentUserSnap.exists());
    };
    currentUser();
  }, []);

  return (
    <>
      <DashedCircle />
      <Header
        text={'Administrativo - Upload'}
        onPress={() => props.navigation.goBack()}
        pointerEvents={isLoading ? 'none' : 'auto'}
      />
      {user ? (
        <Container>
          <View style={{ marginTop: '5%' }}>
            <Icon
              name={
                fileType.value == -1
                  ? 'file-excel-outline'
                  : fileType.value == 0
                  ? 'plus-box-outline'
                  : 'merge'
              }
              type="material-community"
              size={110}
              color={colors.orange}
            />
          </View>

          <Title>Adicionar novos dados</Title>

          <SimpleText>
            {fileType.value == -1 ? (
              <>
                <Text>
                  Abaixo escolha o tipo de arquivo que deseja inserir, faça upload do arquivo .xlsx
                  com a{' '}
                </Text>
                <Text style={{ fontFamily: fonts.spartanBold }}>formatação padrão.</Text>
              </>
            ) : fileType.value == 0 ? (
              <>
                <Text style={{ fontFamily: fonts.spartanBold }}>Unidades Básicas de Saúde </Text>
                <Text>
                  só podem ser adicionadas por aqui e devem conter nome, id, estado, cidade,
                  latitude e longitude.
                </Text>
              </>
            ) : (
              <>
                <Text style={{ fontFamily: fonts.spartanBold }}>Indicadores ou Serviços. </Text>
                <Text>
                  Esta seleção não deve ser utilizada para adicionar, mas sim para fazer conexões
                  com suas UBSs.
                </Text>
              </>
            )}
          </SimpleText>

          {isLoading ? (
            <ActivityIndicator size="large" color={colors.orange} style={{ marginTop: 50 }} />
          ) : (
            <ButtonView>
              <View style={{ height: 185, justifyContent: 'space-between' }}>
                {fileType.items.map((item) => {
                  return (
                    <AnimatedButton
                      key={item.id}
                      text={item.name}
                      active={fileType.value == item.id}
                      onPress={() => handleSelectFileType(item.id)}
                    />
                  );
                })}
              </View>
              <RegisterButton
                text="CADASTRAR"
                pointerEvents={isLoading ? 'none' : 'auto'}
                containerStyle={{
                  marginTop: 20,
                  backgroundColor: fileType.value == -1 ? colors.gray : colors.orange,
                }}
                isLoading={isLoading}
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
            <SimpleText style={{ marginBottom: 5 }}>
              <Text>Modelo com a </Text>
              <Text style={{ fontFamily: fonts.spartanBold }}>formatação padrão</Text>
            </SimpleText>

            <TouchableOpacity style={{ marginBottom: 40 }} onPress={downloadDefaultExcel}>
              <TouchableText>Baixe aqui</TouchableText>
            </TouchableOpacity>
          </View>
        </Container>
      ) : null}
    </>
  );
};
