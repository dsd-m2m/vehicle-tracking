import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TripsScreen extends PureComponent {
  render() {
    return (
      <Screen>
        <View />
      </Screen>
    );
  }
}

TripsScreen.propTypes = {};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TripsScreen);
