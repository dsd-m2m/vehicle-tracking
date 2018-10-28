import _ from 'lodash';
import React from 'react';

import { TextInput as RNTextInput } from 'react-native';

import { textInputStyles as styles } from './style';

function resolveComponentStyle(props) {
  const {
    disabled,
    editable,
  } = props;

  if (!_.isUndefined(editable) && !editable) {
    return disabled
      ? styles.disabledReadonlyTextInput
      : styles.readonlyTextInput;
  }

  return disabled
    ? styles.disabledTextInput
    : styles.textInput;
}

export default function TextInput(props) {
  const { style } = props;
  const componentStyle = resolveComponentStyle(props);

  return (
    <RNTextInput
      underlineColorAndroid="transparent"
      {...props}
      style={[
        componentStyle,
        style,
      ]}
    />
  );
}

TextInput.propTypes = RNTextInput.propTypes;
