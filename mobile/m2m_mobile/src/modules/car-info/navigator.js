import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  styles,
} from '~/modules/navigation';
import { CarInfoScreen } from './screens';

export const routes = { CAR_INFO: 'CAR_INFO' };

export default createStackNavigator(
  {
    [routes.CAR_INFO]: {
      name: routes.CAR_INFO,
      screen: CarInfoScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.header,
        title: 'Car Info',
        headerLeft: <HeaderLeft navigation={navigation} />,
        headerTitleStyle: styles.headerTitle,
      }),
    },
  },
  { initialRouteName: routes.CAR_INFO },
);
