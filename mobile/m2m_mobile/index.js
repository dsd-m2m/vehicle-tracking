import {
  AppRegistry,
  UIManager,
} from 'react-native';
import App from './src';
import { name as appName } from './app.json';


if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

AppRegistry.registerComponent(appName, () => App);
