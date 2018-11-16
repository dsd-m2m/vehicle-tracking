import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  HeaderRight,
  styles,
} from '~/modules/navigation';
import { HomeScreen } from './screens';

export const routes = { HOME: 'HOME' };

export default createStackNavigator(
  {
    [routes.HOME]: {
      name: routes.HOME,
      screen: HomeScreen,
      navigationOptions: {
        headerStyle: styles.header,
        title: 'M2M Mobile',
        headerLeft: <HeaderLeft iconName="settings" />,
        headerRight: <HeaderRight iconName="notifications" />,
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  { initialRouteName: routes.HOME },
);
