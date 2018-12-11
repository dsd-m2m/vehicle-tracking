import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Text,
  Screen,
  NetworkErrorModal,
} from '~/modules/ui';
import { colors } from '~/modules/theme';
import { isRequestNetworkConnectionError } from '~/modules/core';
import { MaterialIndicator } from 'react-native-indicators';
import { autobind } from 'core-decorators';
import { styles } from './styles';
import {
  getGoogleAuthToken,
  routes as authRoutes,
  fetchSessionAuthToken,
  getUser,
} from '~/modules/auth';
import { routes as homeRoutes } from '~/modules/home';

class LoadingScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { networkError: false };
  }

  componentWillMount() {
    this.checkLoginStatus();
  }

  @autobind
  checkLoginStatus() {
    const {
      googleToken,
      navigation,
      fetchSessionAuthTokenAction,
    } = this.props;

    const isUserEmpty = _.isEmpty(googleToken);

    if (isUserEmpty) {
      navigation.navigate(authRoutes.LOGIN);
      return;
    }

    fetchSessionAuthTokenAction()
      .then(() => navigation.navigate(homeRoutes.HOME))
      .catch(error => {
        if (isRequestNetworkConnectionError(error)) {
          this.setState({ networkError: true });
          return;
        }
        navigation.navigate(authRoutes.LOGIN);
      });
  }

  @autobind
  handleNetworkErrorRetry() {
    this.setState({ networkError: false });

    this.checkLoginStatus();
  }

  render() {
    const { networkError } = this.state;

    return (
      <Screen style={styles.container}>
        <MaterialIndicator
          color={colors.primary}
          size={80}
        />
        <Text>M2M Mobile</Text>
        <NetworkErrorModal
          onPress={this.handleNetworkErrorRetry}
          active={networkError}
        />
      </Screen>
    );
  }
}

LoadingScreen.propTypes = {
  googleToken: PropTypes.string,
  fetchSessionAuthTokenAction: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: getUser(state),
    googleToken: getGoogleAuthToken(state),
  };
}

const mapDispatchToProps = { fetchSessionAuthTokenAction: fetchSessionAuthToken };

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);