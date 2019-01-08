import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { StackedAreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
  Screen,
  Text,
} from '~/modules/ui';
import {
  TabNavigatorButton,
  Sensor,
  getTripData,
  fetchTripData,
} from '~/modules/home';
import { routes as locationRoutes } from '~/modules/location';
import {
  HeaderLeft,
  styles as navigationStyles,
} from '~/modules/navigation';
import { styles } from './styles';
import { getVehicle } from '~/modules/auth';

class TripsScreen extends PureComponent {
  constructor(props) {
    super(props);

    const {
      vehicle: { vin },
      fetchTripDataAction,
    } = props;

    fetchTripDataAction(vin);
  }

  @autobind
  handleLocationPress() {
    const { navigation: { navigate } } = this.props;
    navigate(locationRoutes.LOCATION);
  }

  render() {
    const {
      navigation,
      data,
    } = this.props;

    return (
      <Screen style={styles.screen}>
        <TabNavigatorButton
          name="My Location"
          onPress={this.handleLocationPress}
        />
        <View style={styles.header}>
          <HeaderLeft navigation={navigation} />
          <Text style={navigationStyles.rightPaddedHeaderTitle}>My Trips</Text>
        </View>
        <Sensor
          name="Start Date"
          value="Coming Soon"
          style={styles.content}
        />
        <Sensor
          name="End Date"
          value="Coming Soon"
          style={styles.content}
        />
        <Sensor
          name="Sensor"
          value="Coming Soon"
          style={styles.content}
        />

        <View
          style={styles.scrollView}
        >
          <Text h1>UNDER CONSTRUCTION</Text>
        </View>
      </Screen>
    );
  }
}

TripsScreen.propTypes = {
  data: PropTypes.any,
  vehicle: PropTypes.object,
  fetchTripDataAction: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    data: getTripData(state),
    vehicle: getVehicle(state),
  };
}

const mapDispatchToProps = { fetchTripDataAction: fetchTripData };

export default connect(mapStateToProps, mapDispatchToProps)(TripsScreen);
