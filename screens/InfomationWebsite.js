import React, {Component} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';

export default class InfomationWebsite extends Component{
  render() {
    return (
            <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={{width: '100%', height: '100%'}}>
              <WebView
                ignoreSslError={true}
                style={{flex: 1, width: '100%', height: '100%'}}
                source={{ uri: this.props.navigation.state.params.url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}   
                automaticallyAdjustContentInsets={false}
              />
              </SafeAreaView>
            </ImageBackground>
      );
  }
}