import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import { hp, rf } from '../../scale/responsive';

interface Props {
  titile: string;
}

const AuthHeader: FC<Props> = ({ titile }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titile}</Text>
      <View style={styles.content}>
        <Text style={styles.appName}>Health Care</Text>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: rf(18),
    color: colors.primaryText,
    textAlign: 'center',
  },
  content: {
    paddingVertical: hp(2.5),
  },
  appName: {
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: rf(30),
    color: colors.primaryText,
    textAlign: 'center',
  },
});
