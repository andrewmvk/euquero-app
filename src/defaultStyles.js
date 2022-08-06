import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';

//Default styles variables

export const colors = {
  orange: '#FF6B0F',
  text: '#7F7F7F',
  titleSubtitle: '#fff',
  backgroundMain: '#2C3196',
  backgroundSecond: '#F8F8F8',
  gray: '#C4C4C4',
};

export const fonts = {
  spartanL: 'Spartan_300Light',
  spartanR: 'Spartan_400Regular',
  spartanM: 'Spartan_500Medium',
  spartanBold: 'Spartan_700Bold',
  spartanBlack: 'Spartan_900Black',
};

export const fontSizeNoUnits = {
  bigTitle: 22,
  cardText: 19,
  title: 17,
  textInput: 16,
  text: 15,
  header: 13,
  subtitle: 13,
};

export const fontSize = {
  bigTitle: `${fontSizeNoUnits.bigTitle}` + 'px',
  cardText: `${fontSizeNoUnits.cardText}` + 'px',
  title: `${fontSizeNoUnits.title}` + 'px',
  textInput: `${fontSizeNoUnits.textInput}` + 'px',
  text: `${fontSizeNoUnits.text}` + 'px',
  header: `${fontSizeNoUnits.header}` + 'px',
  subtitle: `${fontSizeNoUnits.subtitle}` + 'px',
};

export const buttonOpacity = 0.6;

const screenWidth = Dimensions.get('window').width;

//================================================= DEFAULT COMPONENTS =================================================

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
        <BigTitleText>{props.text}</BigTitleText>
        <Line></Line>
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

const cardShadow = {
  distance: 2,
  startColor: 'rgba(0,0,0,0.035)',
  finalColor: 'rgba(0,0,0,0.0)',
  distance: 10,
  radius: 5,
  containerViewStyle: {
    marginVertical: 7,
    height: 71,
    width: screenWidth * 0.85,
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
          <Text style={cardStyles.avaibleUBSText}>{props.ubsCount + ' UBS'}</Text>
        ) : null}
        {props.children ? { ...props.children } : null}
      </TouchableOpacity>
    </Shadow>
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
          name={props.type === 'password' ? 'lock-closed-outline' : 'person-outline'}
          type="ionicon"
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

export const EmptyListMessage = () => {
  return (
    <NoResults>
      <View>
        <Image
          source={require('../assets/images/noResultsImg.png')}
          style={{ resizeMode: 'contain', height: 200 }}
        />
      </View>
      <Title>NADA POR AQUI!</Title>
      <SimpleText>Não encontramos nenhum item correspondente à sua pesquisa.</SimpleText>
    </NoResults>
  );
};
