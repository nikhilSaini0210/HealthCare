import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import CustomButton from '../global/CustomButton';

interface LinkInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const LinkInputModal: FC<LinkInputModalProps> = ({
  visible,
  onClose,
  onSubmit,
  value,
  setValue,
  loading,
}) => {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Enter Prescription Link</Text>

          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="https://example.com/prescription.jpg"
            style={styles.input}
            placeholderTextColor={colors.secondaryText}
            autoCapitalize="none"
            keyboardType="url"
          />

          <CustomButton
            style={styles.submitButton}
            loading={loading}
            title={'Upload'}
            onPress={onSubmit}
          />

          <CustomButton
            style={[styles.submitButton, styles.cancelButton]}
            title={'Cancel'}
            textStyle={[styles.submitText, styles.cancelText]}
            onPress={onClose}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default LinkInputModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.primaryText,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: colors.primaryText,
    marginBottom: 14,
  },
  submitButton: {
    backgroundColor: colors.blueBtn,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 4,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    fontFamily: Fonts.PoppinsMedium,
    color: colors.white,
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
  },
  cancelText: {
    color: colors.primaryText,
  },
});
