import React, {Component} from 'react';
import {
  ImageBackground,
  Image,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInputMask} from 'react-native-masked-text';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
// import SimplerDatePicker from '@cawfree/react-native-simpler-date-picker';
import Modal from 'react-native-modal';
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';
import 'moment/locale/th';
import {
  hasUserSetPinCode,
  deleteUserPinCode,
} from '@haskkor/react-native-pincode';
import RNExitApp from 'react-native-exit-app';
import {Dropdown} from 'react-native-element-dropdown';
import Moment from 'moment';

export default class CardRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      idcard: '',
      isPickerVisibleDob: false,
      isPickerVisibleIssue: false,
      date_dob: null,
      dobText: null,
      dobDate: null,
      date_issue: null,
      issueText: null,
      issueDate: null,
      sceenWidth: Math.round(Dimensions.get('window').width),
      yearData: [],
      dayData: [],
      yearDob: '',
      monthDob: '',
      dayDob: '',

      yearIssueData: [],
      dayIssueData: [],
      yearIssue: '',
      monthIssue: '',
      dayIssue: '',
    };
  }

  async componentDidMount() {
    await deleteUserPinCode('appPWD');
    minDate = Moment().subtract(100, 'years');
    maxDate = Moment();
    const min = Number.parseInt(minDate.format('YYYY')) + 543;
    const max = Number.parseInt(maxDate.format('YYYY')) + 543;

    var list = [];
    list.push({label: max.toString(), value: max.toString()});
    for (let i = max - 1; i > min; i--) {
      var data = {
        label: i.toString(),
        value: i.toString(),
      };
      list.push(data);
    }
    list.push({label: min.toString(), value: min.toString()});

    this.setState({
      yearData: list,
      yearIssueData: list,
      yearDob: '2500'
    });
  }

  _onFocusSetPin = async () => {
    const setPin = await hasUserSetPinCode('appPWD');
    if (setPin) {
      RNExitApp.exitApp();
    }
  };

  doSpinner = (status) => {
    this.setState({
      spinner: status,
    });
  };

  checkIdCard = () => {
    this.doSpinner(true);
    let idcard = this.state.idcard.replace(/[^0-9]/g, '');
    let birthday = '';
    if (
      this.state.dobDate != null &&
      this.state.dobDate.toString().length !== 4
    ) {
      birthday = moment(this.state.dobDate).format('DDMM');
      // birthday += parseInt(moment(this.state.dobDate).format('YYYY')) + 543;
      birthday += parseInt(moment(this.state.dobDate).format('YYYY'));
    } else if (
      this.state.dobDate != null &&
      this.state.dobDate.toString().length === 4
    ) {
      // birthday = this.state.dobDate + 543;
      birthday = this.state.dobDate;
    }

    let issue = '';
    if (this.state.issueDate != null) {
      issue = moment(this.state.issueDate).format('DDMM');
      // issue += parseInt(moment(this.state.issueDate).format('YYYY')) + 543;
      issue += parseInt(moment(this.state.issueDate).format('YYYY'));
    }

    if (idcard.length === 0) {
      this.doSpinner(false);
      Alert.alert('กรุณากรอกหมายเลขบัตรประชาชน 13 หลัก');
      return;
    }

    if (idcard.length !== 13) {
      this.doSpinner(false);
      Alert.alert('หมายเลขบัตรประชาชนไม่ถูกต้อง');
      return;
    }

    if (birthday.length == 0) {
      this.doSpinner(false);
      Alert.alert('กรุณาระบุวันเกิด');
      return;
    }

    if (birthday.length != 8 && birthday.toString().length != 4) {
      this.doSpinner(false);
      Alert.alert('วันเกิดไม่ถูกต้อง');
      return;
    }

    if (
      this.state.dobDate != null &&
      this.state.dobDate.toString().length != 4
    ) {
      if (issue.length == 0) {
        this.doSpinner(false);
        Alert.alert('กรุณาระบุวันออกบัตร');
        return;
      }

      if (issue.length != 8) {
        this.doSpinner(false);
        Alert.alert('วันออกบัตรไม่ถูกต้อง');
        return;
      }
    }

    console.log('1234 : ' ,  'idcard=' +
    idcard +
    '&dob=' +
    (birthday.toString().length == 4
      ? '0000' + birthday
      : birthday.replace(/[^0-9]/g, '')) +
    (issue.toString().length == 4
      ? ''
      : '&issue=' + issue.replace(/[^0-9]/g, '')))
    fetch('https://pwd-digitalcard.com/pwd-app-card-check/login', {
      method: 'post',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJwd2QifQ.mdpz_c2m50BMokzp_sR87-gatSC2biOGS5xuNyqJWRo',
      }),
      body:
        'idcard=' +
        idcard +
        '&dob=' +
        (birthday.toString().length == 4
          ? '0000' + birthday
          : birthday.replace(/[^0-9]/g, '')) +
        (issue.toString().length == 4
          ? ''
          : '&issue=' + issue.replace(/[^0-9]/g, '')),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.doSpinner(false);
        if (responseJson.status === true) {
          AsyncStorage.setItem(
            'cardDetail',
            JSON.stringify(responseJson.result),
          );
          AsyncStorage.setItem(
            'showRemindExpireDateAlert1st',
            JSON.stringify(false),
          );
          AsyncStorage.setItem(
            'showRemindExpireDateAlert2nd',
            JSON.stringify(false),
          );
          AsyncStorage.setItem(
            'showRemindExpireDateAlert3rd',
            JSON.stringify(false),
          );
          global.cardDetail = responseJson.result;
          global.showRemindExpireDateAlert1st = false;
          global.showRemindExpireDateAlert2nd = false;
          global.showRemindExpireDateAlert3rd = false;
          // this.props.navigation.navigate('Pincode');
          this.props.navigation.navigate('Policy');
        } else {
          setTimeout(() => {
            Alert.alert(responseJson.message);
          }, 300);
        }
      })
      .catch((error) => {
        this.doSpinner(false);
        setTimeout(() => {
          Alert.alert('บางอย่างผิดพลาด, กรุณาลองใหม่อีกครั้ง');
        }, 300);
        console.error(error);
      });
  };

  // checkPolicy = () =>{
  //   this.props.navigation.navigate('Policy');
  // }

  // onDobDatePicked = (date) => {
  //   this.setState({
  //     date_dob: date,
  //   });
  // };

  onDobDateConfirmed = () => {
    moment.locale('th');
    this.setState({
      isPickerVisibleDob: false,
      dobDate:
        (this.state.date_dob == null || this.state.date_dob == '') &&
        this.state.yearDob.toString().length == 4
          ? this.state.yearDob
          : this.state.date_dob,
      dobText:
        (this.state.date_dob == null || this.state.date_dob == '') &&
        this.state.yearDob.toString().length == 4
          ? 'พ.ศ.​ ' + this.state.yearDob
          : moment(this.state.date_dob).format('D MMMM ') +
            parseInt(moment(this.state.date_dob).format('YYYY')),
    });
  };

  onIssueDatePicked = (date) => {
    this.setState({
      date_issue: date,
    });
  };

  onIssueDateConfirmed = () => {
    moment.locale('th');
    this.setState({
      isPickerVisibleIssue: false,
      issueDate:
        this.state.date_issue == null || this.state.date_issue == ''
          ? null
          : this.state.date_issue,
      issueText:
        this.state.date_issue == null || this.state.date_issue == ''
          ? ''
          : moment(this.state.date_issue).format('D MMMM ') +
            parseInt(moment(this.state.date_issue).format('YYYY')),
    });
  };

  onYearDoBPicked = (year) => {
    this.setState({
      yearDob: year.value
    });
  };
  onMonthDoBPicked = (month) => {
    this.setState({
      monthDob: month.value,
    });

    if (this.state.yearData % 4) {
      if (month.value == '02') {
        var list = [];
        for (let i = 1; i <= 29; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayData: list,
        });
      } else if (
        month.value == '01' ||
        month.value == '03' ||
        month.value == '05' ||
        month.value == '07' ||
        month.value == '08' ||
        month.value == '10' ||
        month.value == '12'
      ) {
        var list = [];
        for (let i = 1; i <= 31; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayData: list,
        });
      } else {
        var list = [];
        for (let i = 1; i <= 30; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayData: list,
        });
      }
    } else {
      if (month.value == '02') {
        var list = [];
        for (let i = 1; i <= 28; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayData: list,
        });
      } else if (
        month.value == '01' ||
        month.value == '03' ||
        month.value == '05' ||
        month.value == '07' ||
        month.value == '08' ||
        month.value == '10' ||
        month.value == '12'
      ) {
        var list = [];
        for (let i = 1; i <= 31; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayData: list,
        });
      } else {
        var list = [];
        for (let i = 1; i <= 30; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayData: list,
        });
      }
    }
  };
  onDayDoBPicked = (day) => {
    this.setState({
      dayDob: day.value,
    });
    this.setState({
      date_dob:
        this.state.yearDob + '-' + this.state.monthDob + '-' + day.value,
    });
  };

  onYearIssuePicked = (year) => {
    this.setState({
      yearIssue: year.value,
    });
  };
  onMonthIssuePicked = (month) => {
    this.setState({
      monthIssue: month.value,
    });

    if (parseInt(this.state.yearIssue) % 4) {
      if (month.value == '02') {
        var list = [];
        for (let i = 1; i <= 29; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayIssueData: list,
        });
      } else if (
        month.value == '01' ||
        month.value == '03' ||
        month.value == '05' ||
        month.value == '07' ||
        month.value == '08' ||
        month.value == '10' ||
        month.value == '12'
      ) {
        var list = [];
        for (let i = 1; i <= 31; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayIssueData: list,
        });
      } else {
        var list = [];
        for (let i = 1; i <= 30; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayIssueData: list,
        });
      }
    } else {
      if (month.value == '02') {
        var list = [];
        for (let i = 1; i <= 28; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayIssueData: list,
        });
      } else if (
        month.value == '01' ||
        month.value == '03' ||
        month.value == '05' ||
        month.value == '07' ||
        month.value == '08' ||
        month.value == '10' ||
        month.value == '12'
      ) {
        var list = [];
        for (let i = 1; i <= 31; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayIssueData: list,
        });
      } else {
        var list = [];
        for (let i = 1; i <= 30; i++) {
          var data = {
            label: i.toString(),
            value: i.toString(),
          };
          list.push(data);
        }

        this.setState({
          dayIssueData: list,
        });
      }
    }
  };
  onDayIssuePicked = (day) => {
    this.setState({
      dayIssue: day.value,
    });
    this.setState({
      date_issue:
        this.state.yearIssue + '-' + this.state.monthIssue + '-' + day.value,
    });
  };

  render() {
    const footerImageWidth =
      Math.round(Dimensions.get('window').width) > 414
        ? 414
        : Math.round(Dimensions.get('window').width);
    return (
      <ImageBackground
        source={{uri: 'background'}}
        style={{width: '100%', height: '100%'}}>
        <NavigationEvents onWillFocus={this._onFocusSetPin} />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Spinner
              visible={this.state.spinner}
              textStyle={{
                fontSize: 14,
                color: '#FFFFFF',
                fontFamily: 'Prompt-Medium',
              }}
            />
            <View
              style={{
                height: 108,
                marginTop: 60 + getStatusBarHeight(),
                marginBottom: 25,
                alignItems: 'center',
              }}>
              <Image
                source={{uri: 'egov_text_logo'}}
                style={{width: 165, height: 123}}
              />
            </View>
            <KeyboardAvoidingView behaviour="padding">
              <View style={{width: '90%', elevation: 2}}>
                <Text
                  style={{
                    color: '#B91E67',
                    fontSize: 20,
                    fontFamily: 'Prompt-Bold',
                    marginBottom: 25,
                    textAlign: 'center',
                  }}>
                  ยินดีต้อนรับสู่{'\n'}บัตรประจำตัวดิจิทัลเพื่อคนพิการ
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    marginBottom: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRightWidth: 1,
                      borderRightColor: '#E8E8E8',
                    }}>
                    <Icon name="idcard" size={18} color="#000000" />
                  </View>
                  <TextInputMask
                    type={'custom'}
                    keyboardType="number-pad"
                    placeholder="กรอกหมายเลขบัตรประชาชน 13 หลัก"
                    options={{
                      mask: '9-9999-99999-99-9',
                    }}
                    value={this.state.idcard}
                    onChangeText={(idcard) => {
                      this.setState({
                        idcard: idcard,
                      });
                    }}
                    placeholderTextColor="#c7c7c7"
                    style={{
                      width: '80%',
                      height: 50,
                      borderWidth: 0,
                      textAlign: 'center',
                      fontSize: 15,
                      fontFamily: 'Prompt-Regular',
                      color: '#000000',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    marginBottom: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRightWidth: 1,
                      borderRightColor: '#E8E8E8',
                    }}>
                    <Icon name="gift" size={18} color="#000000" />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      this.setState({
                        isPickerVisibleDob: true,
                        date:
                          this.state.dobDate == null ? '' : this.state.dobDate,
                      });
                    }}
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 15,
                          fontFamily: 'Prompt-Regular',
                          color:
                            this.state.dobText == null ||
                            this.state.date_dob == ''
                              ? '#c7c7c7'
                              : '#000000',
                        }}>
                        {this.state.dobText == null || this.state.date_dob == ''
                          ? 'ระบุวันเกิด'
                          : this.state.dobText}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Modal
                  isVisible={this.state.isPickerVisibleDob}
                  customBackdrop={
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.setState({isPickerVisibleDob: false})
                      }>
                      <View
                        style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
                      />
                    </TouchableWithoutFeedback>
                  }>
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      flexDirection: 'column',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 21,
                        color: '#000000',
                        marginBottom: 10,
                        fontFamily: 'Prompt-Bold',
                      }}>
                      ระบุวันเกิด
                    </Text>
                    {/* <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 22,
                        marginLeft : 12,
                        marginRight : 12
                      }}
                    >
                    <SimplerDatePicker
                      onDatePicked={this.onDobDatePicked.bind(this)}
                    />

                    </View> */}
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 22,
                        width: '100%',
                      }}>
                      <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
                        itemTextStyle={{fontFamily: 'Prompt-Medium'}}
                        iconStyle={styles.iconStyle}
                        data={this.state.yearData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? "Select item" : "..."}
                        placeholder={'ปี'}
                        searchPlaceholder="ค้นหา..."
                        value={this.state.yearDob}
                        onChange={(item) => {
                          this.onYearDoBPicked(item);
                        }}
                      />

                      <Dropdown
                        disable={this.state.yearDob === '' ? true : false}
                        style={[
                          styles.dropdown,
                          // isFocus && { borderColor: "blue" }
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
                        itemTextStyle={{fontFamily: 'Prompt-Medium'}}
                        iconStyle={styles.iconStyle}
                        data={[
                          {label: 'มกราคม', value: '01'},
                          {label: 'กุมภาพันธ์', value: '02'},
                          {label: 'มีนาคม', value: '03'},
                          {label: 'เมษายน', value: '04'},
                          {label: 'พฤษภาคม', value: '05'},
                          {label: 'มิถุนายน', value: '06'},
                          {label: 'กรกฏาคม', value: '07'},
                          {label: 'สิงหาคม', value: '08'},
                          {label: 'กันยายน', value: '09'},
                          {label: 'ตุลาคม', value: '10'},
                          {label: 'พฤศจิกายน', value: '11'},
                          {label: 'ธันวาคม', value: '12'},
                        ]}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? "Select item" : "..."}
                        placeholder={'เดือน'}
                        searchPlaceholder="ค้นหา..."
                        value={this.state.monthDob}
                        // onFocus={() => this.setState{}}
                        // onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                          this.onMonthDoBPicked(item);
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}
                        // renderLeftIcon={() => (
                        //   <AntDesign
                        //     style={styles.icon}
                        //     color={isFocus ? "blue" : "black"}
                        //     name="Safety"
                        //     size={20}
                        //   />
                        // )}
                      />

                      <Dropdown
                        disable={this.state.monthDob === '' ? true : false}
                        style={[
                          styles.dropdown,
                          // isFocus && { borderColor: "blue" }
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
                        itemTextStyle={{fontFamily: 'Prompt-Medium'}}
                        iconStyle={styles.iconStyle}
                        data={this.state.dayData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? "Select item" : "..."}
                        placeholder={'วัน'}
                        searchPlaceholder="ค้นหา..."
                        value={this.state.dayDob}
                        // value={value}
                        // onFocus={() => this.setState{}}
                        // onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                          this.onDayDoBPicked(item);
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}
                        // renderLeftIcon={() => (
                        //   <AntDesign
                        //     style={styles.icon}
                        //     color={isFocus ? "blue" : "black"}
                        //     name="Safety"
                        //     size={20}
                        //   />
                        // )}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 12,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({isPickerVisibleDob: false})
                        }>
                        <Text
                          style={{
                            fontSize: 18,
                            padding: 10,
                            fontFamily: 'Prompt-Bold',
                          }}>
                          ยกเลิก
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.onDobDateConfirmed()}>
                        <Text
                          style={{
                            fontSize: 18,
                            padding: 10,
                            marginRight: 15,
                            fontFamily: 'Prompt-Bold',
                          }}>
                          ตกลง
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    marginBottom: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRightWidth: 1,
                      borderRightColor: '#E8E8E8',
                    }}>
                    <Icon name="creditcard" size={18} color="#000000" />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      this.setState({
                        isPickerVisibleIssue: true,
                        date:
                          this.state.issueDate == null
                            ? ''
                            : this.state.issueDate,
                      });
                    }}
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 15,
                          fontFamily: 'Prompt-Regular',
                          color:
                            this.state.issueText == null ||
                            this.state.date_issue == ''
                              ? '#c7c7c7'
                              : '#000000',
                        }}>
                        {this.state.issueText == null ||
                        this.state.date_issue == ''
                          ? 'ระบุวันออกบัตร'
                          : this.state.issueText}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Modal
                  isVisible={this.state.isPickerVisibleIssue}
                  customBackdrop={
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.setState({isPickerVisibleIssue: false})
                      }>
                      <View
                        style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
                      />
                    </TouchableWithoutFeedback>
                  }>
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      flexDirection: 'column',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 21,
                        color: '#000000',
                        marginBottom: 10,
                        fontFamily: 'Prompt-Bold',
                      }}>
                      ระบุวันออกบัตร
                    </Text>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 22,
                        width: '100%',
                      }}>
                      <Dropdown
                        style={[
                          styles.dropdown,
                          // isFocus && { borderColor: "blue" }
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
                        itemTextStyle={{fontFamily: 'Prompt-Medium'}}
                        iconStyle={styles.iconStyle}
                        data={this.state.yearIssueData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? "Select item" : "..."}
                        placeholder={'ปี'}
                        searchPlaceholder="ค้นหา..."
                        value={this.state.yearIssue}
                        // onFocus={() => this.setState{}}
                        // onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                          this.onYearIssuePicked(item);
                        }}
                        // renderLeftIcon={() => (
                        //   <AntDesign
                        //     style={styles.icon}
                        //     color={isFocus ? "blue" : "black"}
                        //     name="Safety"
                        //     size={20}
                        //   />
                        // )}
                      />

                      <Dropdown
                        disable={this.state.yearIssue === '' ? true : false}
                        style={[
                          styles.dropdown,
                          // isFocus && { borderColor: "blue" }
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
                        itemTextStyle={{fontFamily: 'Prompt-Medium'}}
                        iconStyle={styles.iconStyle}
                        data={[
                          {label: 'มกราคม', value: '01'},
                          {label: 'กุมภาพันธ์', value: '02'},
                          {label: 'มีนาคม', value: '03'},
                          {label: 'เมษายน', value: '04'},
                          {label: 'พฤษภาคม', value: '05'},
                          {label: 'มิถุนายน', value: '06'},
                          {label: 'กรกฏาคม', value: '07'},
                          {label: 'สิงหาคม', value: '08'},
                          {label: 'กันยายน', value: '09'},
                          {label: 'ตุลาคม', value: '10'},
                          {label: 'พฤศจิกายน', value: '11'},
                          {label: 'ธันวาคม', value: '12'},
                        ]}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? "Select item" : "..."}
                        placeholder={'เดือน'}
                        searchPlaceholder="ค้นหา..."
                        value={this.state.monthIssue}
                        // onFocus={() => this.setState{}}
                        // onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                          this.onMonthIssuePicked(item);
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}
                        // renderLeftIcon={() => (
                        //   <AntDesign
                        //     style={styles.icon}
                        //     color={isFocus ? "blue" : "black"}
                        //     name="Safety"
                        //     size={20}
                        //   />
                        // )}
                      />

                      <Dropdown
                        disable={this.state.monthIssue === '' ? true : false}
                        style={[
                          styles.dropdown,
                          // isFocus && { borderColor: "blue" }
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
                        itemTextStyle={{fontFamily: 'Prompt-Medium'}}
                        iconStyle={styles.iconStyle}
                        data={this.state.dayIssueData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? "Select item" : "..."}
                        placeholder={'วัน'}
                        searchPlaceholder="ค้นหา..."
                        value={this.state.dayIssue}
                        // value={value}
                        // onFocus={() => this.setState{}}
                        // onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                          this.onDayIssuePicked(item);
                          // setValue(item.value);
                          // setIsFocus(false);
                        }}
                        // renderLeftIcon={() => (
                        //   <AntDesign
                        //     style={styles.icon}
                        //     color={isFocus ? "blue" : "black"}
                        //     name="Safety"
                        //     size={20}
                        //   />
                        // )}
                      />
                    </View>
                    {/* <SimplerDatePicker
                      onDatePicked={this.onIssueDatePicked.bind(this)}
                    /> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 12,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({isPickerVisibleIssue: false})
                        }>
                        <Text
                          style={{
                            fontSize: 18,
                            padding: 10,
                            fontFamily: 'Prompt-Bold',
                          }}>
                          ยกเลิก
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.onIssueDateConfirmed()}>
                        <Text
                          style={{
                            fontSize: 18,
                            padding: 10,
                            marginRight: 15,
                            fontFamily: 'Prompt-Bold',
                          }}>
                          ตกลง
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    elevation: 3,
                  }}
                  onPress={() => {
                    Linking.openURL(
                      'https://efiling.dep.go.th/form-chk-idcard',
                    );
                  }}>
                  <Text
                    style={{
                      color: '#B91E67',
                      fontSize: 16,
                      fontFamily: 'Prompt-Regular',
                    }}>
                    ยังไม่มีบัตร ?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 3,
                  }}
                  onPress={() => {
                    this.checkIdCard();
                    // this.checkPolicy();
                  }}>
                  <View
                    style={{
                      backgroundColor: '#B91E67',
                      margin: 15,
                      borderRadius: 15,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 30,
                      paddingRight: 30,
                    }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontFamily: 'Prompt-Bold',
                      }}>
                      เข้าสู่ระบบ
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: footerImageWidth * 0.617 - 71.49,
                overflow: 'hidden',
                marginTop: 25,
              }}>
              <Image
                source={{uri: 'footer_image_2'}}
                style={{
                  width: footerImageWidth,
                  height: footerImageWidth * 0.617,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: '90%',
    marginBottom: 12,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontFamily: 'Prompt-Medium',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
    color: 'black',
  },
});
