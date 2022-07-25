import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors, fonts, fontSize, fontSizeNoUnits } from '../../defaultStyles';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const InputArea = styled.View`
  width: 80%;
`;

export const BigInputView = styled.View`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 5px;
`;

export const BigInput = styled.TextInput`
  height: 50px;
  font-size: ${fontSize.textInput};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
  padding-left: 20px;
  padding-right: 20px;
`;

export const SmallInputsArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SmallInputView = styled.View`
  height: 50px;
  width: 48%;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 25px;
`;

export const SmallInput = styled.TextInput`
  flex: 1;
  font-size: ${fontSize.textInput};
  font-family: ${fonts.spartanR};
  color: ${colors.text};
  padding-left: 20px;
  padding-right: 20px;
`;

export const ButtonView = styled.View`
  height: 25px;
  width: 90%;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 70px;
`;

export const MediumTitle = styled.Text`
  font-family: ${fonts.spartanM};
  font-size: ${fontSize.title};
  color: ${colors.text};
  margin: 25px 0;
`;

export const extraStyles = StyleSheet.create({
  indicatorTitle: {
    color: colors.text,
    fontSize: fontSizeNoUnits.text,
    fontFamily: fonts.spartanR,
  },
  bodyView: {
    marginTOp: 12,
    justifyContent: 'center',
  },
  textInputView: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 16,
  },
  textInput: {
    height: 50,
    fontSize: fontSizeNoUnits.textInput,
    fontFamily: fonts.spartanR,
    color: colors.text,
    paddingHorizontal: 20,
  },
  dividingLine: {
    width: '20%',
    height: 1,
    backgroundColor: colors.gray,
    alignContent: 'center',
    marginBottom: 20,
  },
  selectionBox: {
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 25,
  },
  selectionDropdownBox: {
    marginTop: -5,
    borderRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 0,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  selectionDropdownText: {
    color: '#ababab',
    fontSize: fontSizeNoUnits.textInput,
    fontFamily: fonts.spartanR,
  },
});
