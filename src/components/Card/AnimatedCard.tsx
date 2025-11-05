import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type Props = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  rounded?: boolean;
};

const AnimatedCard: React.FC<Props> = ({
  title,
  subtitle,
  children,
  style,
  rounded = true,
}) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity]);

  const containerStyles: (ViewStyle | TextStyle)[] = [
    styles.card,
    rounded ? styles.rounded : {},
    style || {},
    { transform: [{ translateY }] },
    { opacity },
  ];

  return (
    <Animated.View style={containerStyles as any}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: 16,
    marginVertical: 10,
  },
  rounded: {
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    color: colors.primaryText,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.PoppinsMedium,
    color: colors.primaryText,
    marginBottom: 8,
  },
});

export default AnimatedCard;
