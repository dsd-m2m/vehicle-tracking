import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  HeaderRight,
  styles,
} from '~/modules/navigation';
import { AuthScreen } from './screens';

export const routes = { AUTH: 'AUTH' };

export default createStackNavigator(
  {
    [routes.AUTH]: {
      name: routes.AUTH,
      screen: AuthScreen,
      navigationOptions: {
        headerStyle: styles.header,
        title: 'Authorization',
        headerLeft: <HeaderLeft iconName="settings" />,
        headerRight: <HeaderRight iconName="notifications" />,
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  { initialRouteName: routes.AUTH },
);
