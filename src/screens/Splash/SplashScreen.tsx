import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { resetAndNavigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';

const SplashScreen: FC = () => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      resetAndNavigate(Routes.Login);
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
