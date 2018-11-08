import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  textStyles,
} from '~/modules/theme';

const headerStyle = {
  height: 60,
  backgroundColor: colors.background,
};

export const styles = StyleSheet.create({
  header: headerStyle,
  borderlessHeader: {
    ...headerStyle,
    borderWidth: 0,
    borderBottomWidth: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 0,
    shadowColor: 'transparent',
  },
  headerLeft: { marginLeft: spacing.regular + spacing.small },
  headerRight: { marginRight: spacing.regular + spacing.small },
  headerTitle: textStyles.title,
});
