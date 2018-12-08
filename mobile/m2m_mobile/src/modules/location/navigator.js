import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  HeaderRight,
  styles,
} from '~/modules/navigation';
import { LocationScreen } from './screens';

export const routes = { LOCATION: 'LOCATION' };

export default createStackNavigator(
  {
    [routes.LOCATION]: {
      name: routes.LOCATION,
      screen: LocationScreen,
      navigationOptions: {
        headerStyle: styles.header,
        title: 'M2M Mobile',
        headerLeft: <HeaderLeft iconName="settings" />,
        headerRight: <HeaderRight iconName="notifications" />,
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  { initialRouteName: routes.LOCATION },
);
