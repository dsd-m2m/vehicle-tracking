import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
import { textStyles } from '~/modules/theme';

export function resolveComponentStyle(props) {
  const {
    h1,
    h2,
    h3,
    h4,
    'h3-strong': h3strong,
    'h3-strong-indication': h3strongIndication,
    todo,
    screen,
    button,
    date,
    notification,
  } = props;

  if (h1) {
    return textStyles.h1;
  }

  if (h2) {
    return textStyles.h2;
  }

  if (h3) {
    return textStyles.h3;
  }

  if (h3strong) {
    return textStyles['h3-strong'];
  }

  if (h3strongIndication) {
    return textStyles['h3-strong-indication'];
  }

  if (h4) {
    return textStyles.h4;
  }

  if (todo) {
    return textStyles.todo;
  }

  if (screen) {
    return textStyles.screen;
  }

  if (button) {
    return textStyles.button;
  }

  if (date) {
    return textStyles.date;
  }

  if (notification) {
    return textStyles.notification;
  }

  return textStyles.body;
}

export default function Text(props) {
  const { style } = props;
  const componentStyle = resolveComponentStyle(props);

  return (
    <RNText
      {...props}
      style={[
        componentStyle,
        style,
      ]}
    />
  );
}

Text.propTypes = {
  ...RNText.propTypes,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  'h3-strong': PropTypes.bool,
  'h3-strong-indication': PropTypes.bool,
  title: PropTypes.bool,
  label: PropTypes.bool,
  date: PropTypes.bool,
  notification: PropTypes.bool,
};
