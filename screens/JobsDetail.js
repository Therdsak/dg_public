

import React, {Component} from 'react';
import {SafeAreaView, ImageBackground, View, Text, ScrollView, TouchableOpacity, Dimensions, Image} from 'react-native';

export default class JobsDetail extends Component {
  render() {
    return (
        <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', elevation: 2}}>
        <View style={{backgroundColor: '#FFFFFF', borderRadius: 15, width: '90%', margin: 30, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 5, elevation: 3}}>
          <ScrollView style={{height: '100%'}}>
            <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row'}}>
              <View style={{backgroundColor: '#BA1F68', borderRadius: 15, paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}>
                <Text style={{fontFamily: 'Prompt-Medium', fontSize: 21, color: '#FFFFFF'}}>{this.props.navigation.state.params.title}</Text>
              </View>
            </View>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#484848', flexShrink: 1, marginTop: 5}}>{this.props.navigation.state.params.company}</Text>
             
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#b72b69', textAlign: 'left', marginTop: 15}}>รายละเอียดงาน</Text>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 16, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.description}</Text>
             
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#b72b69', textAlign: 'left', marginTop: 15}}>จำนวน</Text>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 16, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.quantity} อัตรา</Text>
             
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#b72b69', textAlign: 'left', marginTop: 15}}>สถานที่ทำงาน</Text>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 16, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.location} ต.{this.props.navigation.state.params.subdistrict} อ.{this.props.navigation.state.params.district} จ.{this.props.navigation.state.params.province} {this.props.navigation.state.params.zipcode}</Text>
             
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#b72b69', textAlign: 'left', marginTop: 15}}>ข้อมูลติดต่อ</Text>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 16, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.contact_name}</Text>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 16, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.contact_phone}</Text>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 16, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.contact_mobile}</Text>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 16, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.contact_email}</Text>
             
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#b72b69', textAlign: 'left', marginTop: 15}}>ประกาศเมื่อ</Text>
             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 16, color: '#484848', textAlign: 'left'}}>{this.props.navigation.state.params.created_at}</Text>
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