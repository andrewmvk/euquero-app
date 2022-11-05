import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import NetInfo from '@react-native-community/netinfo';
import Pin from '../../assets/images/map-pin.svg';
import NoConnection from '../../assets/images/no-connection.svg';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';

import { fonts, fontSize, fontSizeNoUnits, colors, buttonOpacity } from '../defaultStyles';

const screenWidth = Dimensions.get('window').width;

const BigTitleView = styled.View`
  width: 100%;
  margin-top: 7%;
  height: 13%;
  justify-content: center;
  align-items: center;
`;

const BigTitleText = styled.Text`
  font-family: ${fonts.spartanM};
  font-size: ${fontSize.bigTitle};
  color: ${colors.text};
`;

const Line = styled.View`
  width: 20%;
  height: 2px;
  margin-top: 5px;
  background-color: ${colors.orange};
`;

export const BigTitle = (props) => {
  return (
    <BigTitleView>
      <View
        style={{
          justifyContent: 'space-around',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <BigTitleText>{props.children}</BigTitleText>
        <Line />
      </View>
    </BigTitleView>
  );
};

const MediumTitleView = styled.View`
  width: 100%;
  height: 13%;
  justify-content: center;
  align-items: center;
`;

const MediumTitleText = styled.Text`
  font-family: ${fonts.spartanM};
  font-size: 18px;
  color: ${colors.text};
`;

export const MediumTitle = (props) => {
  return (
    <MediumTitleView>
      <View
        style={{
          justifyContent: 'space-around',
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        <MediumTitleText>{props.text}</MediumTitleText>
      </View>
    </MediumTitleView>
  );
};

const customButtonShadow = {
  small: {
    distance: 0,
    startColor: 'rgba(0,0,0,0.1)',
    distance: 10,
    offset: [0, 4],
    radius: 20,
    containerViewStyle: { paddingBottom: 2 },
  },
  large: {
    distance: 0,
    startColor: 'rgba(0,0,0,0.1)',
    distance: 10,
    offset: [0, 4],
    radius: 25,
    containerViewStyle: { paddingBottom: 2 },
  },
  rounded: {
    distance: 0,
    startColor: 'rgba(0,0,0,0.05)',
    finalColor: 'rgba(0,0,0,0)',
    radius: 35,
    distance: 10,
    containerViewStyle: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  },
};

const buttonStyles = StyleSheet.create({
  small: {
    width: 200,
    height: 40,
    backgroundColor: colors.orange,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: 250,
    height: 50,
    backgroundColor: colors.orange,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  register: {
    width: '90%',
    height: 60,
    backgroundColor: colors.orange,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SmallButtonText = styled.Text`
  color: ${colors.titleSubtitle};
  font-size: ${fontSize.subtitle};
  font-family: ${fonts.spartanM};
`;

export function SmallButton(props) {
  return (
    <Shadow {...customButtonShadow.small}>
      <TouchableOpacity
        activeOpacity={buttonOpacity}
        style={buttonStyles.small}
        onPress={props.onPress}
      >
        <SmallButtonText>{props.text ? props.text : 'TEXT'}</SmallButtonText>
      </TouchableOpacity>
    </Shadow>
  );
}

const LargeButtonText = styled.Text`
  color: ${colors.titleSubtitle};
  font-family: ${fonts.spartanM};
  font-size: ${fontSize.title};
`;

export function LargeButton(props) {
  return (
    <Shadow {...customButtonShadow.large}>
      <TouchableOpacity
        activeOpacity={buttonOpacity}
        style={buttonStyles.large}
        onPress={props.onPress}
      >
        <LargeButtonText>{props.text ? props.text : 'TEXT'}</LargeButtonText>
      </TouchableOpacity>
    </Shadow>
  );
}

const RegisterButtonText = styled.Text`
  color: ${colors.titleSubtitle};
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.title};
`;

export function RegisterButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={buttonOpacity}
      style={[buttonStyles.register, props.containerStyle]}
      onPress={props.onPress}
    >
      {props.isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <RegisterButtonText>{props.text ? props.text : 'TEXT'}</RegisterButtonText>
      )}
    </TouchableOpacity>
  );
}

const RoundedButton = styled.TouchableOpacity`
  z-index: 5;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export function AddButton(props) {
  return (
    <Shadow {...customButtonShadow.rounded}>
      <RoundedButton activeOpacity={buttonOpacity} onPress={props.onPress}>
        <Icon name="plus" size={35} type="material-community" color={colors.orange} />
      </RoundedButton>
    </Shadow>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    width: screenWidth * 0.85,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderLeftWidth: 7,
  },
  cardText: {
    textAlign: 'left',
    fontFamily: fonts.spartanR,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeNoUnits.cardText,
    marginLeft: 22,
    color: colors.text,
  },
  avaibleUBSText: {
    fontFamily: fonts.spartanR,
    position: 'absolute',
    textAlign: 'right',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeNoUnits.subtitle,
    bottom: 10,
    right: 22,
    color: colors.text,
  },
});

export const cardShadow = {
  distance: 2,
  startColor: 'rgba(0,0,0,0.035)',
  finalColor: 'rgba(0,0,0,0.0)',
  distance: 10,
  radius: 5,
  containerViewStyle: {
    marginVertical: 7,
    height: 71,
    width: screenWidth * 0.85,
    zIndex: 3,
  },
};

export const Card = (props) => {
  const color = props.color ? props.color : colors.gray;
  const textWidth = props.ubsCount
    ? screenWidth * 0.6
    : props.textWidth
    ? screenWidth * props.textWidth
    : screenWidth * 0.75;

  return (
    <Shadow {...cardShadow}>
      <TouchableOpacity
        activeOpacity={buttonOpacity}
        style={[cardStyles.container, { borderLeftColor: color }]}
        onPress={props.onPress ? props.onPress : null}
        disabled={props.onPress === undefined ? true : false}
      >
        {props.text ? (
          <View style={{ width: textWidth }}>
            <Text style={cardStyles.cardText} numberOfLines={1}>
              {props.text}
            </Text>
          </View>
        ) : null}
        {props.ubsCount ? (
          <Text style={[cardStyles.avaibleUBSText, { width: textWidth }]}>
            {props.ubsCount + ' UBS'}
          </Text>
        ) : null}
        {props.children ? { ...props.children } : null}
      </TouchableOpacity>
    </Shadow>
  );
};

const cardA = StyleSheet.create({
  containerA: {
    width: screenWidth * 0.85,
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 5,
    borderLeftWidth: 7,
    justifyContent: 'center',
  },
  titleCardA: {
    fontFamily: fonts.spartanR,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    marginLeft: 22,
    marginTop: -5,
    color: colors.text,
  },
  descriptionCardA: {
    fontFamily: fonts.spartanR,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    marginLeft: 22,
    color: colors.text,
  },
});

export const InDevelopmentCard = (props) => {
  const [isConnected, setIsConnected] = useState(false);

  const color = props.color ? props.color : colors.gray;
  const height = () => {
    const a = props.data.length * 31;
    return a > 160 ? 160 : a;
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => setIsConnected(state.isConnected));
    unsubscribe();
  }, []);

  return (
    <View>
      {isConnected ? (
        <>
          <Shadow {...cardShadow}>
            <View style={[cardA.containerA, { borderLeftColor: color }]}>
              <Text style={cardA.titleCardA} numberOfLines={1}>
                Em desenvolvimento...
              </Text>
              <Text style={cardA.descriptionCardA}>Estados a serem cadastrados:</Text>
            </View>
          </Shadow>
          <View
            style={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor: 'white',
              width: '95%',
              height: height(),
              alignSelf: 'center',
              marginBottom: 30,
            }}
          >
            <ScrollView nestedScrollEnabled style={{ paddingHorizontal: 20, paddingTop: 10 }}>
              {props.data.map((item) => {
                return (
                  <Text key={item.id} style={{ color: '#7f7f7f', marginBottom: 5 }}>
                    {item.name}
                  </Text>
                );
              })}
              <View style={{ height: 15 }} />
            </ScrollView>
          </View>
        </>
      ) : null}
    </View>
  );
};

const NoResults = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #9bb5cc;
  font-family: ${fonts.spartanBold};
  margin-top: 16px;
`;

const SimpleText = styled.Text`
  font-size: 20px;
  font-family: ${fonts.spartanR};
  color: #808080;
  text-align: center;
  margin: 16px 30px 16px 30px;
`;

export const EmptyListMessage = (props) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    unsubscribe();
  }, []);

  return (
    <NoResults style={{ ...props?.containerStyle, zIndex: 1 }}>
      {isConnected ? (
        <>
          <View>
            <Image
              source={require('../../assets/images/noResultsImg.png')}
              style={{ resizeMode: 'contain', height: 200 }}
            />
          </View>
          <Title>NADA POR AQUI!</Title>
          {props.alterText ? (
            <SimpleText>Nenhum item foi encontrado para esta escolha.</SimpleText>
          ) : (
            <SimpleText>Não encontramos nenhum item correspondente à sua pesquisa.</SimpleText>
          )}
        </>
      ) : (
        <>
          <NoConnection height={200} width={200} />
          <Title>SEM CONEXÃO</Title>
          <SimpleText>Conecte-se à internet para visualizar os itens.</SimpleText>
        </>
      )}
    </NoResults>
  );
};

const SelectView = styled.TouchableOpacity`
  height: 55px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 18px;
  padding-right: 18px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const DropdownText = styled.Text`
  flex: 1;
  font-size: ${fontSize.cardText};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
`;

const DropdownView = styled.View`
  height: 120px;
  width: 100%;
  top: 50px;
  background-color: #fff;
  position: absolute;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const selectBoxShadow = {
  distance: 2,
  startColor: 'rgba(0,0,0,0.035)',
  finalColor: 'rgba(0,0,0,0.0)',
  distance: 10,
  radius: 5,
};

export const DropdownSelection = (props) => {
  const [opened, setOpened] = useState(false);
  const dropDownHeight = props.data.items.length > 3 ? 160 : 135;
  const itemHeight = (dropDownHeight - 10) / props.data.items.length;

  return (
    <View style={[{ alignItems: 'center' }, props?.containerStyle]}>
      <Shadow {...selectBoxShadow} containerViewStyle={{ height: 55, width: '100%', zIndex: 4 }}>
        <SelectView
          style={[props?.selectContainerStyle, { zIndex: 4 }]}
          activeOpacity={buttonOpacity}
          disabled={props.disabled}
          onPress={() => setOpened(!opened)}
        >
          <DropdownText
            numberOfLines={1}
            style={{
              color: props.disabled || props.placeholder ? colors.gray : colors.text,
            }}
          >
            {props.data.selected}
          </DropdownText>
          <Icon
            name="chevron-down"
            type="material-community"
            color={props.disabled ? colors.gray : colors.text}
          />
        </SelectView>
      </Shadow>
      {opened ? (
        <DropdownView
          style={[
            {
              height: dropDownHeight,
              justifyContent: 'center',
              zIndex: 5,
            },
            props?.dropdownContainerStyle,
          ]}
        >
          <ScrollView
            contentContainerStyle={{ justifyContent: 'center' }}
            style={{ height: '90%', paddingVertical: props?.padding }}
          >
            {props.data.items.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={buttonOpacity}
                  style={{
                    height: itemHeight >= 40 ? itemHeight : 40,
                    justifyContent: 'center',
                    paddingRight: 18,
                    paddingLeft: 18,
                  }}
                  onPress={() => {
                    props.onSelect({
                      ...props.data,
                      selected: item.name,
                      value: item.id,
                    });
                    setOpened(!opened);
                  }}
                >
                  <DropdownText numberOfLines={1} style={{ marginBottom: 10 }}>
                    {item.name}
                  </DropdownText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </DropdownView>
      ) : null}
    </View>
  );
};

export const SortButton = (props) => {
  const [sorted, setSorted] = useState(true);

  const handleSortClick = () => {
    setSorted(!sorted);
    if (sorted) {
      let newList = [...props.data];

      newList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

      props.setData(newList);
    } else {
      props.setData(props.dataBackup);
    }
  };

  return (
    <TouchableOpacity onPress={() => handleSortClick()}>
      <Icon
        name="order-alphabetical-ascending"
        type="material-community"
        color={!sorted ? colors.orange : colors.gray}
        size={32}
        style={{ marginTop: 25, marginLeft: 25 }}
      />
    </TouchableOpacity>
  );
};

const mapStyle = {
  marginTop: 20,
  height: Dimensions.get('window').height * 0.3,
  width: Dimensions.get('window').width,
};

export const Map = (props) => {
  const routeParams = props.routeParams;

  const region = () => {
    const coordinates = routeParams.coordinate;
    if (coordinates.latitude == null || coordinates.longitude == null) {
      return {
        latitude: -8.8937513,
        longitude: -48.8113048,
        latitudeDelta: 20,
        longitudeDelta: 20,
      };
    } else {
      return {
        ...coordinates,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
  };

  return (
    <MapView style={mapStyle} initialRegion={region()}>
      {region().latitudeDelta != 20 ? (
        <Marker
          coordinate={{
            latitude: region().latitude,
            longitude: region().longitude,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Pin width={31} height={48} />
        </Marker>
      ) : null}
    </MapView>
  );
};

export const List = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const card = ({ item }) => {
    return (
      <Card
        value={item.id}
        key={item.id}
        color={item.ubsAmount != 0 ? colors.orange : colors.gray}
        onPress={() => props.handleCardPress(item)}
        text={item.name}
        ubsCount={item.ubsAmount ? `${item.ubsAmount}` : null}
      />
    );
  };

  return (
    <FlatList
      style={{
        width: '100%',
        marginTop: 25,
        paddingTop: 5,
        zIndex: -1,
      }}
      contentContainerStyle={{ alignItems: 'center' }}
      data={props.data}
      renderItem={props.card ? props.card : card}
      onRefresh={() => {
        setRefreshing(true);
        props?.onRefresh().then(() => setRefreshing(false));
      }}
      refreshing={refreshing}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={EmptyListMessage}
      ListFooterComponent={
        props.notRegistredData ? <InDevelopmentCard data={props.notRegistredData} /> : null
      }
    />
  );
};
