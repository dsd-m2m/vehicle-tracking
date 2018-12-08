import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  styles,
} from '~/modules/navigation';
import { AppInfoScreen } from './screens';

export const routes = { APP_INFO: 'APP_INFO' };

export default createStackNavigator(
  {
    [routes.APP_INFO]: {
      name: routes.APP_INFO,
      screen: AppInfoScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.header,
        title: 'App Info',
        headerLeft: <HeaderLeft navigation={navigation} />,
        headerTitleStyle: styles.headerTitle,
      }),
    },
  },
  { initialRouteName: routes.APP_INFO },
);
