import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '~/modules/ui';
import { styles } from './styles';

export default function CarFunctionButton({
  on,
  togglable,
  ...props
}) {
  const buttonStyle = on ? styles.containerOn : styles.containerOff;
  const iconStyle = on ? styles.iconOn : styles.iconOff;

  return (
    <IconButton
      style={togglable ? buttonStyle : styles.container}
      iconStyle={togglable && iconStyle}
      {...props}
    />
  );
}

CarFunctionButton.propTypes = {
  on: PropTypes.bool,
  togglable: PropTypes.bool,
};
