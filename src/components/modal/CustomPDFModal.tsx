import React, { FC, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from '../global/Icon';
import { colors } from '../../styles/colors';

interface Props {
  visible: boolean;
  pdfUri: string | null;
  onClose: () => void;
}

const CustomPDFModal: FC<Props> = ({ visible, pdfUri, onClose }) => {
  const [progress, setProgress] = useState(0);
  if (!pdfUri) return null;

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

        {progress < 1 && (
          <View style={styles.progressContainer}>
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={styles.progressText}>
              {Math.floor(progress * 100)}%
            </Text>
          </View>
        )}

        <Pdf
          source={{ uri: pdfUri }}
          style={styles.pdf}
          onError={(error: any) => console.log('PDF load error:', error)}
          trustAllCerts={false}
          onLoadProgress={(percent: number) => setProgress(percent)}
          onLoadComplete={() => setProgress(1)}
        />
      </View>
    </Modal>
  );
};

export default CustomPDFModal;

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
  pdf: {
    width: width * 0.95,
    height: height * 0.9,
    borderRadius: 8,
  },
  progressContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: colors.white,
    fontSize: 18,
    marginTop: 8,
    fontWeight: '600',
  },
});
