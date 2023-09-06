import React, { Component } from 'react';
import {ImageBackground, SafeAreaView, TouchableOpacity, View, Text, Dimensions, ScrollView} from 'react-native';

export default class Benefits extends Component {
    state = {
        benefits: require('../database/benefits.json'),
    }
    
    showBenefit = (item) => {
        this.props.navigation.navigate('BenefitDetail', item);
    }

    render() {
        const boxHeight = (Dimensions.get('window').height-320)/4;
        console.log('hello : ' , this.state.benefits)
        return (
            <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center'}}>
                        {
                        this.state.benefits.map((item, index) => (
                            <TouchableOpacity key={item.id} style={{width: '28%', backgroundColor: '#E7725C', padding: 8, borderRadius: 15, alignItems: 'center', justifyContent: 'center', margin: '2.665%'}} onPress = {() => this.showBenefit(item)}>
                                <View style={{borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 15, width: '100%', height: boxHeight, justifyContent: 'center', alignItems: 'center', padding: 8}}>
                                    <Text style={{color: '#FFFFFF', fontSize: 16, fontFamily: 'Prompt-Medium', textAlign: 'center'}}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                        }
                    </View>
                </SafeAreaView>
                </ScrollView>
            </ImageBackground>
        );
  }
}
