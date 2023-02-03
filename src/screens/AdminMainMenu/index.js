import React from 'react';
import { Icon } from 'react-native-elements';
import { ScrollView, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { Container, ManageTouchableBox, ManageBoxShadow, ManageText } from './styles';
import Header from '../../components/Header';
import DashedCircle from '../../components/DashedCircle';
import { buttonOpacity, colors } from '../../defaultStyles';

const manageBoxes = [
  {
    text: 'Gerenciar Contas',
    navigateTo: 'ManageAccounts',
    iconName: 'account-cog',
    adminOnly: true,
  },
  {
    text: 'Gerenciar UBS',
    navigateTo: 'ManageUBS',
    iconName: 'bank',
    adminOnly: false,
  },
  {
    text: 'Gerenciar Indicadores',
    navigateTo: 'ManageScorecards',
    iconName: 'book',
    adminOnly: false,
  },
  {
    text: 'Gerenciar Serviços',
    navigateTo: 'ManageServices',
    iconName: 'medical-bag',
    adminOnly: false,
  },
];

export default (props) => {
  return (
    <>
      <DashedCircle />
      <Container>
        <Header text={'Administrativo'} onPress={() => props.navigation.goBack()} />

        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ marginTop: 20, paddingTop: 20, width: '100%' }}
        >
          {manageBoxes.map((item) => {
            if (!item.adminOnly || (item.adminOnly && props.route.params.isAdmin)) {
              return (
                <Shadow key={item.text} {...ManageBoxShadow}>
                  <ManageTouchableBox
                    activeOpacity={buttonOpacity}
                    onPress={() => props.navigation.navigate(item.navigateTo)}
                  >
                    <Icon
                      name={item.iconName}
                      size={70}
                      type="material-community"
                      color={colors.text}
                    />
                    <ManageText>{item.text}</ManageText>
                  </ManageTouchableBox>
                </Shadow>
              );
            }
          })}
          <View style={{ height: 40 }} />
        </ScrollView>
      </Container>
    </>
  );
};
