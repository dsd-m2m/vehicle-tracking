import React, { PureComponent } from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import {
  isAndroid,
  isIPhoneX,
} from '~/modules/core';
import StatusBar from '../StatusBar';
import { styles } from './styles';

export default class Screen extends PureComponent {
  @autobind
  renderFooter() {
    const { renderFooter } = this.props;

    if (!renderFooter) {
      return null;
    }

    return renderFooter();
  }

  render() {
    const {
      scrollable,
      children,
      keyboardAware,
      ...otherProps
    } = this.props;

    const ContentContainerComponent = scrollable ? ScrollView : View;
    const ContainerComponent = keyboardAware ? KeyboardAvoidingView : View;
    const verticalOffset = isIPhoneX() ? 94 : 60;

    return (
      <SafeAreaView style={styles.container}>
        <ContainerComponent
          style={styles.container}
          behavior={isAndroid() ? null : 'padding'}
          keyboardVerticalOffset={verticalOffset}
        >
          <ContentContainerComponent
            style={styles.container}
            {...otherProps}
          >
            <StatusBar />
            {children}
          </ContentContainerComponent>
          {this.renderFooter()}
        </ContainerComponent>
      </SafeAreaView>
    );
  }
}

Screen.propTypes = {
  scrollable: PropTypes.bool,
  children: PropTypes.node,
  renderFooter: PropTypes.func,
};
