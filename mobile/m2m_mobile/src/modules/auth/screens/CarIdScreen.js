import React, { PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { View } from 'react-native';
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
import { styles } from './styles';

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
  handleDebugCar() {
    const { subscribeToCarAction } = this.props;
    const vin = '1T7HT4B27X1183680';

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
          <Text
            h2
            style={styles.title}
          >
            Enter your Vehicle ID!
          </Text>
          <Text style={styles.body}>
            We need your Vehicle ID to connect the App with your vehicle. Please provide it into the field below!
          </Text>
          <TextInput
            style={styles.textInput}
            value={vin}
            onChangeText={this.handleTextChange}
          />
          <View style={styles.buttonContainer}>
            <TextButton
              title="CONFIRM"
              onPress={this.handleConfirmPress}
              enabled={vin.length >= 14}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TextButton
              title="DEBUG CAR"
              onPress={this.handleDebugCar}
            />
          </View>
        </Card>
        <NetworkErrorModal
          onPress={this.handleNetworkErrorRetry}
          active={networkError}
        />
        <ModalDialog
          onPress={this.handleWrongIdPress}
          active={wrongId}
          title="Wrong ID!"
          error="This Vehicle ID does not exist, please try a different Vehicle ID!"
          buttonTitle="OK"
        />
        <ModalDialog
          onPress={this.handleConfirmSuccessPress}
          active={success}
          title="Vehicle subscribed successfully!"
          buttonTitle="OK"
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
