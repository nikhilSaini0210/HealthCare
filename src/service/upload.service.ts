import axios from 'axios';
import RNFS from 'react-native-fs';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  TIMEOUT,
} from '../api/config';
import { showAlert } from '../utils/AlertUtil';
import { validateFileSize, validateFileType } from '../utils/Valdations';

const getFilePath = async (uri: string) => {
  if (uri.startsWith('content://')) {
    const destPath = `${RNFS.TemporaryDirectoryPath}/${Date.now()}.pdf`;
    await RNFS.copyFile(uri, destPath);
    return destPath;
  }
  return uri;
};

const getMimeTypeFromUrl = async (url: string) => {
  try {
    const head = await axios.head(url);
    return head.headers['content-type'] || 'application/octet-stream';
  } catch {
    return 'application/octet-stream';
  }
};

const mimeToExt = (mimeType: string) => {
  if (!mimeType) return 'bin';
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.includes('jpeg')) return 'jpeg';
  if (mimeType.includes('jpg')) return 'jpg';
  if (mimeType.includes('png')) return 'png';
  return 'bin';
};

export const uploadToCloudinary = async ({
  fileUri,
  fileName,
  mimeType,
}: any) => {
  try {
    if (!fileUri) {
      showAlert({ title: 'Error', message: 'No file selected.' });
      return;
    }

    if (!validateFileType(mimeType, fileName)) {
      showAlert({
        title: 'Error',
        message: 'Only PNG, JPEG, JPG, and PDF files are allowed',
      });
      throw new Error('Only PNG, JPEG, JPG, and PDF files are allowed');
    }

    const filePath = await getFilePath(fileUri);
    const fileInfo = await RNFS.stat(filePath);
    if (!validateFileSize(fileInfo.size)) {
      showAlert({
        title: 'Error',
        message: 'File size must be less than 10MB',
      });
      throw new Error('File size must be less than 10MB');
    }

    const formData = new FormData();

    if (mimeType === 'application/pdf') {
      formData.append('file', {
        uri: fileUri,
        name: fileName,
        type: mimeType,
      } as any);
    } else {
      const base64 = await RNFS.readFile(filePath, 'base64');
      const fileData = `data:${mimeType};base64,${base64}`;
      formData.append('file', fileData);
    }

    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'prescriptions');

    const uploadType = mimeType === 'application/pdf' ? 'raw' : 'image';

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${uploadType}/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: TIMEOUT,
      },
    );

    if (response.status === 200 && response.data.secure_url) {
      return response.data;
    } else {
      showAlert({
        title: 'Error',
        message: 'Cloudinary upload failed',
      });
      throw new Error('Cloudinary upload failed');
    }
  } catch (err: any) {
    const errorMsg =
      err?.response?.data?.error?.message ||
      'Failed to upload prescription. Please try again.';
    showAlert({
      title: 'Error',
      message: errorMsg,
    });
    throw new Error(errorMsg);
  }
};

export const uploadFromUrl = async (url: string) => {
  if (!url || !url.trim()) {
    showAlert({ title: 'Error', message: 'Please enter a valid URL.' });
    return;
  }

  const urlPattern = /^https?:\/\/.+/i;
  if (!urlPattern.test(url)) {
    showAlert({ title: 'Error', message: 'Please enter a valid URL.' });
    return;
  }

  let downloadDest = '';
  try {
    const mimeType = await getMimeTypeFromUrl(url);

    const ext = mimeToExt(mimeType);
    const fileName = `file_${Date.now()}.${ext}`;
    downloadDest = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

    const download = await RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
    }).promise;

    if (download.statusCode !== 200) {
      throw new Error('Failed to download file from URL');
    }

    const uploadedData = await uploadToCloudinary({
      fileUri: downloadDest,
      fileName,
      mimeType,
    });

    await RNFS.unlink(downloadDest);

    if (uploadedData && uploadedData.secure_url) {
      return uploadedData;
    } else {
      showAlert({ title: 'Error', message: 'Cloudinary upload failed.' });
    }
  } catch (err: any) {
    console.error('URL upload error:', err);
    showAlert({
      title: 'Error',
      message:
        err?.message ||
        'Failed to upload from URL. Please check the URL and try again.',
    });
  }
};
