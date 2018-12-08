import React, { PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import {
  Screen,
  Card,
  Text,
  TextButton,
} from '~/modules/ui';

class LoginScreen extends PureComponent {
  @autobind
  handleGooglePress() {

  }

  render() {
    return (
      <Screen>
        <Card>
          <Text>To continue please sign in!</Text>
          <TextButton
            title="SIGN IN WITH GOOGLE"
            onPress={this.handleGooglePress}
          />
        </Card>
      </Screen>
    );
  }
}

LoginScreen.propTypes = {};


function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
