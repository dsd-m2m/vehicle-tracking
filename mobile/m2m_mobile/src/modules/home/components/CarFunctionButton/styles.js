import { StyleSheet } from 'react-native';
import {
  spacing,
  colors,
} from '~/modules/theme';

const container = {
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
  padding: spacing.medium + spacing.small,
  marginHorizontal: spacing.regular,
  marginTop: spacing.medium,
  borderColor: colors.active,
  backgroundColor: colors.white,
  borderWidth: 3,
};

export const styles = StyleSheet.create({
  container: { ...container },
  containerOn: {
    ...container,
    borderColor: colors.functionOn,
  },
  containerOff: {
    ...container,
    borderColor: colors.functionOff,
  },
  iconOn: { tintColor: colors.functionOn },
  iconOff: { tintColor: colors.functionOff },
});
