import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles } from './styles';

class LoadingScreen extends PureComponent {
  render() {
    return (
      <Screen style={styles.container}>
        <View />
      </Screen>
    );
  }
}

LoadingScreen.propTypes = {};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
