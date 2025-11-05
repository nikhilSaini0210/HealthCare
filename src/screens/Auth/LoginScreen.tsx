import { StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { colors } from '../../styles/colors';
import CustomInput from '../../components/global/CustomInput';
import { validateInput } from '../../utils/Valdations';
import EmailIcon from '../../assets/icons/EmailIcon';
import PasswordIcon from '../../assets/icons/PasswordIcon';
import CustomButton from '../../components/global/CustomButton';
import { resetAndNavigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';

const LoginScreen: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text: string) => {
    setEmail(text.trim());
    if (!text.trim()) {
      setEmailError('Email is required');
    } else if (!validateInput('email', text)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text.trim());
    if (!text.trim()) {
      setPasswordError('Password is required');
    } else if (!validateInput('password', text)) {
      setPasswordError(
        'Password must be at least 8 characters with letters and numbers',
      );
    } else {
      setPasswordError('');
    }
  };

  const onLogin = () => {
    resetAndNavigate(Routes.MainApp)
  }

  return (
    <CustomSafeAreaView dismissKeyboard>
      <View style={styles.container}>
        <CustomInput
          label="Email"
          value={email}
          onChangeText={validateEmail}
          error={emailError}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<EmailIcon color={colors.primaryText} size={20} />}
        />

        <CustomInput
          label="Password"
          value={password}
          onChangeText={validatePassword}
          error={passwordError}
          placeholder="Enter your password"
          autoCapitalize="none"
          secureTextEntry
          icon={<PasswordIcon color={colors.primaryText} size={20} />}
        />

        <CustomButton title="LOGIN" onPress={onLogin} style={styles.btn} />
      </View>
    </CustomSafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  btn: {
    backgroundColor: colors.blueBtn,
  },
});
