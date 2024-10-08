import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

export const colors = {
  orange: "#FF6B0F",
  text: "#7F7F7F",
  titleSubtitle: "#fff",
  backgroundMain: "#2C3196",
  backgroundSecond: "#F8F8F8",
  gray: "#C4C4C4",
};

export const fonts = {
  spartanL: "Spartan_300Light",
  spartanR: "Spartan_400Regular",
  spartanM: "Spartan_500Medium",
  spartanBold: "Spartan_700Bold",
  spartanBlack: "Spartan_900Black",
};

export const fontSizeNoUnits = {
  bigTitle: 22,
  cardText: 19,
  cardText2: 13,
  title: 17,
  textInput: 16,
  text: 15,
  header: 13,
  subtitle: 13,
  grade: 12,
};

export const fontSize = {
  bigTitle: `${fontSizeNoUnits.bigTitle}` + "px",
  cardText: `${fontSizeNoUnits.cardText}` + "px",
  cardText2: `${fontSizeNoUnits.cardText2}` + "px",
  title: `${fontSizeNoUnits.title}` + "px",
  textInput: `${fontSizeNoUnits.textInput}` + "px",
  text: `${fontSizeNoUnits.text}` + "px",
  header: `${fontSizeNoUnits.header}` + "px",
  subtitle: `${fontSizeNoUnits.subtitle}` + "px",
  grade: `${fontSizeNoUnits.grade}` + "px",
};

export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 2.2,

  elevation: 3,
};

export const buttonOpacity = 0.6;

export const navBarConfig = async (position, background, style) => {
  if(Platform.OS === 'android') {
    await NavigationBar.setPositionAsync(position ? position : 'absolute');
    await NavigationBar.setBackgroundColorAsync(background ? background : 'rgba(0,0,0,0.01)');
    await NavigationBar.setButtonStyleAsync(style ? style : 'dark');
  }
};
