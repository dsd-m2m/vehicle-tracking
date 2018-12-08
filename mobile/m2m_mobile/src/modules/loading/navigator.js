import { createStackNavigator } from 'react-navigation';
import { styles } from '~/modules/navigation';
import { LoadingScreen } from './screens';
export const routes = { HOME: 'HOME' };

export default createStackNavigator(
  {
    [routes.HOME]: {
      name: routes.HOME,
      screen: LoadingScreen,
      navigationOptions: {
        headerStyle: styles.header,
        title: 'M2M Mobile',
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  { initialRouteName: routes.HOME },
);
