import React, { Component } from 'react';
import {ScrollView, SafeAreaView, Text, Image, TouchableOpacity, Dimensions, View} from 'react-native';
import Hyperlink from 'react-native-hyperlink'
// import ImageView from 'react-native-image-view';
import ImageView from "react-native-image-viewing";


export default class BenefitDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isImageViewVisible: false,
            image : '',
        };
    }


    static navigationOptions = ({ navigation }) => ({
        title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.header) === 'undefined' ? navigation.state.params.title : navigation.state.params.header,
    });

    render()
    {
        let imgs = [];
        imgs[1] = 'https://ucarecdn.com/01a1a548-9f67-4af6-a5c4-ed382da72511/1.jpeg';
        imgs[5] = 'https://ucarecdn.com/629596eb-4132-4f9e-a2f0-0b3829f91c09/5.jpeg';
        imgs[6] = 'https://ucarecdn.com/aef10ec0-d1b5-45df-ae7c-80b922eef8d0/6.jpeg';
        imgs[10] = 'https://ucarecdn.com/080207b5-10da-4a9d-8469-5dd161ef23db/10.jpeg';
        imgs[11] = 'https://ucarecdn.com/64c616a5-294e-4e33-a9e4-3d4996326806/11.jpeg';
        imgs[12] = 'https://ucarecdn.com/0fa34598-66e3-4900-8abc-e8e9b34e1533/12.jpeg';


        let img = [];
        img[1] = require('../assets/benefits/1.jpeg');
        img[5] = require('../assets/benefits/5.jpeg');
        img[6] = require('../assets/benefits/6.jpeg');
        img[10] = require('../assets/benefits/10.jpeg');
        img[11] = require('../assets/benefits/11.jpeg');
        img[12] = require('../assets/benefits/12.jpeg');

        const images = [
            {
              uri: this.state.image
            }
        ];

        return(
            <ScrollView style={{backgroundColor: '#F5F3F6'}}>
                <SafeAreaView  style={{backgroundColor: '#ffffff'}}>
                        {
                            this.props.navigation.state.params.data.map((item, key) => {
                                return (
                                    <View key={key} style={{margin: 20}}>
                                        <Hyperlink linkStyle={{color: '#CE207F'}} linkDefault={ true }>
                                            <Text style={{fontSize: 16, fontFamily: 'Prompt-Regular'}}>{item.detail}</Text>
                                        </Hyperlink>
                                        {(item.imageId && 
                                        <View>
                                            <TouchableOpacity onPress = {() => this.setState({ isImageViewVisible: true , image : imgs[item.imageId] })}>
                                                <Image source={img[item.imageId]} style={{width: (Dimensions.get('window').width*0.9), height: (Dimensions.get('window').width*0.9)*(Image.resolveAssetSource(img[item.imageId]).height/Image.resolveAssetSource(img[item.imageId]).width)}}/>
                                            </TouchableOpacity>
                                            
                                            <ImageView
                                                images={images}
                                                visible={this.state.isImageViewVisible}
                                                onRequestClose={() => this.setState({isImageViewVisible: false})}
                                            />
                                          
                                        </View>
                                        )}
                                    </View>
                                );
                            })
                        }
                </SafeAreaView>
            </ScrollView>
        );
    }
}
