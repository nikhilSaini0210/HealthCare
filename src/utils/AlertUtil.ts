import { Alert } from 'react-native';

interface AlertOptions {
  title?: string;
  message: string;
  onOkPress?: () => void;
}

export const showAlert = ({
  title = 'Error',
  message,
  onOkPress,
}: AlertOptions) => {
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: onOkPress ?? (() => {}),
    },
  ]);
};
