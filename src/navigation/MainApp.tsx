import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Routes } from './Routes';
import HomeScreen from '../screens/Home/HomeScreen';
import PharmacyScreen from '../screens/Pharmacy/PharmacyScreen';
import TabBarIcon from './TabBarIcon';

const Tab = createBottomTabNavigator();

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
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarIcon: ({ color, size, focused }) => (
    <TabBarIcon name={route.name} color={color} size={size} focused={focused} />
  ),
});

const MainApp: FC = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen name={Routes.Home} component={HomeScreen} />
    <Tab.Screen name={Routes.Default} component={HomeScreen} />
    <Tab.Screen name={Routes.Reminder} component={HomeScreen} />
    <Tab.Screen name={Routes.Pharmacy} component={PharmacyScreen} />
  </Tab.Navigator>
);

export default MainApp;
