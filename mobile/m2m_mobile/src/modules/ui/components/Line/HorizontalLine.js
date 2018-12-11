import React from 'react';
import {
  View, ViewPropTypes,
} from 'react-native';
import { styles } from './styles';

export default function HorizontalLine({ style }) {
  return <View style={[styles.horizontalLine, style]} />;
}

HorizontalLine.propTypes = { style: ViewPropTypes.style };
