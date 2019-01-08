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
import {
  getVehicle,
  fetchUser,
} from '~/modules/auth';
import { styles } from './styles';
import {
  CarFunctionButton,
  Sensor,
} from '../components';
import { TabNavigatorButton } from '../components/TabNavigatorButton';
import { routes as locationRoutes } from '~/modules/location';
import { routes as tripsRoutes } from '~/modules/trips';
import {
  getCarState,
  fetchCarState,
  getSocket,
  updateCarState,
} from '../redux';


function handleHornPress() {
  Vibration.vibrate();
}

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    const {
      vehicle: { vin },
      fetchCarStateAction,
      socket,
    } = props;

    this.state = {
      carSpeed: 'Not Available',
      torqueMotor: 'Not Available',
      powerMotorTotal: 'Not Available',
      MotorRpm: 'Not Available',
    };

    fetchCarStateAction(vin);
    fetchUser();
    socket.emit('join', vin);
    socket.on(vin, this.updateState);
  }

  @autobind
  updateState(message) {
    const body = JSON.parse(message);
    this.setState({ ...body });
  }

  @autobind
  handleRadiatorPress() {
    const {
      vehicle: { vin },
      carState: { radiator },
      updateCarStateAction,
    } = this.props;

    updateCarStateAction(vin, 'radiator', !radiator).catch(() => { });
  }

  @autobind
  handleFanPress() {
    const {
      vehicle: { vin },
      carState: { ac },
      updateCarStateAction,
    } = this.props;

    updateCarStateAction(vin, 'ac', !ac).catch(() => { });
  }

  @autobind
  handleHazzardPress() {
    const {
      vehicle: { vin },
      carState: { hazzard },
      updateCarStateAction,
    } = this.props;

    updateCarStateAction(vin, 'hazzard', !hazzard).catch(() => { });
  }

  @autobind
  handleLightsPress() {
    const {
      vehicle: { vin },
      carState: { lights },
      updateCarStateAction,
    } = this.props;

    updateCarStateAction(vin, 'lights', !lights).catch(() => { });
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
      carSpeed,
      powerMotorTotal,
      torqueMotor,
      MotorRpm,
    } = this.state;
    const { carState } = this.props;
    const {
      radiator,
      ac,
      hazzard,
      lights,
    } = carState;

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
            value={carSpeed}
          />
          <Sensor
            name="RPM"
            value={MotorRpm}
          />
          <Sensor
            name="Motor Power Total"
            value={powerMotorTotal}
          />
          <Sensor
            name="Torque"
            value={torqueMotor}
          />
        </Card>
        <View style={styles.buttonContainer}>
          <CarFunctionButton
            onPress={this.handleRadiatorPress}
            name="radiatorOn"
            togglable
            on={radiator}
          />
          <CarFunctionButton
            onPress={this.handleFanPress}
            name="fanOn"
            togglable
            on={ac}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CarFunctionButton
            onPress={this.handleLightsPress}
            name="lights"
            togglable
            on={lights}
          />
          <CarFunctionButton
            onPress={handleHornPress}
            name="horn"
          />
          <CarFunctionButton
            onPress={this.handleHazzardPress}
            name="hazzard"
            togglable
            on={hazzard}
          />
        </View>
      </Screen>
    );
  }
}

HomeScreen.propTypes = {
  vehicle: PropTypes.object,
  fetchCarStateAction: PropTypes.func,
  updateCarStateAction: PropTypes.func,
  carState: PropTypes.object,
  socket: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    vehicle: getVehicle(state),
    carState: getCarState(state),
    socket: getSocket(state),
  };
}

const mapDispatchToProps = {
  fetchCarStateAction: fetchCarState,
  updateCarStateAction: updateCarState,
  fetchUserAction: fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
