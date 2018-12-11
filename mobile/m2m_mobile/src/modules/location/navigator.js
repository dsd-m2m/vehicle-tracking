import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  HeaderLeft,
  HeaderRight,
  styles,
} from '~/modules/navigation';
import { LocationScreen } from './screens';
import { routes as settingsRoutes } from '~/modules/settings';
import { routes as carInfoRoutes } from '~/modules/car-info';

export const routes = { LOCATION: 'LOCATION' };

export default createStackNavigator(
  {
    [routes.LOCATION]: {
      name: routes.LOCATION,
      screen: LocationScreen,
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
  { initialRouteName: routes.LOCATION },
);
