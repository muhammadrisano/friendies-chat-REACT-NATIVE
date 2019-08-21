import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MainNavigator from './src/public/navigators/MainNavigator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, fas } from '@fortawesome/free-solid-svg-icons'
library.add(fab, fas, faCheckSquare, faCoffee)
class App extends Component {
  render() {
    return (
      <MainNavigator />
    );
  };
}
export default App;
