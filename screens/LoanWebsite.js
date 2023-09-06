import React, {Component} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';

export default class LoanWebsite extends Component{
  render() {
    return (
            <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={{ flex:1 }}>
              <WebView
                ignoreSslError={true}
                style={{flex: 1, width: '100%', height: '100%'}}
                source={{ uri: 'https://links.dep.go.th/?efund'}}
                javaScriptEnabled={true}
                domStorageEnabled={true}   
                automaticallyAdjustContentInsets={false}
              />
              </SafeAreaView>
            </ImageBackground>
      );
  }
}