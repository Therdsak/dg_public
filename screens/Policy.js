import React, { Component } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { WebView } from "react-native-webview";
import CheckBox from 'react-native-check-box';

export default class Policy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked : false
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <ImageBackground
        source={{ uri: "background" }}
        style={{ width: "100%", height: "100%" }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            ignoreSslError={true}
            style={{ flex: 1, width: "100%", height: "100%" }}
            source={{
              uri:
                "https://dep.pdpanetka.com/policy/policyview?key=P7ol7rY4Z7gRnKe4nI6G2Q%3d%3d"
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            automaticallyAdjustContentInsets={false}
          />
        </SafeAreaView>

        <View
          style={{
            flexDirection: "row",
            marginLeft: 24,
            marginRight: 24,
            marginTop: 12
          }}
        >
          <CheckBox
    style={{flex: 1, padding: 10}}
    onClick={()=>{
      this.setState({
          isChecked:!this.state.isChecked
      })
    }}
    isChecked={this.state.isChecked}
    rightText={"ยอมรับข้อตกลงเเละเงื่อนไขการเข้าใช้งาน"}
    rightTextStyle={{
      fontFamily: 'Prompt-Regular',
    }}
/>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (this.state.isChecked){
              this.props.navigation.navigate("Pincode");
            }
            
          }}
        >
          <View
            style={{
              backgroundColor: this.state.isChecked ? "#B91E67" : "#99A3A4",
              marginTop: 15,
              marginRight: 15,
              marginLeft: 15,
              marginBottom: 40,
              borderRadius: 15,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 30,
              paddingRight: 30
            }}
          >
            <Text
              style={{
                color: this.state.isChecked ? "#FFFFFF" : "#000000",
                fontSize: 16,
                fontFamily: "Prompt-Bold",
                textAlign: "center"
              }}
            >
              ยอมรับ
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
