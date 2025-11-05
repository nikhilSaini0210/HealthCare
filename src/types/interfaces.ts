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
