import { ALLOWED_FORMATS, MAX_FILE_SIZE } from '../api/config';
import { InputType } from '../types/interfaces';

export const validateInput = (type: InputType, value: string): boolean => {
  const trimmedValue = value.trim();

  switch (type) {
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(trimmedValue);
    }

    case 'password': {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(trimmedValue);
    }

    case 'phone': {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(trimmedValue);
    }

    case 'name': {
      const nameRegex = /^[A-Za-z\s]+$/;
      return nameRegex.test(trimmedValue);
    }

    default:
      return false;
  }
};

export const validateFileType = (
  mimeType: string,
  fileName: string,
): boolean => {
  if (ALLOWED_FORMATS.includes(mimeType)) return true;

  const ext = fileName.toLowerCase().split('.').pop();
  return ['png', 'jpeg', 'jpg', 'pdf'].includes(ext || '');
};

export const validateFileSize = (size: number): boolean => {
  if (size > MAX_FILE_SIZE) {
    return false;
  }
  return true;
};
