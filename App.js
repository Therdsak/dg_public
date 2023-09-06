import React, {Component} from 'react';
import {Text, TextInput,View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import AppContainer from './screens/Navigation';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <AppContainer />
    )
  }
}
