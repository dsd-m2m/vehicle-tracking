import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Screen,
  Card,
} from '~/modules/ui';

class CarInfoScreen extends PureComponent {
  render() {
    return (
      <Screen>
        <Card />
      </Screen>
    );
  }
}

CarInfoScreen.propTypes = {};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarInfoScreen);
