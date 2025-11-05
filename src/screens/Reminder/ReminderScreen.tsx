import React, { useRef, useState, useCallback, FC, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import PrescriptionDB from '../../service/prescription.service';
import EmptyState from '../../components/Reminder/EmptyState';
import CustomLoader from '../../components/Loader/CustomLoader';
import ReminderHeader from '../../components/Reminder/ReminderHeader';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { Prescription } from '../../types/interfaces';
import CustomImageModal from '../../components/modal/CustomImageModal';
import CustomPFModal from '../../components/modal/CustomPDFModal';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import PdfIcon from '../../assets/icons/PdfIcon';
import Icon from '../../components/global/Icon';
import CustomImage from '../../components/global/CustomImage';

const statusGradients: Record<string, string[][]> = {
  pending: [
    ['#FFD700', '#FFA500'],
    ['#FFA500', '#FFD700'],
  ],
  completed: [
    ['#90EE90', '#32CD32'],
    ['#32CD32', '#90EE90'],
  ],
  processed: [
    ['#ADD8E6', '#1E90FF'],
    ['#1E90FF', '#ADD8E6'],
  ],
  missed: [
    ['#FF7F50', '#FF4500'],
    ['#FF4500', '#FF7F50'],
  ],
};

const ReminderScreen: FC = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [selectedPdfUri, setSelectedPdfUri] = useState<string | null>(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const animatedValues = useRef<Animated.Value[]>([]);
  const gradientOpacity = useRef(new Animated.Value(0)).current;

  const loadPrescriptions = useCallback(async () => {
    const data = await PrescriptionDB.getAll();
    setPrescriptions(data);

    animatedValues.current = data.map(() => new Animated.Value(0));
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timerId);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadPrescriptions();
    }, [loadPrescriptions]),
  );

  useEffect(() => {
    if (!animatedValues.current.length) return;

    const animations = animatedValues.current.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    );
    Animated.stagger(100, animations).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientOpacity, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(gradientOpacity, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [gradientOpacity, prescriptions]);

  const onPressCard = (item: Prescription) => {
    if (item.type === 'image') {
      setSelectedImageUri(item.fileUri);
      setImageModalVisible(true);
    } else if (item.type === 'pdf') {
      setSelectedPdfUri(item.fileUri);
      setPdfModalVisible(true);
    } else {
      setSelectedImageUri(null);
      setImageModalVisible(false);
      setSelectedPdfUri(null);
      setPdfModalVisible(false);
    }
  };

  const onPressDelete = async (item: Prescription) => {
    await PrescriptionDB.remove(item.id);

    await loadPrescriptions();
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const opacity = animatedValues.current[index];
    const translateY = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    });

    const [gradient1, gradient2] = statusGradients[item.status] || [
      ['#87CEFA', '#4682B4'],
      ['#4682B4', '#87CEFA'],
    ];

    return (
      <Animated.View
        style={[styles.card, { opacity, transform: [{ translateY }] }]}
      >
        <View style={styles.gradientContainer}>
          <LinearGradient colors={gradient1} style={styles.gradient} />
          <Animated.View
            style={[styles.gradient, { opacity: gradientOpacity }]}
          >
            <LinearGradient colors={gradient2} style={styles.gradient} />
          </Animated.View>
          <TouchableOpacity
            onPress={() => onPressCard(item)}
            style={styles.cardContent}
            activeOpacity={0.7}
          >
            {item.type === 'image' ? (
              <CustomImage
                source={item.fileUri}
                imageStyle={styles.thumbnail}
                containerStyle={styles.imageBox}
              />
            ) : (
              <View style={styles.pdfCon}>
                <PdfIcon size={50} />
                <Text style={styles.subtitle}>{item.fileName}.pdf</Text>
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.patientName}
              </Text>
              <Text style={styles.subtitle}>{item.notes}</Text>
              <Text style={styles.subtitle}>Status: {item.status}</Text>
              <Text style={styles.date} numberOfLines={2} ellipsizeMode="tail">
                Reminder: {new Date(item.reminderDate).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delteTbn}
            onPress={() => onPressDelete(item)}
          >
            <Icon
              iconFamily="MaterialIcons"
              name="delete"
              color={colors.error}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <CustomSafeAreaView dismissKeyboard={false}>
      <ReminderHeader title="Reminder" />
      <FlatList
        data={prescriptions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyState}
      />

      <CustomImageModal
        visible={imageModalVisible}
        imageUri={selectedImageUri}
        onClose={() => {
          setImageModalVisible(false);
          setSelectedImageUri(null);
        }}
      />

      <CustomPFModal
        visible={pdfModalVisible}
        pdfUri={selectedPdfUri}
        onClose={() => {
          setSelectedPdfUri(null);
          setPdfModalVisible(false);
        }}
      />
    </CustomSafeAreaView>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
  },
  card: {
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  gradientContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {},
  pdfCon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageBox: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.primaryText,
    fontSize: 16,
  },
  subtitle: {
    color: colors.primaryText,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 18,
  },
  date: {
    color: colors.primaryText,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    marginTop: 4,
  },
  delteTbn: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#00000033',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
