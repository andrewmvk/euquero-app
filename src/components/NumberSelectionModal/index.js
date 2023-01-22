import React, { useState } from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../defaultStyles';
import {
  Grid,
  Header,
  HeaderText,
  ItemButton,
  ItemText,
  ModalContainer,
  ModalContent,
} from './styles';

export default (props) => {
  const renderItem = (item) => {
    return (
      <ItemButton
        key={item.number}
        style={{ borderColor: item.isValide ? colors.text : colors.gray }}
        disabled={!item.isValide}
        onPress={() => {
          props.setSelected(item.number);
          props.setVisibility(false);
        }}
      >
        <ItemText style={{ color: item.isValide ? colors.orange : colors.gray }}>
          {item.number}
        </ItemText>
      </ItemButton>
    );
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={() => props.setVisibility(false)}
      >
        <TouchableWithoutFeedback onPress={() => props.setVisibility(false)}>
          <ModalContainer>
            <Header>
              <HeaderText style={{ color: colors.text }}>Selecione um </HeaderText>
              <HeaderText>ID</HeaderText>
            </Header>
            <ModalContent>
              <Grid>
                {props.numbers.map((num) => {
                  return renderItem(num);
                })}
              </Grid>
            </ModalContent>
          </ModalContainer>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
