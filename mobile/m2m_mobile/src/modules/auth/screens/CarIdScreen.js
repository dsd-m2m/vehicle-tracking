import React, { PureComponent } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import {
  Screen,
  Card,
  Text,
  TextButton
} from '~/modules/ui';

class CarIdScreen extends PureComponent {
  @autobind
  handleConfirmPress() {

  }

  @autobind
  handleConfirmSuccessPress(){

  }

  @autobind
  handleNetworkErrorPress(){

  }

  @autobind
  handleWrongIdPress(){
    
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

CarIdScreen.propTypes = {};


function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarIdScreen);
