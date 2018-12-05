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
  borderRadius: 4,
  height: 46,
  paddingHorizontal: gutter.large,
};

const primaryButton = { backgroundColor: colors.primary };

const secondaryButton = {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: colors.primary,
};

const warningButton = { backgroundColor: colors.warning };

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    ...button,
    ...primaryButton,
  },
  warningButton: {
    ...button,
    ...warningButton,
  },
  primaryButtonDisabled: { backgroundColor: colors.gray },
  secondaryButton: {
    ...button,
    ...secondaryButton,
  },
  secondaryButtonDisabled: { borderColor: colors.gray },
  secondaryButtonText: { color: colors.primary },
  secondaryButtonTextDisabled: { color: colors.gray },
});

export const textButtonStyles = {
  primaryButtonText: textStyles.button,
  secondaryButtonText: [
    textStyles.button,
    buttonStyles.secondaryButtonText,
  ],
  secondaryButtonTextDisabled: buttonStyles.secondaryButtonTextDisabled,
};
