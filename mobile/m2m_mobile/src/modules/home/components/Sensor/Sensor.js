import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from '~/modules/ui';
import { styles } from './styles';

export default function Sensor({
  name,
  value,
}) {
  return (
    <View style={styles.container}>
      <Text sensorName>{name}</Text>
      <Text>{value}</Text>
    </View>
  );
}

Sensor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
};
