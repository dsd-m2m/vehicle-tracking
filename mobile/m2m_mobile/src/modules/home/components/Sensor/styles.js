import { StyleSheet } from 'react-native';
import {
  spacing,
  colors,
} from '~/modules/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    marginTop: spacing.medium,
  },
});
