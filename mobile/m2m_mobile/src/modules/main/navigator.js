import {
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import { Navigator as HomeNavigator } from '~/modules/home';
import { Navigator as AppInfoNavigator } from '~/modules/app-info';
import { Navigator as AuthNavigator } from '~/modules/auth';
import { Navigator as CarInfoNavigator } from '~/modules/car-info';
import { Navigator as LoadingNavigator } from '~/modules/loading';
import { Navigator as LocationNavigator } from '~/modules/location';
import { Navigator as SettingsNavigator } from '~/modules/settings';
import { Navigator as TripsNavigator } from '~/modules/trips';

const appNavigatorRoutes = {
  HomeNavigator: { screen: HomeNavigator },
  AppInfoNavigator: { screen: AppInfoNavigator },
  AuthNavigator: { screen: AuthNavigator },
  CarInfoNavigator: { screen: CarInfoNavigator },
  LocationNavigator: { screen: LocationNavigator },
  SettingsNavigator: { screen: SettingsNavigator },
  TripsNavigator: { screen: TripsNavigator },
};

const appNavigatorConfig = {
  initialRouteName: 'HomeNavigator',
  animationEnabled: false,
  headerMode: 'none',
};

const AppNavigator = createStackNavigator(appNavigatorRoutes, appNavigatorConfig);

const rootNavigatorRoutes = {
  AppNavigator: { screen: AppNavigator },
  LoadingNavigator: { screen: LoadingNavigator },
};

const rootNavigatorConfig = {
  initialRouteName: 'LoadingNavigator',
  animationEnabled: false,
  mode: 'modal',
  headerMode: 'none',
};

export default createSwitchNavigator(rootNavigatorRoutes, rootNavigatorConfig);
