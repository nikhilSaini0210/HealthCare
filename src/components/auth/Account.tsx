import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import TouchableText from '../global/TouchableText';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';

interface Props {
  title: string;
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

const Account: FC<Props> = ({ title, label, onPress, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableText
        label={label}
        onPress={onPress}
        labelStyle={styles.label}
      />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 30,
  },
  title: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: 14,
    color: colors.primaryText,
  },
  label: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: 14,
    color: colors.blueText,
  },
});
