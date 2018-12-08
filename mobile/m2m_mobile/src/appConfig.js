import Config from 'react-native-config';

export default {
  apiBaseUrl: Config.API_BASE_URL,
  applicationId: Config.APP_ID,
  auth: {
    email: Config.AUTH_USER,
    pass: 'vN:A\\{_u~P_9#4n7',
  },
  intercom: {
    appId: Config.INTERCOM_APP_ID,
    iOSApiKey: Config.INTERCOM_IOS_API_KEY,
    AndroidApiKey: Config.INTERCOM_ANDROID_API_KEY,
  },
};
