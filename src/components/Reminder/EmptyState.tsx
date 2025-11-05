import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

const EmptyState: FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No prescriptions available.</Text>
      <Text style={styles.emptySubText}>
        You can add new prescriptions to see them here.
      </Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 150,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
});
