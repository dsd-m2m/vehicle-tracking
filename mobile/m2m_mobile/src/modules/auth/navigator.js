import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  styles,
} from '~/modules/navigation';
import {
  LoginScreen,
  CarIdScreen,
} from './screens';

export const routes = {
  LOGIN: 'LOGIN',
  CAR_ID: 'CAR_ID',
};

export default createStackNavigator(
  {
    [routes.LOGIN]: {
      name: routes.LOGIN,
      screen: LoginScreen,
      navigationOptions: {
        headerStyle: styles.header,
        title: 'M2M Mobile',
        headerTitleStyle: styles.headerTitle,
      },
    },
    [routes.CAR_ID]: {
      name: routes.CAR_ID,
      screen: CarIdScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.header,
        title: 'M2M Mobile',
        headerLeft: <HeaderLeft navigation={navigation} />,
        headerTitleStyle: styles.headerTitle,
      }),
    },
  },
  { initialRouteName: routes.LOGIN },
);
