import { FC, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import HomeIcon from '../assets/icons/HomeIcon';
import CalendarIcon from '../assets/icons/CalendarIcon';
import DocumentIcon from '../assets/icons/DocumentIcon';
import MessageIcon from '../assets/icons/MessageIcon';
import { TabBarIconProps } from '../types/interfaces';
import { Routes } from './Routes';

const TabBarIcon: FC<TabBarIconProps> = ({ name, color, size, focused }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused, scaleAnim]);

  const renderIcon = () => {
    switch (name) {
      case Routes.Home:
        return <HomeIcon color={color} size={size} />;
      case Routes.Default:
        return <CalendarIcon color={color} size={size} />;
      case Routes.DefaultB:
        return <DocumentIcon color={color} size={size} />;
      case Routes.Pharmacy:
        return <MessageIcon color={color} size={size} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {renderIcon()}
    </Animated.View>
  );
};

export default TabBarIcon;
