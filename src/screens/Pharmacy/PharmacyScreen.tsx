import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { pharmacies } from '../../utils/helper';
import PharmacyCard from '../../components/Pharmacy/PharmacyCard';
import UploadOption from '../../components/Pharmacy/UploadOption';
import AnimatedButton from '../../components/Pharmacy/AnimatedButton';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import LocationIcon from '../../assets/icons/LocationIcon';

const PharmacyScreen: FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <CustomSafeAreaView dismissKeyboard={false} style={styles.container}>
      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.locationCon}>
          <LocationIcon />
          <Text style={styles.location}>Mohali</Text>
        </View>

        <Text style={styles.title}>Pharmacy Nearby</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pharmacies.map((item, idx) => (
            <PharmacyCard key={idx} {...item} />
          ))}
        </ScrollView>

        <Text style={styles.uploadTitle}>Upload Prescription</Text>
        <Text style={styles.uploadSubtitle}>
          We will show the pharmacy that fits as per your prescription.
        </Text>

        <View style={styles.uploadContainer}>
          <UploadOption icon="link" label="Upload Link" />
          <UploadOption icon="upload" label="Upload File" />
        </View>

        <AnimatedButton
          title="Continue"
          onPress={() => console.log('Continue')}
        />
      </Animated.ScrollView>
    </CustomSafeAreaView>
  );
};

export default PharmacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  locationCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  location: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.primaryText,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryText,
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryText,
    marginTop: 20,
    textAlign: 'center',
  },
  uploadSubtitle: {
    color: colors.secondaryText,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginVertical: 8,
  },
  uploadContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginTop: 16,
    backgroundColor: colors.white,
  },
});
