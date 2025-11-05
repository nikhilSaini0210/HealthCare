import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BurgerIcon from '../../assets/icons/BurgerIcon';
import LogoIcon from '../../assets/icons/LogoIcon';
import MicIcon from '../../assets/icons/MicIcon';
import { colors } from '../../styles/colors';

type HeaderProps = {
  onMenu?: () => void;
  onMic?: () => void;
};

const HomeHeader: React.FC<HeaderProps> = ({ onMenu, onMic }) => {
  return (
    <View style={hstyles.container}>
      <TouchableOpacity onPress={onMenu} style={hstyles.iconBox}>
        <BurgerIcon />
      </TouchableOpacity>

      <View style={hstyles.logoBox}>
        <LogoIcon size={37} />
      </View>

      <TouchableOpacity
        onPress={onMic}
        style={hstyles.micBox}
        accessibilityLabel="Voice search"
      >
        <View style={hstyles.micCircle}>
          <MicIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const hstyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    flex: 1,
    marginLeft: 20,
  },
  micBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
