import { StyleSheet } from 'react-native';
import {
  spacing,
  colors,
} from '~/modules/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'column',
    marginHorizontal: spacing.medium,
    marginTop: spacing.medium,
    padding: spacing.medium,
    borderRadius: spacing.small,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
