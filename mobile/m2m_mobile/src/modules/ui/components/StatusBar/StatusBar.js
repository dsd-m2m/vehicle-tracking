import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar as RNStatusBar } from 'react-native';

export default function StatusBar(props) {
  return (
    <RNStatusBar {...props} />
  );
}

StatusBar.propTypes = {
  barStyle: PropTypes.string,
  backgroundColor: PropTypes.string,
  ...StatusBar.propTypes,
};

StatusBar.defaultProps = {
  barStyle: 'dark-content',
  backgroundColor: 'transparent',
};
