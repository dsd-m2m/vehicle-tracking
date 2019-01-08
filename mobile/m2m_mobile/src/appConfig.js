import Config from 'react-native-config';

export default {
  apiBaseUrl: 'm2m-dev.eu-central-1.elasticbeanstalk.com/api',
  socketUrl: 'http://m2m-dev.eu-central-1.elasticbeanstalk.com',
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
  google: {
    appId: '758979408479-goveeriu15321hbui93t610k069kv5ao.apps.googleusercontent.com',
    callback: 'com.dsd.m2m:/oauth2redirect',
  },
};
