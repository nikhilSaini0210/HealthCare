import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import Icon from '../global/Icon';
import { goBack } from '../../utils/NavigationUtil';

interface ReminderHeaderProps {
  title: string;
}

const ReminderHeader: FC<ReminderHeaderProps> = ({ title }) => {
  const onBackPress = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon
          iconFamily="Ionicons"
          size={28}
          color={colors.black}
          name="arrow-back"
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

export default ReminderHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background, // optional
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: 22,
    lineHeight: 30,
    color: colors.primaryText,
    textAlign: 'center',
  },
});
