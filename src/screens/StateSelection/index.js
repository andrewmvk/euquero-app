import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import {
  View,
  TextInput,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  SearchArea,
  SearchInput,
  SearchInputText,
  Card1
} from './styles'
import Header from '../../components/Header'
import DashedCircle from '../../components/DashedCircle'
import { colors } from '../../defaultStyles'

import axios from 'axios'

export default props => {
  const [data, setData] = useState([])

  // backup array
  const [originalData, setOriginalData] = useState([])

  //api request
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
      )

      setOriginalData(response.data)
      setData(response.data)
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
      );

      setBrazilianStates(response.data);
    }

    fetchData()
  }, [])


  //reversing order for data
  const brazilianStates = data.reverse()

  const handleCardPress = (item) => {
    props.navigation.navigate('CitySelection', {
      stateID: item.id,
      stateName: item.nome,
    });
  };


  //render card from flatlist
  const stateCard = ({ item }) => {
    return (
      <Card
        value={item.id}
        key={item.id}

        activeOpacity={0.7}
        style={{ borderLeftColor: '#c4c4c4', borderLeftWidth: 7 }}
      >
        <Text
          style={{
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            marginLeft: 22,
            color: '#7F7F7F'
          }}
          key={item.id}
        >
          {item.nome}
        </Text>
        <Text
          style={{
            position: 'absolute',
            textAlign: 'right',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            bottom: 10,
            right: 22,
            color: '#7F7F7F'
          }}
        >
          00 UBS
        </Text>
      </Card1>
    )
  }

  search = t => {
    let arr = [...originalData]
    setData(
      arr.filter(d =>
        d.nome
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            t
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
          )
      )
    )
  }
        onPress={() => handleCardPress(item)}
        text={item.nome}
        ubsCount={'00 UBS'}
      />
    );
  };

  return (
    <>
      <DashedCircle />
      <Container>
        <Header onPress={() => props.navigation.goBack()} />
        <SearchArea>
          <SearchInput>
            <SearchInputText
              placeholder="Buscar estado"
              onChangeText={t => search(t)}
            />
            <Icon
              name="search-outline"
              type="ionicon"
              color="#c4c4c4"
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15
              }}
            />
          </SearchInput>
          <TouchableOpacity>
            <Icon
              name="order-alphabetical-ascending"
              type="material-community"
              color={colors.gray}
              size={32}
              style={{ marginTop: 25, marginLeft: 25 }}
            />
          </TouchableOpacity>
        </SearchArea>
        <SearchInput>
          <SearchInputText placeholder="Buscar estado" />
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

        <FlatList
          style={{ width: '85%', marginTop: 25, marginBottom: 25 }}
          data={brazilianStates}
          renderItem={stateCard}
          keyExtractor={item => item.id}
        />
      </Container>
    </>
  )
}
