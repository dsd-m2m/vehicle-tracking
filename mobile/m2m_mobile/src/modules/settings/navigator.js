import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  styles,
} from '~/modules/navigation';
import { SettingsScreen } from './screens';

export const routes = { SETTINGS: 'SETTINGS' };

export default createStackNavigator(
  {
    [routes.SETTINGS]: {
      name: routes.SETTINGS,
      screen: SettingsScreen,
      navigationOptions: {
        headerStyle: styles.header,
        title: 'Settings',
        headerLeft: <HeaderLeft />,
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  { initialRouteName: routes.SETTINGS },
);
