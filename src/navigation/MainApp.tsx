import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Routes } from './Routes';
import HomeScreen from '../screens/Home/HomeScreen';
import PharmacyScreen from '../screens/Pharmacy/PharmacyScreen';
import TabBarIcon from './TabBarIcon';
import DefaultScreen from '../screens/Default/DefaultScreen';
import { Dimensions, Platform } from 'react-native';
import { hp, wp } from '../scale/responsive';

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');

const screenOptions = ({
  route,
}: {
  route: RouteProp<ParamListBase, string>;
}): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.activeTab,
  tabBarInactiveTintColor: colors.inActiveTab,
  tabBarStyle: {
    backgroundColor: colors.bottomTabBackground,
    height: Platform.OS === 'ios' ? hp(9) : hp(8),
    paddingBottom: Platform.OS === 'ios' ? hp(2) : hp(1),
    paddingTop: hp(1),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarIcon: ({ color, focused }) => (
    <TabBarIcon
      name={route.name}
      color={color}
      size={width < 400 ? wp(6) : wp(8)}
      focused={focused}
    />
  ),
});

const MainApp: FC = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen name={Routes.Home} component={HomeScreen} />
    <Tab.Screen name={Routes.Default} component={DefaultScreen} />
    <Tab.Screen name={Routes.DefaultB} component={DefaultScreen} />
    <Tab.Screen name={Routes.Pharmacy} component={PharmacyScreen} />
  </Tab.Navigator>
);

export default MainApp;
