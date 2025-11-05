export const API_BASE_URL = 'https://foodnestserver.onrender.com/api';

export const TIMEOUT = 30000;

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const CLOUDINARY_CLOUD_NAME = 'dpeinctev';
export const CLOUDINARY_UPLOAD_PRESET = 'health_care_uploads';
export const ALLOWED_FORMATS = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/pdf',
];
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const endPoints = {
  login: '/healtauth/login',
  register: '/healtauth/register',
  refresh_token: '/healtauth/refresh-token',
  reset_password: '/healtauth/reset-password',
  logout: '/healtauth/logout',
};
