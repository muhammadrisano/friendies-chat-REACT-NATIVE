/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from './src/config/Firebase';

AppRegistry.registerComponent(appName, () => App);

