import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import AnimatedCard from '../../components/Card/AnimatedCard';
import { colors } from '../../styles/colors';
import HomeHeader from '../../components/Home/HomeHeader';
import TabButton from '../../components/Home/TabButton';
import { sections } from '../../utils/helper';
import { SectionsProps } from '../../types/interfaces';
import { Fonts } from '../../styles/fonts';
import CustomButton from '../../components/global/CustomButton';
import DoctorIcon from '../../assets/icons/DoctorIcon';
import BottleIcon from '../../assets/icons/BottleIcon';
import { navigate, resetAndNavigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import StorageService from '../../service/storage.service';
import { ACCESS_TOKEN_KEY } from '../../api/config';
import { showAlert } from '../../utils/AlertUtil';

const HomeScreen: FC = () => {
  const onPressTab = (value: string) => {
    if (value === 'Reminders') {
      navigate(Routes.Reminder);
    }
  };

  const onMenu = async () => {
    showAlert({
      title: 'Logout',
      message: 'Do you want to Logout?',
      showCancel: true,
      cancelText: 'No',
      okText: 'Yes',
      onOkPress: async () => {
        await StorageService.removeItem(ACCESS_TOKEN_KEY);
        resetAndNavigate(Routes.Login);
      },
    });
  };

  return (
    <CustomSafeAreaView dismissKeyboard={false}>
      <View style={styles.container}>
        <HomeHeader onMenu={onMenu} />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gridRow}>
            {sections.map((s: SectionsProps) => (
              <TabButton
                key={s.id}
                item={s}
                onPress={() => onPressTab(s.label)}
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>UPLOAD PRESCRIPTION</Text>
          <Text style={styles.sectionSub}>
            Upload a Prescription and Tell Us What you Need. We do the Rest.!
          </Text>

          <AnimatedCard style={styles.animatedCard}>
            <Text style={styles.title}>Flat 25% OFF ON{'\n'}MEDICINES</Text>
            <CustomButton
              onPress={() => {}}
              title="ORDER NOW"
              style={styles.primaryBtn}
            />
          </AnimatedCard>

          <AnimatedCard style={[styles.animatedCardB, styles.bgColorA]}>
            <View style={styles.cardText}>
              <Text style={styles.title}>
                Get the Best{'\n'}Medical Service
              </Text>
              <Text style={styles.subtitle}>
                Rem illum facere quo corporis Quis in saepe itaque ut quos
                pariatur. Qui numquam rerum hic repudiandae rerum id amet
                tempore nam molestias omnis qui earum voluptatem!
              </Text>
            </View>

            <DoctorIcon />
          </AnimatedCard>

          <AnimatedCard style={[styles.animatedCardB, styles.bgColorB]}>
            <View style={styles.cardText}>
              <Text style={styles.title}>UPTO{'\n'}80 %</Text>
              <Text style={styles.title}>On Health Products</Text>
              <CustomButton
                onPress={() => {}}
                title="SHOP NOW"
                style={[styles.primaryBtn, styles.btm]}
              />
            </View>
            <BottleIcon />
          </AnimatedCard>
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  scrollView: {
    paddingTop: 14,
    paddingBottom: 80,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    marginTop: 6,
    fontFamily: Fonts.PoppinsBold,
    fontSize: 16,
    color: colors.primaryText,
  },
  sectionSub: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.secondaryText,
    marginBottom: 6,
  },
  cardText: {
    flex: 1,
  },
  animatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    marginTop: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.PoppinsMedium,
    color: colors.primaryText,
    marginTop: 6,
  },
  animatedCardB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 30,
  },
  bgColorA: {
    backgroundColor: colors.cardA,
  },
  bgColorB: {
    backgroundColor: colors.cardB,
  },
  primaryBtn: {
    backgroundColor: colors.blueBtn,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minHeight: 42,
  },
  btm: {
    width: '60%',
    marginTop: 10,
  },
});
