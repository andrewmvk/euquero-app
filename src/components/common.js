import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';

import {
  fonts,
  fontSize,
  fontSizeNoUnits,
  colors,
  buttonOpacity,
} from '../defaultStyles';

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
      style={buttonStyles.register}
      onPress={props.onPress}
    >
      {props.isLoading ? (
        <ActivityIndicator size='large' color='#fff' />
      ) : (
        <RegisterButtonText>
          {props.text ? props.text : 'TEXT'}
        </RegisterButtonText>
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
        <Icon
          name='plus'
          size={35}
          type='material-community'
          color={colors.orange}
        />
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
    width: screenWidth * 0.6,
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

  return (
    <Shadow {...cardShadow}>
      <TouchableOpacity
        activeOpacity={buttonOpacity}
        style={[cardStyles.container, { borderLeftColor: color }]}
        onPress={props.onPress ? props.onPress : null}
        disabled={props.onPress === undefined ? true : false}
      >
        {props.text ? (
          <Text style={cardStyles.cardText} numberOfLines={1}>
            {props.text}
          </Text>
        ) : null}
        {props.ubsCount ? (
          <Text style={cardStyles.avaibleUBSText}>
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
  const color = props.color ? props.color : colors.gray;

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d722',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723g',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723h',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723j',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723k',
      title: 'Third Item',
    },
  ];

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <Text style={{ color: '#7f7f7f', marginBottom: 5 }}>{item.title}</Text>
    );
  };

  return (
    <>
      <View>
        <Shadow {...cardShadow}>
          <View style={[cardA.containerA, { borderLeftColor: color }]}>
            <Text style={cardA.titleCardA} numberOfLines={1}>
              Em desenvolvimento...
            </Text>
            <Text style={cardA.descriptionCardA}>
              Estados a serem cadastrados:
            </Text>
          </View>
        </Shadow>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          style={{
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            backgroundColor: 'white',
            width: '95%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignSelf: 'center',
            marginBottom: 30,
          }}
          contentContainerStyle={{
            overflow: 'hidden',
          }}
        />
      </View>
    </>
  );
};

const inputBoxStyles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  searchInputText: {
    flex: 1,
    fontSize: fontSizeNoUnits.textInput,
    fontFamily: fonts.spartanR,
    color: colors.text,
    paddingRight: 15,
  },
});

const inputBoxShadow = {
  distance: 6,
  startColor: 'rgba(0,0,0,0.025)',
  finalColor: 'rgba(0,0,0,0.0)',
  radius: 5,
  containerViewStyle: { marginTop: 25, height: 50, width: '100%' },
};

export const InputBox = (props) => {
  return (
    <Shadow {...inputBoxShadow}>
      <View style={inputBoxStyles.searchInput}>
        <Icon
          name={
            props.type === 'password' ? 'lock-closed-outline' : 'person-outline'
          }
          type='ionicon'
          color={colors.gray}
          style={{
            paddingHorizontal: 15,
          }}
        />
        <TextInput
          style={inputBoxStyles.searchInputText}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder ? props.placeholder : 'PLACEHOLDER'}
          placerholderTextColor={colors.text}
          secureTextEntry={props.type === 'password' ? true : false}
        />
      </View>
    </Shadow>
  );
};

const NoResults = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
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
  return (
    <NoResults style={{ ...props?.containerStyle }}>
      <View>
        <Image
          source={require('../../assets/images/noResultsImg.png')}
          style={{ resizeMode: 'contain', height: 200 }}
        />
      </View>
      <Title>NADA POR AQUI!</Title>
      <SimpleText>
        Não encontramos nenhum item correspondente à sua pesquisa.
      </SimpleText>
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
  height: 150px;
  width: 100%;
  top: 55px;
  background-color: #fff;
  z-index: 100;
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
  return (
    <View style={props?.containerStyle}>
      <Shadow
        {...selectBoxShadow}
        containerViewStyle={{ height: 55, width: '100%' }}
      >
        <SelectView
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          activeOpacity={buttonOpacity}
          disabled={props.disabled}
          onPress={() => setOpened(!opened)}
        >
          <DropdownText
            numberOfLines={1}
            style={{ color: props.disabled ? colors.gray : colors.text }}
          >
            {props.data.selected}
          </DropdownText>
          <Icon
            name='chevron-down'
            type='material-community'
            color={props.disabled ? colors.gray : colors.text}
          />
        </SelectView>
      </Shadow>
      {opened ? (
        <DropdownView>
          <ScrollView>
            {props.data.items.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={buttonOpacity}
                  style={{
                    paddingBottom: 6,
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
