import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import FileIcon from '../../assets/icons/FileIcon';
import UploadIcon from '../../assets/icons/UploadIcon';
import { Fonts } from '../../styles/fonts';

interface UploadOptionProps {
  label: string;
  onPress?: () => void;
  icon: string;
}

const UploadOption: React.FC<UploadOptionProps> = ({ label, onPress, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'link':
        return <FileIcon />;
      case 'upload':
        return <UploadIcon />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={styles.option}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {getIcon()}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default UploadOption;

const styles = StyleSheet.create({
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    color: colors.primaryText,
    fontFamily: Fonts.PoppinsSemiBold,
  },
});
