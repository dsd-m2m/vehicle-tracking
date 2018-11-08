import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { autobind } from 'core-decorators';
import { icons } from './assets';

const iconTypes = _.join(_.keys(icons));

export default class Icon extends PureComponent {
  @autobind
  resolveIconStyle() {
    const {
      color,
      style,
      size,
    } = this.props;

    const sizeStyle = size && {
      height: size,
      width: size,
    };
    const colorStyle = color && { tintColor: color };

    return [
      sizeStyle,
      colorStyle,
      style,
    ];
  }

  render() {
    const {
      name,
      style,
      color,
      size,
      ...otherProps
    } = this.props;

    const resolvedIcon = icons[name];

    if (!resolvedIcon) {
      throw new Error(
        `Unsupported Icon name. Name should be one of the following: ${iconTypes}`,
      );
    }

    return (
      <Image
        source={resolvedIcon}
        style={this.resolveIconStyle()}
        {...otherProps}
      />
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  ...Image.propTypes,
};
