import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { colors } from '~/modules/theme';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { styles } from './style';

export default function TextItem({
  onPress,
  leftIcon,
  rightIcon,
  RightIconComponent,
  style,
  children,
}) {
  const ContainerComponent = onPress ? TouchableOpacity : View;
  const hasRightComponent = React.isValidElement(RightIconComponent);

  return (
    <ContainerComponent
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={styles.leftContainer}>
        {leftIcon && <Icon name={leftIcon} />}
        <Text
          h3-strong-indication
          style={styles.text}
        >
          {children}
        </Text>
      </View>
      {hasRightComponent && RightIconComponent}
      {rightIcon && (
        <Icon
          name={rightIcon}
          color={colors.gray}
        />
      )}
    </ContainerComponent>
  );
}

TextItem.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  RightIconComponent: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};
