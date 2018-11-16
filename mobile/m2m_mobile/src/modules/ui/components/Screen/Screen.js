import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import StatusBar from '../StatusBar';
import { styles } from './styles';

export default function Screen({ children }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      {children}
    </View>
  );
}

Screen.propTypes = { children: PropTypes.node };
