import {
  Platform,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

export function isIPhoneX() {
  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && (height === 812 || height === 896)
  );
}

export function ifIPhoneX(iPhoneXStyle) {
  if (isIPhoneX()) {
    return iPhoneXStyle;
  }

  return {};
}

export function getStatusBarHeight() {
  if (Platform.OS === 'ios') {
    return isIPhoneX() ? 44 : 20;
  }

  return 0;
}

export function isAndroid() {
  return Platform.OS === 'android';
}
