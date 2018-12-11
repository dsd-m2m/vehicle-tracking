import {
  spacing, colors,
} from '~/modules/theme';

const textInput = {
  alignSelf: 'stretch',
  backgroundColor: colors.cardBackground,
  borderBottomColor: colors.black,
  color: colors.black,
  textAlign: 'center',
  borderBottomWidth: 1,
  flexDirection: 'row',
  height: 40,
  marginBottom: spacing.small,
  paddingHorizontal: spacing.medium,
};

const disabledTextInput = {};

const readonlyTextInput = { fontStyle: 'italic' };

const invalidTextInput = {};

export const textInputStyles = {
  textInput,
  disabledTextInput: [
    textInput,
    disabledTextInput,
  ],
  invalidTextInput: [
    textInput,
    invalidTextInput,
  ],
  readonlyTextInput: [
    textInput,
    readonlyTextInput,
  ],
  disabledReadonlyTextInput: [
    textInput,
    readonlyTextInput,
    disabledTextInput,
  ],
};
