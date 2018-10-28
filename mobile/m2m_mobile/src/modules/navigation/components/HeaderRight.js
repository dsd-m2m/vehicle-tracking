import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import { IconButton } from '~/modules/ui';
import { styles } from './styles';

export default class HeaderRight extends PureComponent {
  @autobind
  handlePress() {
    const { onPress } = this.props;

    if (_.isFunction(onPress)) {
      onPress();
    }
  }

  render() {
    const { iconName } = this.props;

    return (
      <IconButton
        name={iconName}
        onPress={this.handlePress}
        style={styles.headerRight}
      />
    );
  }
}

HeaderRight.propTypes = {
  iconName: PropTypes.string,
  onPress: PropTypes.func,
};
