import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Sensor } from '~/modules/home';
import {
  Screen,
  Card,
} from '~/modules/ui';
import { autobind } from 'core-decorators';
import { styles } from './styles';
import { routes as infoRoutes } from '~/modules/app-info';
import {
  unsubscribeFromCar,
  logout,
  routes as authRoutes,
} from '~/modules/auth';

class SettingsScreen extends PureComponent {
  @autobind
  handleAppInfoPress() {
    const { navigation: { navigate } } = this.props;
    navigate(infoRoutes.APP_INFO);
  }

  @autobind
  handleUnsubscribePress() {
    const {
      navigation: { navigate },
      unsubscribeFromCarAction,
    } = this.props;
    unsubscribeFromCarAction();
    navigate(authRoutes.CAR_ID);
  }

  @autobind
  handleLogoutPress() {
    const {
      navigation: { navigate },
      logoutAction,
    } = this.props;

    logoutAction();
    navigate(authRoutes.LOGIN);
  }

  render() {
    return (
      <Screen>
        <Card>
          <TouchableOpacity
            onPress={this.handleAppInfoPress}
            style={styles.opacity}
          >
            <Sensor
              name="Show App Info"
              value=""
            />
          </TouchableOpacity>
        </Card>
        <Card>
          <TouchableOpacity
            onPress={this.handleUnsubscribePress}
            style={styles.opacity}
          >
            <Sensor
              name="Unsubscribe"
              value=""
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleLogoutPress}
            style={styles.opacity}
          >
            <Sensor
              name="Logout"
              value=""
            />
          </TouchableOpacity>

        </Card>
      </Screen>
    );
  }
}

SettingsScreen.propTypes = {
  unsubscribeFromCarAction: PropTypes.func,
  logoutAction: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  unsubscribeFromCarAction: unsubscribeFromCar,
  logoutAction: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
