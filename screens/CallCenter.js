import React, { Component } from 'react';
import { Text, View, Linking, Image, TouchableHighlight, ImageBackground, SafeAreaView} from 'react-native';

export default class CallCenter extends Component {

  render() {
      return (
        <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', elevation: 2}}>
                <Text style={{color: '#B91E67', fontSize: 24, fontFamily: 'Prompt-Medium', marginBottom: 10,  textAlign: "center"}}>สายด่วน</Text>
                <View style={{marginTop: 30}}>
                    <TouchableHighlight style={{flexDirection: 'row', backgroundColor: '#CE207F', justifyContent: 'center', alignItems: 'center', padding: 7.5, paddingLeft: 15, paddingRight: 15, borderRadius: 15}} onPress={()=>{Linking.openURL('tel:1300');}}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                          <Image style={{width: 24, height: 24, marginRight: 10}} source={{uri: 'icon_callcenter'}} />
                          <Text style={{fontSize: 18, color: '#FFFFFF', fontFamily: 'Prompt-Medium'}}>
                          ศูนย์ช่วยเหลือสังคม
                          </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{marginTop: 30}}>
                    <TouchableHighlight style={{flexDirection: 'row', backgroundColor: '#CE207F', justifyContent: 'center', alignItems: 'center', padding: 7.5, paddingLeft: 15, paddingRight: 15, borderRadius: 15}} onPress={()=>{Linking.openURL('tel:1479');}}>
                       <View style={{display: 'flex', flexDirection: 'row'}}>
                          <Image style={{width: 24, height: 24, marginRight: 10}} source={{uri: 'icon_callcenter'}} />
                          <Text style={{fontSize: 18, color: '#FFFFFF', fontFamily: 'Prompt-Medium'}}>
                          สายด่วนคนพิการประชารัฐ
                          </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
      </ImageBackground>
      );
  }
}