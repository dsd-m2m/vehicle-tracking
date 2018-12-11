import { StyleSheet } from 'react-native';
import { spacing } from '~/modules/theme';

export const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  contentContainer: { alignItems: 'center' },
  buttonContainer: {
    flex: 0,
    marginTop: spacing.medium,
  },
  title: { textAlign: 'center' },
  body: {
    textAlign: 'center',
    marginTop: spacing.medium,
  },
  textInput: { marginTop: spacing.medium },
});
