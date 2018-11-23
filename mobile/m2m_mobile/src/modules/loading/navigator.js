import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { LoadingScreen } from './screens';

export const routes = { LOADING: 'LOADING' };

export default createStackNavigator(
  {
    [routes.LOADING]: {
      name: routes.LOADING,
      screen: LoadingScreen,
      navigationOptions: {},
    },
  },
  { initialRouteName: routes.LOADING },
);
