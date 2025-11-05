export type FontType =
  | 'Poppins-Bold'
  | 'Poppins-SemiBold'
  | 'Roboto-Regular'
  | 'Poppins-Medium';

export type IconFamily =
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'AntDesign'
  | 'MaterialIcons';

export type InputType = 'email' | 'password' | 'phone' | 'name';

export interface TabBarIconProps {
  name: string;
  color: string;
  size: number;
  focused?: boolean;
}

export interface IconProps {
  size?: number;
  color?: string;
}

export interface SectionsProps {
  id: number;
  label: string;
}

export type PrescType = 'image' | 'pdf' | 'link';

export interface Prescription {
  id: string;
  patientName: string;
  type: PrescType;
  fileName: string;
  fileUri: string;
  thumbnailUri?: string;
  notes?: string;
  uploadedBy?: 'user' | 'clinic' | 'hospital' | 'doctor' | 'lab';
  status?: 'pending' | 'processed' | 'expired';
  createdAt: string;
  reminderDate?: string;
}
