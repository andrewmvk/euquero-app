import React from 'react';
import { TouchableOpacity } from 'react-native';
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
  spartanBold: 'Spartan_700Bold',
  spartanBlack: 'Spartan_900Black',
};

export const fontSize = {
  bigTitle: '23px',
  title: '17px',
  header: '13px',
  subtitle: '13px',
};

export const buttonOpacity = 0.6;

//Default components

export function TouchableArrow(props) {
  return (
    <TouchableOpacity
      {...props}
      style={{ height: '100%', width: 30, justifyContent: 'center', zIndex: 5 }}
    >
      <Icon name="chevron-back-outline" type="ionicon" color={colors.orange} />
    </TouchableOpacity>
  );
}

const customButtonShadow = {
  small: {
    distance: 0,
    startColor: 'rgba(0,0,0,0.1)',
    offset: [0, 4],
    radius: 20,
    containerViewStyle: { paddingBottom: 2 },
  },
  large: {
    distance: 0,
    startColor: 'rgba(0,0,0,0.1)',
    offset: [0, 4],
    radius: 25,
    containerViewStyle: { paddingBottom: 2 },
  },
};

const buttonStyles = {
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
};

const SmallButtonText = styled.Text`
  color: ${colors.titleSubtitle};
  font-size: ${fontSize.subtitle};
  font-family: ${fonts.spartanR};
`;

export function SmallButton(props) {
  return (
    <Shadow {...customButtonShadow.small}>
      <TouchableOpacity activeOpacity={buttonOpacity} style={{ ...buttonStyles.small }} {...props}>
        <SmallButtonText>{props.text ? props.text : 'TEXT'}</SmallButtonText>
      </TouchableOpacity>
    </Shadow>
  );
}

const LargeButtonText = styled.Text`
  color: ${colors.titleSubtitle};
  font-family: ${fonts.spartanR};
  font-size: ${fontSize.title};
`;

export function LargeButton(props) {
  return (
    <Shadow {...customButtonShadow.large}>
      <TouchableOpacity activeOpacity={buttonOpacity} style={{ ...buttonStyles.large }} {...props}>
        <LargeButtonText>{props.text ? props.text : 'TEXT'}</LargeButtonText>
      </TouchableOpacity>
    </Shadow>
  );
}
