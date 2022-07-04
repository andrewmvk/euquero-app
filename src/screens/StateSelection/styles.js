import styled from 'styled-components/native'
import * as defaultS from '../../defaultStyles'

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`

export const SearchArea = styled.View`
  flex-direction: row;
  align-items: center;
`

export const SearchInput = styled.View`
  font-family: ${defaultS.fonts.spartanR};
  height: 55px;
  width: 72%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 18px;
  justify-content: center;
  margin-top: 25px;
  flex-direction: row;
`

export const SearchInputText = styled.TextInput`
  flex: 1;
  font-size: 18px;
  color: #7f7f7f;
`

export const Card1 = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  background-color: white;
  justify-content: center;
  border-radius: 5px;
  margin: 7px 0;
`
