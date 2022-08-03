import React from 'react';
import { Text, TouchableOpacity, View, Linking, Alert } from 'react-native';
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
import {
  SimpleText,
  Title,
  Container,
  ButtonView,
  TouchableText,
} from './styles';

export default (props) => {
  const downloadDefaultExcel = async () => {
    const fileName = 'cadastro_estabelecimentos_final5.xlsx';
    const pathReference = ref(storage, fileName);

    await getDownloadURL(pathReference).then(async (url) => {
      Linking.openURL(url);
    });
  };

  const handleDocument = async () => {
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
          await uploadToDatabase(dataFile);
        });
    } catch (err) {
      Alert.alert('Erro ao carregar arquivo!');
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

        await setDoc(doc(db, 'ubs', dataFile[i].id.toString()), {
          uf: dataFile[i].uf,
          name: dataFile[i].name,
          location,
        })
          .then(async () => {
            //Get all UBS
            const querySnapshot = await getDocs(collection(db, 'ubs'));

            //Get all UBS States
            let ubsStates = [];
            querySnapshot.forEach((doc) => {
              ubsStates.push(doc.data().uf);
            });

            //Count, to each State, the amount of UBS
            let ubsCount = [];
            for (i = 0; i < ubsStates.length; i++) {
              const index = ubsCount.findIndex((state) => {
                return state?.id === ubsStates[i];
              });
              if (index !== -1) {
                ubsCount[index].amount += 1;
              } else {
                const ubsAmountObject = { id: ubsStates[i], amount: 1 };
                ubsCount.push(ubsAmountObject);
              }
            }

            //Push to the database
            try {
              ubsCount.forEach(async (count) => {
                await setDoc(doc(db, 'ubsCount', count.id.toString()), {
                  amount: count.amount,
                });
              });
            } catch (err) {
              console.log('Error while trying to update the ubsCount amount');
            }
          })
          .catch((err) => {
            console.log('Error with Brazilian States API');
            console.log(err);
          });
      }
      Alert.alert('Upload completo!');
    } catch (err) {
      Alert.alert(
        'Algo deu errado ao tentar inserir os dados do arquivo no banco de dados, por favor verifique a formatação do arquivo.'
      );
      console.log(err);
    }
  };

  return (
    <>
      <DashedCircle />
      <Header
        text={'Administrativo - Upload'}
        onPress={() => props.navigation.goBack()}
      />
      <Container>
        <View style={{ marginTop: '25%' }}>
          <Icon
            name='file-excel-outline'
            type='material-community'
            size={120}
            color={colors.orange}
          />
        </View>

        <Title>Adicionar UBS</Title>

        <SimpleText>
          <Text>
            Para adicionar várias UBS's ao mesmo tempo, faça UPLOAD do arquivo
            .xlsx contendo os dados das UBS's e{' '}
          </Text>
          <Text style={{ fontFamily: fonts.spartanBold }}>
            seguindo a formatação padrão.
          </Text>
        </SimpleText>

        <ButtonView>
          <RegisterButton text='Fazer Upload' onPress={handleDocument} />
        </ButtonView>

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
            <Text style={{ fontFamily: fonts.spartanBold }}>
              formatação padrão
            </Text>
          </SimpleText>

          <TouchableOpacity
            style={{ marginBottom: 40 }}
            onPress={downloadDefaultExcel}
          >
            <TouchableText>Baixe aqui</TouchableText>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};
