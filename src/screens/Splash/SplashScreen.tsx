import React, { FC, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { navigate, resetAndNavigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import StorageService from '../../service/storage.service';
import { ACCESS_TOKEN_KEY } from '../../api/config';

const { width } = Dimensions.get('window');

const SplashScreen: FC = () => {
  const scale = useRef(new Animated.Value(0)).current;

  const checkUserLogin = async () => {
    try {
      const { success, data: token } = await StorageService.getItem(
        ACCESS_TOKEN_KEY,
      );
      if (success && token) {
        navigate(Routes.Loader, {routes: Routes.MainApp});
      } else {
        resetAndNavigate(Routes.Login);
      }
    } catch (error) {
      console.log('Splash check error:', error);
      resetAndNavigate(Routes.Login);
    }
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        checkUserLogin();
      }, 1500);
    });
  }, [scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logo, { transform: [{ scale }] }]}>
        <Text style={styles.logoText}>Healthcare</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: colors.blueBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.white,
    fontSize: 30,
    fontFamily: Fonts.PoppinsSemiBold,
    textAlign: 'auto',
  },
});

export default SplashScreen;
