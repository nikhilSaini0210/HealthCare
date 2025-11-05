import { StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { colors } from '../../styles/colors';
import CustomInput from '../../components/global/CustomInput';
import { validateInput } from '../../utils/Valdations';
import EmailIcon from '../../assets/icons/EmailIcon';
import PasswordIcon from '../../assets/icons/PasswordIcon';
import CustomButton from '../../components/global/CustomButton';
import { navigate, replace, resetAndNavigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import AuthHeader from '../../components/auth/AuthHeader';
import TouchableText from '../../components/global/TouchableText';
import Account from '../../components/auth/Account';

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
    // validateEmail(email);
    // validatePassword(password);

    // if (emailError || passwordError) return;

    // if (!email || !password) {
    //   setEmailError(!email ? 'Email is required' : '');
    //   setPasswordError(!password ? 'Password is required' : '');
    //   return;
    // }
    navigate(Routes.Loader, {routes: Routes.MainApp});
  };

  const onForgetPassword = () => {
    console.log('Forgot password');
  };

  const onRegister = () => {
    navigate(Routes.Register);
  };

  return (
    <CustomSafeAreaView dismissKeyboard>
      <View style={styles.container}>
        <AuthHeader titile="LOGIN" />
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

        <TouchableText
          label="Forgot Password!"
          onPress={onForgetPassword}
          labelStyle={styles.forgot}
        />

        <Account
          title={`Don't Have an Account:`}
          label={'Click here to register'}
          onPress={onRegister}
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
  forgot: {
    textAlign: 'right',
    color: colors.blueText,
  },
});
