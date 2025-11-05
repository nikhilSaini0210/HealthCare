import { StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import AuthHeader from '../../components/auth/AuthHeader';
import CustomInput from '../../components/global/CustomInput';
import Account from '../../components/auth/Account';
import CustomButton from '../../components/global/CustomButton';
import { navigate, resetAndNavigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import { validateInput } from '../../utils/Valdations';
import EmailIcon from '../../assets/icons/EmailIcon';
import { colors } from '../../styles/colors';
import PasswordIcon from '../../assets/icons/PasswordIcon';

const RegisterScreen: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

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

  const validateConfirmPassword = (text: string) => {
    setPasswordConfirm(text.trim());
    if (!text.trim()) {
      setPasswordConfirmError('Confirm Password is required');
    } else if (password !== text.trim()) {
      setPasswordConfirmError('Passwords do not match');
    } else {
      setPasswordConfirmError('');
    }
  };

  const onRegister = () => {
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(passwordConfirm);

    if (emailError || passwordError || passwordConfirmError) return;

    if (!email || !password || !passwordConfirm) {
      setEmailError(!email ? 'Email is required' : '');
      setPasswordError(!password ? 'Password is required' : '');
      setPasswordConfirmError(
        !passwordConfirm ? 'Confirm Password is required' : '',
      );
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError('Passwords do not match');
      return;
    }

    resetAndNavigate(Routes.MainApp);
  };

  const onLogin = () => {
    navigate(Routes.Login);
  };

  return (
    <CustomSafeAreaView dismissKeyboard>
      <View style={styles.container}>
        <AuthHeader titile="REGISTER" />
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

        <CustomInput
          label="Confirm Password"
          value={passwordConfirm}
          onChangeText={validateConfirmPassword}
          error={passwordConfirmError}
          placeholder="Re-enter your password"
          autoCapitalize="none"
          secureTextEntry
          icon={<PasswordIcon color={colors.primaryText} size={20} />}
        />

        <Account
          title="Already have an account?"
          label="Login here"
          onPress={onLogin}
          containerStyle={styles.account}
        />

        <CustomButton
          title="REGISTER"
          onPress={onRegister}
          style={styles.btn}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.background,
  },
  btn: {
    backgroundColor: colors.blueBtn,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    marginVertical: 12,
  },
  account: {
    paddingVertical: 10,
  },
});
