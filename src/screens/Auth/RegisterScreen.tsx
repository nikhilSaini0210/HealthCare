import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';

const RegisterScreen: FC = () => {
  return (
    <CustomSafeAreaView dismissKeyboard>
      <Text>RegisterScreen</Text>
    </CustomSafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
