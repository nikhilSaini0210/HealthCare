import React, { useState, useEffect, FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Prescription {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  time: string[];
  duration: string;
  prescribedBy: string;
  uploadDate: string;
  imageUri?: string;
}

const ReminderScreen:FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      medicineName: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      time: ['08:00 AM', '02:00 PM', '08:00 PM'],
      duration: '7 days',
      prescribedBy: 'Dr. Sarah Johnson',
      uploadDate: '2024-11-01',
    },
    {
      id: '2',
      medicineName: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: ['09:00 AM'],
      duration: '30 days',
      prescribedBy: 'Dr. Michael Chen',
      uploadDate: '2024-10-28',
    },
    {
      id: '3',
      medicineName: 'Metformin',
      dosage: '850mg',
      frequency: '2 times daily',
      time: ['08:00 AM', '08:00 PM'],
      duration: 'Ongoing',
      prescribedBy: 'Dr. Emily Rodriguez',
      uploadDate: '2024-10-25',
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getTimeIcon = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 17) return '☀️';
    if (hour >= 17 && hour < 21) return '🌆';
    return '🌙';
  };

  const renderPrescriptionCard = (
    prescription: Prescription,
    index: number,
  ) => {
    const isExpanded = expandedId === prescription.id;
    const cardDelay = index * 100;

    return (
      <Animated.View
        key={prescription.id}
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 50],
                  outputRange: [0, 50],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => toggleExpand(prescription.id)}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            {/* Header Section */}
            <View style={styles.cardHeader}>
              <View style={styles.medicineIconContainer}>
                <Text style={styles.medicineIcon}>💊</Text>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.medicineName}>
                  {prescription.medicineName}
                </Text>
                <Text style={styles.dosage}>{prescription.dosage}</Text>
              </View>
              <View style={styles.expandIcon}>
                <Text style={styles.expandIconText}>
                  {isExpanded ? '▲' : '▼'}
                </Text>
              </View>
            </View>

            {/* Time Pills */}
            <View style={styles.timePillsContainer}>
              {prescription.time.map((time, idx) => (
                <View key={idx} style={styles.timePill}>
                  <Text style={styles.timeIcon}>{getTimeIcon(time)}</Text>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              ))}
            </View>

            {/* Expanded Details */}
            {isExpanded && (
              <Animated.View style={styles.expandedSection}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Frequency:</Text>
                  <Text style={styles.detailValue}>
                    {prescription.frequency}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.detailValue}>
                    {prescription.duration}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Prescribed by:</Text>
                  <Text style={styles.detailValue}>
                    {prescription.prescribedBy}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Upload Date:</Text>
                  <Text style={styles.detailValue}>
                    {new Date(prescription.uploadDate).toLocaleDateString()}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>⏰ Set Reminder</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButtonSecondary}>
                    <Text style={styles.actionButtonTextSecondary}>
                      📄 View Prescription
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>💊 Medicine Reminders</Text>
        <Text style={styles.headerSubtitle}>
          {prescriptions.length} Active Prescriptions
        </Text>
      </LinearGradient>

      {/* Prescription List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {prescriptions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No prescriptions uploaded yet</Text>
            <Text style={styles.emptySubtext}>
              Upload your prescription to get started
            </Text>
          </View>
        ) : (
          prescriptions.map((prescription, index) =>
            renderPrescriptionCard(prescription, index),
          )
        )}

        {/* Add Prescription Button */}
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButtonGradient}
          >
            <Text style={styles.addButtonText}>+ Add New Prescription</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  medicineIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicineIcon: {
    fontSize: 24,
  },
  headerTextContainer: {
    flex: 1,
  },
  medicineName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  dosage: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  expandIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandIconText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timePillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  timeIcon: {
    fontSize: 16,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  expandedSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  actionButtonTextSecondary: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#f5576c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReminderScreen;
