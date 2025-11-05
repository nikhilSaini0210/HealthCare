import { Permission, PermissionsAndroid, Platform } from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  PhotoQuality,
} from 'react-native-image-picker';
import { pick, DocumentPickerResponse } from '@react-native-documents/picker';
import { showAlert } from '../utils/AlertUtil';

const imageOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: false,
  quality: 0.8 as PhotoQuality,
  maxWidth: 2000,
  maxHeight: 2000,
};

const checkCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Ok',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return true;
};

export const checkStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      let permissions: Permission[] = [];

      if (Platform.Version >= 33) {
        permissions = [PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES];
      } else {
        permissions = [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ];
      }

      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const allGranted = Object.values(granted).every(
        status => status === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allGranted) {
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      console.log(err);
      return false;
    }
  }

  return true;
};

const handleResponse = (
  response: ImagePickerResponse,
  allowMultiple = false,
): string[] => {
  if (response.didCancel) {
    console.log('User cancelled picker');
    return [];
  }

  if (response.errorMessage) {
    showAlert({ title: 'Error', message: response.errorMessage });
    return [];
  }

  if (!response.assets || response.assets.length === 0) {
    showAlert({ title: 'Error', message: 'No media selected' });
    return [];
  }

  const uris = response.assets
    .map(a => a.uri)
    .filter((uri): uri is string => uri !== undefined);

  return allowMultiple ? uris : uris.slice(0, 1);
};

export const pickImages = async (selectionLimit = 1): Promise<string[]> => {
  const hasPermission = await checkStoragePermission();

  if (!hasPermission) {
    showAlert({
      title: 'Permission Denied',
      message: 'Storage permission is required.',
    });
    return [];
  }

  return new Promise(resolve => {
    launchImageLibrary({ ...imageOptions, selectionLimit }, res =>
      resolve(handleResponse(res, selectionLimit > 1)),
    );
  });
};

export const takePhoto = async (): Promise<string[]> => {
  const hasPermission = await checkCameraPermission();

  if (!hasPermission) {
    showAlert({
      title: 'Permission Denied',
      message: 'Camera permission is required.',
    });
    return [];
  }

  return new Promise(resolve => {
    launchCamera({ ...imageOptions }, res => resolve(handleResponse(res)));
  });
};

const checkDocumentPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') return checkStoragePermission();
  return true;
};

export const pickDocument = async (): Promise<string | null> => {
  const hasPermission = await checkDocumentPermission();
  if (!hasPermission) {
    showAlert({
      title: 'Permission Denied',
      message: 'Storage permission is required to pick documents.',
    });
    return null;
  }

  try {
    const result: DocumentPickerResponse[] = await pick({
      allowMultiSelection: false,
      type: ['application/pdf'],
    });

    if (result.length === 0) return null;
    return result[0].uri;
  } catch (err: any) {
    if (err.code === 'USER_CANCELED') {
      console.log('User canceled document picker');
      return null;
    } else {
      showAlert({
        title: 'Error',
        message: err.message || 'Unknown error while picking document',
      });
      return null;
    }
  }
};
