import { Dimensions } from 'react-native';

const {
  height,
  width,
} = Dimensions.get('window');

export const spacing = {
  small: 4,
  regular: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

export const dimensions = {
  fillParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  fullScreen: {
    height,
    width,
  },
};
