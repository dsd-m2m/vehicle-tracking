import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { colors } from '~/modules/theme';
import Button from './Button';
import { textButtonStyles as styles } from './style';

function resolveTextStyle(props) {
  const {
    secondary,
    enabled,
  } = props;


  if (secondary) {
    return [styles.secondaryButtonText, !enabled && styles.secondaryButtonTextDisabled];
  }

  return styles.primaryButtonText;
}

function resolveSpinnerColor(props) {
  const { secondary } = props;

  if (secondary) {
    return colors.primary;
  }

  return colors.white;
}

export default function TextButton(props) {
  const {
    title,
    textStyle,
    waiting,
    enabled,
    ...buttonProps
  } = props;
  const componentStyle = resolveTextStyle(props);
  const spinnerColor = resolveSpinnerColor(props);
  const isEnabled = enabled && !waiting;

  return (
    <Button
      {...buttonProps}
      enabled={isEnabled}
    >
      {!waiting && (
        <Text
          style={[
            componentStyle,
            textStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
      {waiting && (
        <SkypeIndicator
          color={spinnerColor}
          size={20}
        />
      )}
    </Button>
  );
}

TextButton.propTypes = {
  title: PropTypes.string,
  textStyle: PropTypes.object,
  secondary: PropTypes.bool,
  enabled: PropTypes.bool,
  waiting: PropTypes.bool,
};

TextButton.defaultProps = { enabled: true };
