import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
} from '~/modules/theme';

export const styles = StyleSheet.create({
  screen: { backgroundColor: colors.white },
  content: {
    marginHorizontal: spacing.medium,
    marginTop: spacing.regular,
  },
  header: {
    flexDirection: 'row',
    marginVertical: spacing.regular,
  },
  scrollView: {
    marginTop: spacing.extraLarge,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
