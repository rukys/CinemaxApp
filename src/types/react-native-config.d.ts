declare module 'react-native-config' {
  export interface NativeConfig {
    API_HOST?: string;
    API_TIMEOUT?: string;
    ACCESS_TOKEN?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
