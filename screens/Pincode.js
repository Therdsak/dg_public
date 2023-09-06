import React, { Component } from "react";
import {
  ImageBackground,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import * as Keychain from "react-native-keychain";
import PINCode, { hasUserSetPinCode } from "@haskkor/react-native-pincode";
import { NavigationEvents } from "react-navigation";
import RNExitApp from "react-native-exit-app";

export default class Pincode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPin: true
    };
    global.pinStatus = false;
  }

  async componentDidMount() {
    const hasPin = await hasUserSetPinCode("appPWD");
    this.setState({
      hasPin: hasPin
    });
  }

  _finishSetPinProcess = async () => {
    const setPin = await hasUserSetPinCode("appPWD");
    if (setPin) {
      global.pinStatus = true;
      this.props.navigation.navigate("Card");
    }
  };

  _finisPinProcess = async () => {
    global.pinStatus = true;
    this.props.navigation.navigate("Card");
  };

  _onFocus = () => {
    if (global.pinStatus) {
      RNExitApp.exitApp();
    }
  };

  _onFocusSetPin = async () => {
    const setPin = await hasUserSetPinCode("appPWD");
    if (setPin) {
      RNExitApp.exitApp();
    }
  };

  _closeApp = () => {
    RNExitApp.exitApp();
  };

  _resetPassword = () => {
    this.setState({
      hasPin : false
    })
    // RNExitApp.exitApp();
  };

  render() {
    if (this.state.hasPin) {
      return (
        <ImageBackground
          source={{ uri: "background_pin" }}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationEvents onWillFocus={this._onFocus} />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              elevation: 2
            }}
          >
            <View
              style={{
                marginTop: 45 + getStatusBarHeight(),
                alignItems: "center"
              }}
            >
              <Image
                source={{ uri: "egov_logo" }}
                style={{ width: 120, height: 120 }}
              />
              <Text
                style={{
                  fontFamily: "Prompt-Bold",
                  fontSize: 21,
                  color: "#BA1F68",
                  textAlign: "left",
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                บัตรประจำตัวคนพิการ
              </Text>
              <TouchableOpacity onPress={this._resetPassword}>
              <Text
                style={{
                  fontFamily: "Prompt-Bold",
                  fontSize: 18,
                  color: "#BA1F68",
                  textAlign: "left",
                  marginTop: 4,
                  marginBottom: 4,
                  textDecorationLine : 'underline'
                }}
              >
                ลืมรหัส PIN
              </Text>
              </TouchableOpacity>
            </View>
            <PINCode
              status={"enter"}
              touchIDDisabled={true}
              passwordLength={6}
              styleContainer={{
                flex: 1
              }}
              stylePinCodeCircle={{
                width: 20,
                height: 20,
                borderRadius: 10,
                opacity: 1,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
              }}
              stylePinCodeRowButtons={{
                backgroundColor: "#fff"
              }}
              stylePinCodeColumnButtons={{
                width: Dimensions.get("window").width / 3,
                height: "100%",
                borderWidth: 1,
                borderColor: "#e4e4e4",
                borderTopWidth: 0,
                borderRightColor: "transparent"
              }}
              stylePinCodeButtonCircle={{
                borderRadius: 0,
                backgroundColor: "#fff",
                width: "100%",
                height: "100%"
              }}
              stylePinCodeColumnDeleteButton={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              stylePinCodeDeleteButtonText={{
                fontFamily: "Prompt-Medium"
              }}
              stylePinCodeTextTitle={{
                fontSize: 18,
                color: "#FFFFFF",
                fontFamily: "Prompt-Medium",
                fontWeight: "500"
              }}
              stylePinCodeTextSubtitle={{
                fontFamily: "Prompt-Medium",
                marginTop: 5,
                fontSize: 16,
                fontWeight: "500"
              }}
              styleLockScreenMainContainer={{
                flex: 1,
                elevation: 6
              }}
              styleLockScreenTitle={{
                opacity: 1,
                fontFamily: "Prompt-Bold",
                color: "#BA1F68"
              }}
              styleLockScreenText={{
                opacity: 1,
                fontFamily: "Prompt-Medium"
              }}
              styleLockScreenViewCloseButton={{
                opacity: 1
              }}
              styleLockScreenViewIcon={{
                opacity: 1,
                backgroundColor: "#BA1F68"
              }}
              stylePinCodeColorTitle="#fff"
              stylePinCodeColorSubtitle="#fff"
              stylePinCodeButtonNumber="#6E35B8"
              stylePinCodeDeleteButtonColorHideUnderlay="#6E35B8"
              stylePinCodeDeleteButtonColorShowUnderlay="#BA1F68"
              colorPassword="#BA1F68"
              numbersButtonOverlayColor="#BA1F68"
              colorPasswordEmpty="#fff"
              // passwordComponent={() => (
              //   <Image
              //     source={{ uri: "pin_image_group" }}
              //     style={{ width: 286, height: 128, marginBottom: 15 }}
              //   />
              // )}
              titleEnter={"กรุณาใส่รหัส PIN"}
              titleAttemptFailed={"รหัส PIN ไม่ถูกต้อง"}
              subtitleError={"ลองใหม่อีกครั้ง"}
              textTitleLockedPage={"รหัส PIN ไม่ถูกต้อง"}
              textDescriptionLockedPage={
                "คุณได้พยายามเข้าใช้งานมากกว่า 15 ครั้ง"
              }
              textSubDescriptionLockedPage={
                "หากลืมรหัส PIN ให้ทำการลบโปรแกรมและติดตั้งใหม่อีกครั้ง"
              }
              maxAttempts={15}
              timeLocked={180000}
              buttonDeleteText={"ลบ"}
              delayBetweenAttempts={1000}
              pinCodeKeychainName={"appPWD"}
              finishProcess={() => this._finisPinProcess()}
              buttonComponentLockedPage={() => (
                <TouchableOpacity onPress={this._closeApp}>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#CE207F",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 7.5,
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 30
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 18,
                        fontFamily: "Prompt-Medium",
                        marginRight: 5
                      }}
                    >
                      ออก
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={{ uri: "background_pin" }}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationEvents onWillFocus={this._onFocusSetPin} />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              elevation: 2
            }}
          >
            <View
              style={{
                marginTop: 60 + getStatusBarHeight(),
                alignItems: "center"
              }}
            >
              <Image
                source={{ uri: "egov_logo" }}
                style={{ width: 100, height: 100 }}
              />
              <Text
                style={{
                  fontFamily: "Prompt-Bold",
                  fontSize: 21,
                  color: "#BA1F68",
                  textAlign: "left",
                  marginTop: 10,
                  marginBottom: 10
                }}
              >
                บัตรประจำตัวคนพิการ
              </Text>
            </View>
            <PINCode
              status={"choose"}
              touchIDDisabled={true}
              passwordLength={6}
              styleContainer={{
                flex: 1
              }}
              stylePinCodeCircle={{
                width: 20,
                height: 20,
                borderRadius: 10,
                opacity: 1,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5
              }}
              stylePinCodeRowButtons={{
                backgroundColor: "#fff"
              }}
              stylePinCodeColumnButtons={{
                width: Dimensions.get("window").width / 3,
                height: "100%",
                borderWidth: 1,
                borderColor: "#e4e4e4",
                borderTopWidth: 0,
                borderRightColor: "transparent"
              }}
              stylePinCodeButtonCircle={{
                borderRadius: 0,
                backgroundColor: "#fff",
                width: "100%",
                height: "100%"
              }}
              stylePinCodeColumnDeleteButton={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              stylePinCodeDeleteButtonText={{
                fontFamily: "Prompt-Medium"
              }}
              stylePinCodeTextTitle={{
                fontSize: 18,
                color: "#FFFFFF",
                fontFamily: "Prompt-Medium",
                fontWeight: "500"
              }}
              stylePinCodeTextSubtitle={{
                fontFamily: "Prompt-Medium",
                marginTop: 5,
                fontSize: 16,
                fontWeight: "500"
              }}
              stylePinCodeColorTitle="#fff"
              stylePinCodeColorSubtitle="#fff"
              stylePinCodeButtonNumber="#6E35B8"
              stylePinCodeDeleteButtonColorHideUnderlay="#6E35B8"
              stylePinCodeDeleteButtonColorShowUnderlay="#BA1F68"
              colorPassword="#BA1F68"
              numbersButtonOverlayColor="#BA1F68"
              colorPasswordEmpty="#fff"
              // passwordComponent={() => (
              //   <Image
              //     source={{ uri: "pin_image_group" }}
              //     style={{ width: 286, height: 128, marginBottom: 15 }}
              //   />
              // )}
              titleChoose={"ตั้งค่ารหัส PIN"}
              subtitleChoose={"ใส่รหัส PIN 6 หลัก"}
              subtitleError={"ลองใหม่อีกครั้ง"}
              titleConfirm={"ใส่รหัส PIN 6 หลักอีกครั้ง"}
              titleConfirmFailed={"ยืนยันรหัส PIN ไม่ถูกต้อง"}
              buttonDeleteText={"ลบ"}
              pinCodeKeychainName={"appPWD"}
              finishProcess={() => this._finishSetPinProcess()}
            />
          </View>
        </ImageBackground>
      );
    }
  }
}
