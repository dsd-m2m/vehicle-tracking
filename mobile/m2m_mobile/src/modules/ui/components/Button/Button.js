import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
} from 'react-native';

import { buttonStyles as styles } from './style';

export function resolveComponentStyle(props) {
  const {
    secondary,
    enabled,
    warning,
  } = props;


  if (secondary) {
    return [styles.secondaryButton, !enabled && styles.secondaryButtonDisabled];
  }

  if (warning) {
    return [styles.warningButton, !enabled && styles.primaryButtonDisabled];
  }

  return [styles.primaryButton, !enabled && styles.primaryButtonDisabled];
}

export default function Button(props) {
  const {
    children,
    style,
    enabled,
  } = props;
  const componentStyle = resolveComponentStyle(props);

  const ContainerComponent = enabled ? TouchableOpacity : View;

  return (
    <ContainerComponent
      {...props}
      style={[
        componentStyle,
        style,
      ]}
    >
      {children}
    </ContainerComponent>
  );
}

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  secondary: PropTypes.bool,
  enabled: PropTypes.bool,
  warning: PropTypes.bool,
};

Button.defaultProps = { enabled: true };
