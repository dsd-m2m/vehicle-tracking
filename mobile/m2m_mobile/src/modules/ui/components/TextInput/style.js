import { spacing } from '~/modules/theme';

const textInput = {
  alignSelf: 'stretch',
  backgroundColor: '#fff',
  borderWidth: 1,
  borderRadius: 4,
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
