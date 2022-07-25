import React from 'react';
import DashedCircle from '../../components/DashedCircle';
import Header from '../../components/Header';

export default (props) => {
  return (
    <>
      <DashedCircle />
      <Header text={'Administrativo - Upload'} onPress={() => props.navigation.goBack()} />
    </>
  );
};
