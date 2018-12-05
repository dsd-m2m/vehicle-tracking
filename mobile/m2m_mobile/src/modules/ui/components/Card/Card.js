import React from 'react';
import {
  View,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';

export default function Card({
  children,
  style
}) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
};
