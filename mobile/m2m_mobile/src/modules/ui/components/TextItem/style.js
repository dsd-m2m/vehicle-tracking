import { StyleSheet } from 'react-native';
import { gutter } from '~/modules/theme';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: gutter.extraLarge,
    paddingHorizontal: gutter.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
  },
  text: {
    paddingHorizontal: gutter.large,
    paddingTop: gutter.small,
  },

});
