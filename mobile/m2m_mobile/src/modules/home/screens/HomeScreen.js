import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import {
  Screen,
  IconButton,
  Card,
} from '~/modules/ui';

class HomeScreen extends PureComponent {
  @autobind
  handlePowerPress() {

  }

  @autobind
  handleRadiatorPress() {

  }

  @autobind
  handleFanPress() {

  }

  render() {
    return (
      <Screen>
        <View>
          <IconButton />
          <IconButton />
          <IconButton />
        </View>
        <Card />
      </Screen>
    );
  }
}

HomeScreen.propTypes = {};


function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
