import React, { Component } from 'react';
import { Text, View, Linking, TouchableOpacity,ImageBackground, SafeAreaView} from 'react-native';

export default class CallCenter extends Component {

  render() {
      return (
        <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity style={{width: '28%', backgroundColor: '#E7725C', padding: 8, borderRadius: 15, alignItems: 'center', justifyContent: 'center', margin: '2.665%'}} onPress={() => { this.props.navigation.navigate('Jobs');}}>
                      <View style={{borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 15, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 8}}>
                          <Text style={{color: '#FFFFFF', fontSize: 16, fontFamily: 'Prompt-Medium', textAlign: 'center'}}>ค้นหา{'\n'}งาน</Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width: '28%', backgroundColor: '#E7725C', padding: 8, borderRadius: 15, alignItems: 'center', justifyContent: 'center', margin: '2.665%'}} onPress={()=>{Linking.openURL('https://links.dep.go.th/?thaimengaantam');}}>
                      <View style={{borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 15, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 8}}>
                          <Text style={{color: '#FFFFFF', fontSize: 16, fontFamily: 'Prompt-Medium', textAlign: 'center'}}>ไทยมี{'\n'}งานทำ</Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width: '28%', backgroundColor: '#E7725C', padding: 8, borderRadius: 15, alignItems: 'center', justifyContent: 'center', margin: '2.665%'}} onPress={()=>{Linking.openURL('https://links.dep.go.th/?prjob');}}>
                      <View style={{borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 15, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 8}}>
                          <Text style={{color: '#FFFFFF', fontSize: 16, fontFamily: 'Prompt-Medium', textAlign: 'center'}}>ตลาดงาน{'\n'}คนพิการ</Text>
                      </View>
                  </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
      );
  }
}