import React, { useRef, useState, useCallback, FC, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
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
  const animatedValues = useRef<Animated.Value[]>([]);
  const gradientOpacity = useRef(new Animated.Value(0)).current;

  const loadPrescriptions = useCallback(async () => {
    setLoading(true);
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
          <TouchableOpacity style={styles.cardContent} activeOpacity={0.7}>
            <Image
              source={{ uri: item.thumbnailUri }}
              style={styles.thumbnail}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.patientName} • {item.type.toUpperCase()}
              </Text>
              <Text
                style={styles.subtitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.fileName} — {item.notes}
              </Text>
              <Text style={styles.date} numberOfLines={1} ellipsizeMode="tail">
                {new Date(item.reminderDate).toLocaleString()}
              </Text>
            </View>
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 6,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  subtitle: {
    color: '#444',
    marginTop: 2,
  },
  date: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
});
