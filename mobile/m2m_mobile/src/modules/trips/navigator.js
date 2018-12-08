import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  HeaderRight,
  styles,
} from '~/modules/navigation';
import { TripsScreen } from './screens';

export const routes = { TRIPS: 'TRIPS' };

export default createStackNavigator(
  {
    [routes.TRIPS]: {
      name: routes.TRIPS,
      screen: TripsScreen,
      navigationOptions: {
        headerStyle: styles.header,
        title: 'M2M Mobile',
        headerLeft: <HeaderLeft iconName="settings" />,
        headerRight: <HeaderRight iconName="notifications" />,
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  { initialRouteName: routes.TRIPS },
);
