import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CarInfoScreen extends PureComponent {
  render() {
    return (
      <Screen>
        <View />
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
