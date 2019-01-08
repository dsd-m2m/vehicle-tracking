import { StyleSheet } from 'react-native';
import { spacing } from '~/modules/theme';

export const styles = StyleSheet.create({
  horizontalContainer: {
    marginTop: spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
