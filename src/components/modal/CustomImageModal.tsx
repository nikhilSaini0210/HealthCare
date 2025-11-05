import React, { FC } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from '../global/Icon';
import { colors } from '../../styles/colors';
import CustomImage from '../global/CustomImage';

interface Props {
  visible: boolean;
  imageUri: string | null;
  onClose: () => void;
}

const CustomImageModal: FC<Props> = ({ visible, imageUri, onClose }) => {
  if (!imageUri) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalBackground}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon
            iconFamily="Ionicons"
            size={28}
            color={colors.white}
            name="arrow-back"
          />
        </TouchableOpacity>
        <CustomImage
          source={imageUri}
          imageStyle={styles.image}
          containerStyle={styles.fullImage}
        />
      </View>
    </Modal>
  );
};

export default CustomImageModal;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    borderRadius: 20,
  },
  fullImage: {
    width: width * 0.9,
    height: height * 0.8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 12,
  },
});
