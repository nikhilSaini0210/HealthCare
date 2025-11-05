import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import CustomImage from '../global/CustomImage';

interface PharmacyCardProps {
  name: string;
  distance: string;
  rating: string;
  reviews: string;
  image: number | { uri: string };
  onPress?: () => void;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({
  name,
  distance,
  rating,
  reviews,
  image,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <CustomImage
      source={image}
      imageStyle={styles.image}
      containerStyle={styles.fullImage}
    />
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.distance}>{distance}</Text>
      <Text style={styles.review}>
        ⭐ {rating} ({reviews} reviews)
      </Text>
    </View>
  </TouchableOpacity>
);

export default PharmacyCard;

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 20,
  },
  fullImage: {
    width: '100%',
    height: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 8,
  },
  name: {
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: 14,
    color: colors.primaryText,
  },
  distance: {
    color: colors.secondaryText,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    marginVertical: 2,
  },
  review: {
    color: '#FBBF24',
    fontSize: 12,
  },
});
