import React, { PureComponent } from 'react';
import {
  WebView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Screen,
  Text,
} from '~/modules/ui';
import {
  Sensor,
  getSocket,
} from '~/modules/home';
import { getVehicle } from '~/modules/auth';
import { autobind } from 'core-decorators';
import { styles } from './styles';
import {
  HeaderLeft,
  styles as navigationStyles,
} from '~/modules/navigation';

class LocationScreen extends PureComponent {
  constructor(props) {
    super(props);

    const {
      socket,
      vehicle: { vin },
    } = props;

    this.state = {
      latitude: 'Not Available',
      longitude: 'Not Available',
    };

    socket.on(vin, this.updateState);
  }

  @autobind
  updateState(message) {
    const body = JSON.parse(message);
    this.setState({ ...body });
  }

  render() {
    const { navigation } = this.props;
    const {
      latitude,
      longitude,
    } = this.state;

    return (
      <Screen style={styles.screen}>
        <View style={styles.header}>
          <HeaderLeft navigation={navigation} />
          <Text style={navigationStyles.rightPaddedHeaderTitle}>My Location</Text>
        </View>
        <Sensor
          name="Latitude"
          value={latitude}
          style={styles.content}
        />
        <Sensor
          name="Longitude"
          value={longitude}
          style={styles.content}

        />
        <WebView
          source={{ uri: 'https://www.google.com/maps/' }}
          style={styles.content}
        />
      </Screen>
    );
  }
}

LocationScreen.propTypes = {
  socket: PropTypes.object,
  vehicle: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    vehicle: getVehicle(state),
    socket: getSocket(state),
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);
