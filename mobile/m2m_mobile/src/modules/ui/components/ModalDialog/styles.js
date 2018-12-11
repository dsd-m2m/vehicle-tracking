import { StyleSheet } from 'react-native';
import {
  colors,
  gutter,
} from '~/modules/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  contentContainer: {
    padding: gutter.medium,
    backgroundColor: colors.white,
    borderRadius: 6,
  },
  title: {
    marginBottom: gutter.medium,
    textAlign: 'center',
  },
  error: {
    marginBottom: gutter.medium,
    textAlign: 'center',
  },
});
