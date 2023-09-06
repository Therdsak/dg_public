

import React, {Component} from 'react';
import {SafeAreaView, ImageBackground, View, Text, ScrollView, TouchableOpacity, Dimensions, Image} from 'react-native';
import Hyperlink from 'react-native-hyperlink'

export default class NewsDetail extends Component {
  render() {
    return (
        <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', elevation: 2}}>
        <View style={{backgroundColor: '#FFFFFF', borderRadius: 15, width: '90%', margin: 30, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 5, elevation: 3}}>
          <ScrollView style={{height: '100%'}}>
            <Image style={{width: (Math.round(Dimensions.get('window').width)*0.9)-40, height: ((Math.round(Dimensions.get('window').width)*0.9)-40)*0.59375, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#EFEFEF'}} source={{uri: this.props.navigation.state.params.image}}/>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 21, color: '#BA1F68', textAlign: 'left', marginTop: 10, marginBottom: 10}}>{this.props.navigation.state.params.title}</Text>
             <Hyperlink linkStyle={{color: '#CE207F'}} linkDefault={ true }>
              <Text style={{fontFamily: 'Prompt-Medium', fontSize: 14, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.detail}</Text>
             </Hyperlink>
          </ScrollView>
          <TouchableOpacity style={{position: 'absolute', top: -12, right: -12}} onPress={()=>{this.props.navigation.goBack()}}>
            <View style={{width: 48, height: 48, backgroundColor: '#BA1F68', borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: '#FFFFFF', fontFamily: 'Prompt-Medium'}}>ปิด</Text>
            </View>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}