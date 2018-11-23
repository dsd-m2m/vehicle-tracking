import {
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import { Navigator as HomeNavigator } from '~/modules/home';
import { Navigator as AuthNavigator } from '~/modules/auth';
import { Navigator as LoadingNavigator } from '~/modules/loading';

const appNavigatorRoutes = {
  Home: { screen: HomeNavigator },
  Auth: { screen: AuthNavigator },
};

const appNavigatorConfig = {
  initialRouteName: 'Home',
  animationEnabled: false,
  headerMode: 'none',
};

const AppNavigator = createStackNavigator(appNavigatorRoutes, appNavigatorConfig);

const rootNavigatorRoutes = {
  App: { screen: AppNavigator },
  Loading: { screen: LoadingNavigator },
};

const rootStackNavigatorConfig = {
  initialRouteName: 'Loading',
  animationEnabled: false,
  mode: 'modal',
  headerMode: 'none',
};

export default createSwitchNavigator(rootNavigatorRoutes, rootStackNavigatorConfig);
