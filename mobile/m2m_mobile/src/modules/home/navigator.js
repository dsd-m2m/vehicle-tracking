import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  HeaderRight,
  styles,
} from '~/modules/navigation';
import { HomeScreen } from './screens';
import { routes as settingsRoutes } from '~/modules/settings';
import { routes as carInfoRoutes } from '~/modules/car-info';

export const routes = { HOME: 'HOME' };

export default createStackNavigator(
  {
    [routes.HOME]: {
      name: routes.HOME,
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.header,
        title: 'M2M Mobile',
        headerLeft: <HeaderLeft
          iconName="settings"
          navigation={navigation}
          onPress={() => navigation.navigate(settingsRoutes.SETTINGS)}
        />,
        headerRight: <HeaderRight
          iconName="car"
          navigation={navigation}
          onPress={() => navigation.navigate(carInfoRoutes.CAR_INFO)}

        />,
        headerTitleStyle: [styles.headerTitle, styles.centeredHeaderTitle],
      }),
    },
  },
  { initialRouteName: routes.HOME },
);
