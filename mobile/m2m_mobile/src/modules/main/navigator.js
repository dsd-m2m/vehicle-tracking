import { createStackNavigator } from 'react-navigation';

import { Navigator as HomeNavigator } from '~/modules/home';

const appNavigatorRoutes = { HomeNavigator: { screen: HomeNavigator } };

const appNavigatorConfig = {
  initialRouteName: 'HomeNavigator',
  animationEnabled: false,
  headerMode: 'none',
};

const AppNavigator = createStackNavigator(appNavigatorRoutes, appNavigatorConfig);

const rootNavigatorRoutes = { AppNavigator: { screen: AppNavigator } };

const rootStackNavigatorConfig = {
  initialRouteName: 'AppNavigator',
  animationEnabled: false,
  mode: 'modal',
  headerMode: 'none',
};

export default createStackNavigator(rootNavigatorRoutes, rootStackNavigatorConfig);
