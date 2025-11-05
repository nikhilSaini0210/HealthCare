import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';

const ReminderScreen: FC = () => {
  return (
    <CustomSafeAreaView>
      <Text>ReminderScreen</Text>
    </CustomSafeAreaView>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({});
