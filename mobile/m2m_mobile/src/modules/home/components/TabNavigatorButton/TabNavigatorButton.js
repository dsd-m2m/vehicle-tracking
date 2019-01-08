import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '~/modules/ui';
import { styles } from './styles';
import { Icon } from '../../../ui';

export default function TabNavigatorButton({
  name,
  onPress,
  children,
}) {
  return (
    <View style={styles.container}>
      {children}
      <TouchableOpacity
        style={styles.inner}
        onPress={onPress}
      >
        <Text h2>{name}</Text>
        <Icon name="arrowRight" />
      </TouchableOpacity>
    </View>
  );
}

TabNavigatorButton.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node,
};
