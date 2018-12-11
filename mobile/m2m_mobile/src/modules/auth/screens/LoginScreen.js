import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Screen,
  Card,
  Text,
  TextButton,
  NetworkErrorModal,
  ModalDialog,
} from '~/modules/ui';
import { isRequestNetworkConnectionError } from '~/modules/core';
import {
  fetchGoogleAuthToken,
  fetchSessionAuthToken,
} from '../redux';
import { routes } from '../navigator';
import { styles } from './styles';

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      networkError: false,
      error: false,
    };
  }

  @autobind
  handleGooglePress() {
    const {
      fetchGoogleAuthTokenAction,
      fetchSessionAuthTokenAction,
      navigation,
    } = this.props;

    fetchGoogleAuthTokenAction()
      .then(fetchSessionAuthTokenAction)
      .then(() => {
        navigation.navigate(routes.CAR_ID);
      })
      .catch(error => {
        if (isRequestNetworkConnectionError(error)) {
          this.setState({ networkError: true });
          return;
        }
        this.setState({ error: true });
      });
  }


  @autobind
  handleNetworkErrorRetry() {
    this.setState({ networkError: false });

    this.handleGooglePress();
  }

  @autobind
  handleErrorPress() {
    this.setState({ error: false });
  }

  render() {
    const {
      networkError,
      error,
    } = this.state;

    return (
      <Screen style={styles.container}>
        <Card style={styles.contentContainer}>
          <Text h2>To continue please sign in!</Text>
          <View style={styles.buttonContainer}>
            <TextButton
              title="SIGN IN WITH GOOGLE"
              onPress={this.handleGooglePress}
            />
          </View>
        </Card>
        <NetworkErrorModal
          onPress={this.handleNetworkErrorRetry}
          active={networkError}
        />
        <ModalDialog
          onPress={this.handleErrorPress}
          active={error}
          title="An issue ocurred!"
          error="There has been an issue, please retry!"
          buttonTitle="OK"
        />
      </Screen>
    );
  }
}

LoginScreen.propTypes = {
  fetchGoogleAuthTokenAction: PropTypes.func,
  fetchSessionAuthTokenAction: PropTypes.func,
};


function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  fetchGoogleAuthTokenAction: fetchGoogleAuthToken,
  fetchSessionAuthTokenAction: fetchSessionAuthToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
