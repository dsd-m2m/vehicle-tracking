import { StyleSheet } from 'react-native';
import {
  colors,
  gutter,
  textStyles,
} from '~/modules/theme';

const button = {
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 24,
  height: 46,
  paddingHorizontal: gutter.large,
  borderColor: colors.active,
  borderWidth: 1,
};

const warningButton = { backgroundColor: colors.warning };

export const buttonStyles = StyleSheet.create({
  primaryButton: { ...button },
  warningButton: {
    ...button,
    ...warningButton,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.white,
    borderColor: colors.inactive,
  },
});

export const textButtonStyles = {
  primaryButtonText: textStyles.button,
  primaryButtonTextDisabled: {
    ...textStyles.button,
    color: colors.inactive,
  },
};
