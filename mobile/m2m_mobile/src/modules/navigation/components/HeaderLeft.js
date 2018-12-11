import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import { IconButton } from '~/modules/ui';
import { styles } from './styles';

export default class HeaderLeft extends PureComponent {
  @autobind
  handlePress() {
    const {
      onPress,
      navigation,
    } = this.props;

    if (_.isFunction(onPress)) {
      onPress();
      return;
    }

    navigation.goBack(null);
  }

  render() {
    const { iconName } = this.props;

    return (
      <IconButton
        name={iconName}
        onPress={this.handlePress}
        style={styles.headerLeft}
      />
    );
  }
}

HeaderLeft.propTypes = {
  iconName: PropTypes.string,
  onPress: PropTypes.func,
};

HeaderLeft.defaultProps = { iconName: 'arrowBack' };
