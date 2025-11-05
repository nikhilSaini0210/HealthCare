import React, { FC } from 'react';
import { Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { SectionsProps } from '../../types/interfaces';
import QuestionIcon from '../../assets/icons/QuestionIcon';
import ReminderIcon from '../../assets/icons/ReminderIcon';
import MessageAIcon from '../../assets/icons/MessageAIcon';
import CalanderAIcon from '../../assets/icons/CalanderAIcon';

type Props = {
  item: SectionsProps;
  onPress?: () => void;
  style?: ViewStyle;
};

 const TabButton: FC<Props> = ({ item, onPress, style }) => {
  const getIcon = () => {
    switch (item.label) {
      case 'Questions':
        return <QuestionIcon />;
      case 'Reminders':
        return <ReminderIcon />;
      case 'Messages':
        return <MessageAIcon />;
      case 'Calendar':
        return <CalanderAIcon />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, style]}
      accessibilityLabel={item.label}
    >
      <Text style={styles.text}>{item.label}</Text>
      {getIcon()}
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondaryText,
    marginBottom: 10,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    color: colors.secondaryText,
  },
});
