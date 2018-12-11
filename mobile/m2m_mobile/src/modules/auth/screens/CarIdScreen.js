import React, { PureComponent } from 'react';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Screen,
  Card,
  Text,
  TextButton,
  TextInput,
  ModalDialog,
  NetworkErrorModal,
} from '~/modules/ui';
import { isRequestNetworkConnectionError } from '~/modules/core';
import { routes as homeRoutes } from '~/modules/home';
import { subscribeToCar } from '../redux';

class CarIdScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      networkError: false,
      wrongId: false,
      success: false,
      vin: '',
    };
  }

  @autobind
  handleConfirmPress() {
    const { subscribeToCarAction } = this.props;
    const { vin } = this.state;

    subscribeToCarAction(vin)
      .then(() => this.setState({ success: true }))
      .catch(error => {
        if (isRequestNetworkConnectionError(error)) {
          this.setState({ networkError: true });
          return;
        }
        this.setState({ wrongId: true });
      });
  }

  @autobind
  handleConfirmSuccessPress() {
    const { navigation: { navigate } } = this.props;

    navigate(homeRoutes.HOME);
  }

  @autobind
  handleNetworkErrorPress() {
    this.setState({ networkError: false });
  }

  @autobind
  handleWrongIdPress() {
    this.setState({ wrongId: false });
  }

  @autobind
  handleTextChange(vin) {
    this.setState({ vin });
  }


  render() {
    const {
      networkError,
      wrongId,
      success,
      vin,
    } = this.state;

    return (
      <Screen>
        <Card>
          <Text h2>Enter your car ID!</Text>
          <Text>
            We need your car ID to connect the App with your car. Please provide it into the field below!
          </Text>
          <TextInput
            value={vin}
            onChangeText={this.handleTextChange}
          />
          <TextButton
            title="CONFIRM"
            onPress={this.handleConfirmPress}
            enabled={vin.length >= 14}
          />
        </Card>
        <NetworkErrorModal
          onPress={this.handleNetworkErrorRetry}
          active={networkError}
        />
        <ModalDialog
          onPress={this.handleWrongIdPress}
          active={wrongId}
        />
        <ModalDialog
          onPress={this.handleConfirmSuccessPress}
          active={success}
        />
      </Screen>
    );
  }
}

CarIdScreen.propTypes = { subscribeToCarAction: PropTypes.func };


function mapStateToProps() {
  return {};
}

const mapDispatchToProps = { subscribeToCarAction: subscribeToCar };

export default connect(mapStateToProps, mapDispatchToProps)(CarIdScreen);
