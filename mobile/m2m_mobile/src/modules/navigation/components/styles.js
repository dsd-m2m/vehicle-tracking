import {
  StyleSheet,
  Platform,
} from 'react-native';
import {
  colors,
  spacing,
  textStyles,
} from '~/modules/theme';

const headerStyle = {
  height: 56,
  backgroundColor: colors.headerBackground,
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
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
  centeredHeaderTitle: {
    ...textStyles.h1,
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
  },
  rightPaddedHeaderTitle: {
    ...textStyles.h1,
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    ...(Platform.OS === 'android' && { marginRight: 2 * spacing.medium + 40 }),
  },
  headerLeft: { marginLeft: spacing.regular + spacing.small },
  headerRight: { marginRight: spacing.regular + spacing.small },
  headerTitle: textStyles.h1,
});
