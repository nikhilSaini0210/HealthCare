import React, { useState, useRef, ReactNode, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { hp, rf, wp } from '../../scale/responsive';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  icon?: ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  labelStyle?: TextStyle;
  showError?: boolean;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<Props> = ({
  label,
  error,
  icon,
  containerStyle,
  inputStyle,
  errorStyle,
  labelStyle,
  showError = true,
  value,
  secureTextEntry = false,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const errorAnimation = useRef(new Animated.Value(0)).current;
  const borderAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error && showError) {
      Animated.spring(errorAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
        tension: 40,
      }).start();
    } else {
      Animated.timing(errorAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [error, errorAnimation, showError]);

  useEffect(() => {
    Animated.timing(borderAnimation, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [borderAnimation, isFocused]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const borderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? colors.error : colors.primaryText,
      error ? colors.error : colors.borderActive,
    ],
  });

  const errorTranslateY = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-hp(1.5), 0],
  });

  const errorOpacity = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Animated.View
        style={[
          styles.inputContainer,
          { borderColor },
          error && styles.inputContainerError,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={
            [
              styles.input,
              icon ? styles.inputWithIcon : undefined,
              inputStyle,
            ] as StyleProp<TextStyle>
          }
          value={value}
          onFocus={handleFocus}
          secureTextEntry={secureTextEntry}
          onBlur={handleBlur}
          placeholderTextColor={colors.placeholder}
          {...props}
        />
      </Animated.View>
      {showError && error && (
        <Animated.View
          style={[
            styles.errorContainer,
            {
              opacity: errorOpacity,
              transform: [{ translateY: errorTranslateY }],
            },
          ]}
        >
          <Text style={[styles.errorText, errorStyle]}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
  },
  label: {
    fontSize: rf(12),
    fontFamily: Fonts.RobotoRegular,
    color: colors.label,
    marginBottom: hp(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(0.3),
    borderRadius: wp(3),
    backgroundColor: colors.white,
    minHeight: hp(6.5),
    paddingHorizontal: wp(4),
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  iconContainer: {
    marginRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: rf(14),
    color: colors.primaryText,
    padding: 0,
    fontFamily: Fonts.RobotoRegular,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  errorContainer: {
    marginTop: hp(0.5),
    paddingHorizontal: wp(1),
  },
  errorText: {
    fontSize: rf(13),
    color: colors.error,
    fontFamily: Fonts.RobotoRegular,
  },
});

export default CustomInput;
