import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import { rf } from '../../scale/responsive';

interface Props {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const TouchableText: FC<Props> = ({
  onPress,
  label,
  containerStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={containerStyle}
    >
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TouchableText;

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: rf(14),
    color: colors.primaryText,
  },
});
