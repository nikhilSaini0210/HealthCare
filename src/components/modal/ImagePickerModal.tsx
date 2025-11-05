import React, { FC } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseImage: () => void;
  onPickDocument: () => void;
}

const ImagePickerModal: FC<ImagePickerModalProps> = ({
  visible,
  onClose,
  onTakePhoto,
  onChooseImage,
  onPickDocument,
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
          <Text style={styles.title}>Select Option</Text>

          <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
            <Text style={styles.buttonText}>📸 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onChooseImage}>
            <Text style={styles.buttonText}>🖼️ Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onPickDocument}>
            <Text style={styles.buttonText}>📄 Pick Document</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancel]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.primaryText,
    fontFamily: Fonts.PoppinsSemiBold,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    backgroundColor: colors.blueBtn,
    borderRadius: 12,
    paddingVertical: 12,
    marginVertical: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
  },
  cancel: {
    backgroundColor: colors.lightGray,
  },
  cancelText: {
    color: colors.primaryText,
  },
});
