import { createStackNavigator } from 'react-navigation';
import { styles } from '~/modules/navigation';
import { LoadingScreen } from './screens';
export const routes = { LOADING: 'LOADING' };

export default createStackNavigator(
  {
    [routes.LOADING]: {
      name: routes.LOADING,
      screen: LoadingScreen,
      navigationOptions: {
        headerStyle: styles.header,
        title: 'M2M Mobile',
        headerTitleStyle: styles.headerTitle,
      },
    },
  },
  { initialRouteName: routes.LOADING },
);
