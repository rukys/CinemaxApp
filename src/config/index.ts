import Config from 'react-native-config';

export const API_HOST = Config.API_HOST ?? '';
export const API_TIMEOUT = Number(Config.API_TIMEOUT) || 10000;
export const ACCESS_TOKEN = Config.ACCESS_TOKEN ?? '';
