import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Vibration,
} from 'react-native';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import {
  Screen,
  Card,
  Text,
} from '~/modules/ui';
import { styles } from './styles';
import {
  CarFunctionButton,
  Sensor,
} from '../components';
import { TabNavigatorButton } from '../components/TabNavigatorButton';
import { routes as locationRoutes } from '~/modules/location';
import { routes as tripsRoutes } from '~/modules/trips';

function handleHornPress() {
  Vibration.vibrate();
}

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  @autobind
  handleRadiatorPress() {

  }

  @autobind
  handleFanPress() {

  }

  @autobind
  handleHazzardPress() {

  }

  @autobind
  handleLightsPress() {

  }


  @autobind
  handleLocationPress() {
    const { navigation: { navigate } } = this.props;
    navigate(locationRoutes.LOCATION);
  }

  @autobind
  handleTripsPress() {
    const { navigation: { navigate } } = this.props;
    navigate(tripsRoutes.TRIPS);
  }

  render() {
    const {
      speed,
      temp,
      torq,
      rpm,
    } = this.props;

    return (
      <Screen>
        <TabNavigatorButton
          name="My Trips"
          onPress={this.handleTripsPress}
        >
          <TabNavigatorButton
            name="My Location"
            onPress={this.handleLocationPress}
          />
        </TabNavigatorButton>

        <Card>
          <Text
            h1
            style={styles.sensorTitle}
          >
            Sensors
          </Text>
          <Sensor
            name="Speed"
            value={speed}
          />
          <Sensor
            name="RPM"
            value={rpm}
          />
          <Sensor
            name="Oil Temperature"
            value={temp}
          />
          <Sensor
            name="Torque"
            value={torq}
          />
        </Card>
        <View style={styles.buttonContainer}>
          <CarFunctionButton
            onPress={this.handleRadiatorPress}
            name="radiatorOn"
            togglable
          />
          <CarFunctionButton
            onPress={this.handleFanPress}
            name="fanOn"
            togglable
          />
        </View>
        <View style={styles.buttonContainer}>
          <CarFunctionButton
            onPress={this.handleLightsPress}
            name="lights"
            togglable
          />
          <CarFunctionButton
            onPress={handleHornPress}
            name="horn"
          />
          <CarFunctionButton
            onPress={this.handleHazzardPress}
            name="hazzard"
            togglable
          />
        </View>
      </Screen>
    );
  }
}

HomeScreen.propTypes = {
  speed: PropTypes.any,
  torq: PropTypes.any,
  temp: PropTypes.any,
  rpm: PropTypes.any,
};

HomeScreen.defaultProps = {
  speed: 'Not Available',
  torq: 'Not Available',
  temp: 'Not Available',
  rpm: 'Not Available',
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
