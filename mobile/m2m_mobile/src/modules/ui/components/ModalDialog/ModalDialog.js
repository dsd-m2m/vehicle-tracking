import React from 'react';
import {
  View,
  Modal,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { TextButton } from '../Button';
import { Card } from '../Card';
import { StatusBar } from '../StatusBar';
import { styles } from './styles';

export default function ModalDialog({
  title,
  error,
  onPress,
  buttonTitle,
  active,
}) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={active}
      onRequestClose={onPress}
    >
      <View style={styles.container}>
        {Platform.OS !== 'ios'
          && (
            <StatusBar
              backgroundColor="rgba(0,0,0,0.7)"
              barStyle="light-content"
            />
          )
        }
        <Card style={styles.contentContainer}>
          <Text
            h2
            style={styles.title}
          >
            {title}
          </Text>
          <Text
            body
            style={styles.error}
          >
            {error}
          </Text>
          <TextButton
            title={buttonTitle}
            primary
            onPress={onPress}
          />
        </Card>
      </View>
    </Modal>
  );
}

ModalDialog.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  onPress: PropTypes.func,
  buttonTitle: PropTypes.string,
  active: PropTypes.bool,
};
