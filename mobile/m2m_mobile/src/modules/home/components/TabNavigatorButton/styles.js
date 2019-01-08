import { StyleSheet } from 'react-native';
import {
  spacing,
  colors,
} from '~/modules/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: spacing.regular,
    borderBottomRightRadius: spacing.regular,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.regular,
    paddingLeft: spacing.medium,
    paddingRight: spacing.regular,
  },
});
