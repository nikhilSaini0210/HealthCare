import AsyncStorage from '@react-native-async-storage/async-storage';

type Prescription = {
  id: string;
  patientName: string;
  type: string;
  fileName: string;
  fileUri: string;
  thumbnailUri: string;
  notes: string;
  uploadedBy: string;
  status: string;
  createdAt: string;
  reminderDate: string;
};

class PrescriptionDB {
  private static masterKey = 'PRESCRIPTIONS_DB';

  static async getAll(): Promise<Prescription[]> {
    try {
      const data = await AsyncStorage.getItem(this.masterKey);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to get prescriptions:', err);
      return [];
    }
  }

  static async save(prescription: Prescription) {
    try {
      const all = await this.getAll();
      const index = all.findIndex(p => p.id === prescription.id);

      if (index >= 0) all[index] = prescription;
      else all.push(prescription);

      await AsyncStorage.setItem(this.masterKey, JSON.stringify(all));
    } catch (err) {
      console.error('Failed to save prescription:', err);
    }
  }

  static async remove(id: string) {
    try {
      const all = await this.getAll();
      const filtered = all.filter(p => p.id !== id);
      await AsyncStorage.setItem(this.masterKey, JSON.stringify(filtered));
    } catch (err) {
      console.error('Failed to remove prescription:', err);
    }
  }
  
  static async clear() {
    try {
      await AsyncStorage.removeItem(this.masterKey);
    } catch (err) {
      console.error('Failed to clear prescriptions:', err);
    }
  }
}

export default PrescriptionDB;
