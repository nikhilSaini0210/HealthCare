import { StatusBar } from 'react-native';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../utils/NavigationUtil';
import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import { Routes } from './Routes';
import MainApp from './MainApp';
import { colors } from '../styles/colors';
import { RootStackParamList } from './RouteParams';
import FullScreenLoader from '../screens/Loader/FullScreenLoader';
import ReminderScreen from '../screens/Reminder/ReminderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.Splash}
      >
        <Stack.Screen name={Routes.Splash} component={SplashScreen} />
        <Stack.Screen name={Routes.Login} component={LoginScreen} />
        <Stack.Screen name={Routes.Register} component={RegisterScreen} />
        <Stack.Screen name={Routes.Loader} component={FullScreenLoader} />
        <Stack.Screen name={Routes.MainApp} component={MainApp} />
        <Stack.Screen name={Routes.Reminder} component={ReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
