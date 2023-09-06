import React, {Component} from 'react';
import {
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  Text,
  Linking,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import call from 'react-native-phone-call';
import {SwipeablePanel} from 'rn-swipeable-panel';
import MultiSelect from 'react-native-checkbox-selection';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const provinceList = [
  {label: 'ทุกจังหวัด', value: 'ทุกจังหวัด'},
  {label: 'กระบี่', value: 'กระบี่'},
  {label: 'กรุงเทพมหานคร', value: 'กรุงเทพมหานคร'},
  {label: 'กาญจนบุรี', value: 'กาญจนบุรี'},
  {label: 'กาฬสินธุ์', value: 'กาฬสินธุ์'},
  {label: 'กำแพงเพชร', value: 'กำแพงเพชร'},
  {label: 'ขอนแก่น', value: 'ขอนแก่น'},
  {label: 'จันทบุรี', value: 'จันทบุรี'},
  {label: 'ฉะเชิงเทรา', value: 'ฉะเชิงเทรา'},
  {label: 'ชลบุรี', value: 'ชลบุรี'},
  {label: 'ชัยนาท', value: 'ชัยนาท'},
  {label: 'ชัยภูมิ', value: 'ชัยภูมิ'},
  {label: 'ชุมพร', value: 'ชุมพร'},
  {label: 'ตรัง', value: 'ตรัง'},
  {label: 'ตราด', value: 'ตราด'},
  {label: 'ตาก', value: 'ตาก'},
  {label: 'นครนายก', value: 'นครนายก'},
  {label: 'นครปฐม', value: 'นครปฐม'},
  {label: 'นครพนม', value: 'นครพนม'},
  {label: 'นครราชสีมา', value: 'นครราชสีมา'},
  {label: 'นครศรีธรรมราช', value: 'นครศรีธรรมราช'},
  {label: 'นครสวรรค์', value: 'นครสวรรค์'},
  {label: 'นนทบุรี', value: 'นนทบุรี'},
  {label: 'นราธิวาส', value: 'นราธิวาส'},
  {label: 'น่าน', value: 'น่าน'},
  {label: 'บึงกาฬ', value: 'บึงกาฬ'},
  {label: 'บุรีรัมย์', value: 'บุรีรัมย์'},
  {label: 'ปทุมธานี', value: 'ปทุมธานี'},
  {label: 'ประจวบคีรีขันธ์', value: 'ประจวบคีรีขันธ์'},
  {label: 'ปราจีนบุรี', value: 'ปราจีนบุรี'},
  {label: 'ปัตตานี', value: 'ปัตตานี'},
  {label: 'พระนครศรีอยุธยา', value: 'พระนครศรีอยุธยา'},
  {label: 'พะเยา', value: 'พะเยา'},
  {label: 'พังงา', value: 'พังงา'},
  {label: 'พัทลุง', value: 'พัทลุง'},
  {label: 'พิจิตร', value: 'พิจิตร'},
  {label: 'พิษณุโลก', value: 'พิษณุโลก'},
  {label: 'ภูเก็ต', value: 'ภูเก็ต'},
  {label: 'มหาสารคาม', value: 'มหาสารคาม'},
  {label: 'มุกดาหาร', value: 'มุกดาหาร'},
  {label: 'ยะลา', value: 'ยะลา'},
  {label: 'ยโสธร', value: 'ยโสธร'},
  {label: 'ร้อยเอ็ด', value: 'ร้อยเอ็ด'},
  {label: 'ระนอง', value: 'ระนอง'},
  {label: 'ระยอง', value: 'ระยอง'},
  {label: 'ราชบุรี', value: 'ราชบุรี'},
  {label: 'ลพบุรี', value: 'ลพบุรี'},
  {label: 'ลำปาง', value: 'ลำปาง'},
  {label: 'ลำพูน', value: 'ลำพูน'},
  {label: 'ศรีสะเกษ', value: 'ศรีสะเกษ'},
  {label: 'สกลนคร', value: 'สกลนคร'},
  {label: 'สงขลา', value: 'สงขลา'},
  {label: 'สตูล', value: 'สตูล'},
  {label: 'สมุทรปราการ', value: 'สมุทรปราการ'},
  {label: 'สมุทรสงคราม', value: 'สมุทรสงคราม'},
  {label: 'สมุทรสาคร', value: 'สมุทรสาคร'},
  {label: 'สระบุรี', value: 'สระบุรี'},
  {label: 'สระแก้ว', value: 'สระแก้ว'},
  {label: 'สิงห์บุรี', value: 'สิงห์บุรี'},
  {label: 'สุพรรณบุรี', value: 'สุพรรณบุรี'},
  {label: 'สุราษฎร์ธานี', value: 'สุราษฎร์ธานี'},
  {label: 'สุรินทร์', value: 'สุรินทร์'},
  {label: 'สุโขทัย', value: 'สุโขทัย'},
  {label: 'หนองคาย', value: 'หนองคาย'},
  {label: 'หนองบัวลำภู', value: 'หนองบัวลำภู'},
  {label: 'อ่างทอง', value: 'อ่างทอง'},
  {label: 'อำนาจเจริญ', value: 'อำนาจเจริญ'},
  {label: 'อุดรธานี', value: 'อุดรธานี'},
  {label: 'อุตรดิตถ์', value: 'อุตรดิตถ์'},
  {label: 'อุทัยธานี', value: 'อุทัยธานี'},
  {label: 'อุบลราชธานี', value: 'อุบลราชธานี'},
  {label: 'เชียงราย', value: 'เชียงราย'},
  {label: 'เชียงใหม่', value: 'เชียงใหม่'},
  {label: 'เพชรบุรี', value: 'เพชรบุรี'},
  {label: 'เพชรบูรณ์', value: 'เพชรบูรณ์'},
  {label: 'เลย', value: 'เลย'},
  {label: 'แพร่', value: 'แพร่'},
  {label: 'แม่ฮ่องสอน', value: 'แม่ฮ่องสอน'},
];

const serviceType = [
  {label: 'ศูนย์บริการคนพิการ', value: 'ศูนย์บริการคนพิการ'},
  {label: 'ศูนย์พัฒนาศักยภาพและอาชีพ', value: 'ศูนย์พัฒนาศักยภาพและอาชีพ'},
  {
    label: 'ศูนย์พัฒนาศักยภาพบุคคลออทิสติก',
    value: 'ศูนย์พัฒนาศักยภาพบุคคลออทิสติก',
  },
  {label: 'สถานคุ้มครองและพัฒนาคนพิการ', value: 'สถานคุ้มครองและพัฒนาคนพิการ'},
];

const locationJson = require('../database/locations copy.json');

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  inputIOS: {
    fontFamily: 'Prompt-Medium',
    fontSize: 16,
    color: '#484848',
    backgroundColor: '#fff',
    paddingTop: 7.5,
    paddingBottom: 7.5,
    paddingLeft: 15,
    paddingRight: 35,
  },
  inputAndroid: {
    fontFamily: 'Prompt-Medium',
    fontSize: 16,
    color: '#484848',
    backgroundColor: '#fff',
    paddingTop: 7.5,
    paddingBottom: 7.5,
    paddingLeft: 15,
    paddingRight: 35,
  },
  placeholder: {
    fontFamily: 'Prompt-Medium',
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#484848',
  },
  iconContainer: {
    top: 15,
    right: 5,
  },
});

export default class Location extends Component {
  state = {
    provinceSelected: 'ทุกจังหวัด',
    selectionId: 0,
    AllLocations: locationJson,
    locations: locationJson,
    swipeablePanelActive: false,
    rawLocations: locationJson,
    selectedServiceType: serviceType,
    mountedOn: Date.now(),
  };

  async componentDidMount() {
    const hasLocationPermission = await this.hasLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          // latitude: position.coords.latitude,
          // longitude: position.coords.longitude,
          this.setState({
            region: {
              latitude: 13.751330328,
              longitude: 100.489664708,
              latitudeDelta: 10,
              longitudeDelta: 10,
            },
          });
          for (let i = 0; i < this.state.rawLocations.length; i++) {
            this.state.rawLocations[i].id = i + 1;
            this.state.rawLocations[i].distance = this.calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              this.state.rawLocations[i].latitude,
              this.state.rawLocations[i].longitude,
            );
          }
          this.state.rawLocations.sort(function (a, b) {
            return a.distance - b.distance;
          });
          this.setState({
            locations: this.state.rawLocations,
            AllLocations: this.state.rawLocations,
            //selectItem: this.state.rawLocations[0]
          });
        },
        (error) => {
          this.setState({
            locations: this.state.rawLocations,
            AllLocations: this.state.rawLocations,
            region: {
              latitude: 13.751330328,
              longitude: 100.489664708,
              latitudeDelta: 10,
              longitudeDelta: 10,
            },
          });
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 15000},
      );
    }
  }

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
  };

  pressMap = (latlon) => {
    if (latlon.length > 0) {
      let googleMap =
        'https://www.google.co.th/maps/place/' +
        latlon +
        '/@' +
        latlon +
        ',17z';
      Linking.openURL(googleMap);
    }
  };

  pressPhone = (phone) => {
    if (phone.length > 0) {
      phone = phone.replace('ต่อ', ',');
      phone = phone.split(',');
      phone = phone[0].replace(/\D/g, '');
      call({
        number: phone,
        prompt: false,
      }).catch(console.error);
    }
  };

  pressMail = (mail) => {
    if (mail.length > 0) {
      Linking.openURL('mailto:' + mail);
    }
  };

  setSelectedList = (location, index) => {
    this.setState(
      {
        selectionId: index,
        swipeablePanelActive: false,
        selectItem: location,
        showAddress: false,
      },
      () => {
        this.map.fitToSuppliedMarkers(['id-' + index], true);
      },
    );
  };

  openPanel = () => {
    this.setState({swipeablePanelActive: true});
    setTimeout(function () {}, 1000);
  };

  closePanel = () => {
    this.setState({swipeablePanelActive: false});
  };

  onSelectionsChange = (selectedServiceType) => {
    this.setState({selectedServiceType});
    let selectServices = [];
    for (let i = 0; i < selectedServiceType.length; i++) {
      selectServices[i] = selectedServiceType[i].value;
    }
    let tempLocations = [];
    for (let i = 0; i < this.state.AllLocations.length; i++) {
      if (this.state.provinceSelected == provinceList[0].value) {
        if (selectServices.includes(this.state.AllLocations[i].type)) {
          tempLocations[i] = this.state.AllLocations[i];
        }
      } else {
        if (
          selectServices.includes(this.state.AllLocations[i].type) &&
          this.state.provinceSelected.includes(
            this.state.AllLocations[i].province,
          )
        ) {
          tempLocations[i] = this.state.AllLocations[i];
        }
      }
    }
    this.setState({
      locations: tempLocations,
    });
  };

  render() {
    if (this.state.locations.lenth > 0 && this.state.region) {
      return (
        <ImageBackground
          source={{uri: 'background'}}
          style={{width: '100%', height: '100%'}}>
          <SafeAreaView
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 2,
            }}>
            <ActivityIndicator></ActivityIndicator>
          </SafeAreaView>
        </ImageBackground>
      );
    } else {
      const locationList = this.state.locations.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            this.setSelectedList(item, index);
          }}>
          <View
            style={{
              borderTopWidth: index > 0 ? 2 : 0,
              borderTopColor: '#F1F1F1',
            }}>
            <View
              style={{
                flex: 1,
                width: '100%',
                flexDirection: 'column',
                backgroundColor: '#FFFFFF',
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: item.distance ? '5%' : '100%'}}>
                  {item.type == 'ศูนย์บริการคนพิการ' ? (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#FF0000',
                      }}></View>
                  ) : item.type == 'ศูนย์พัฒนาศักยภาพและอาชีพ' ? (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#0000FF',
                      }}></View>
                  ) : item.type == 'ศูนย์พัฒนาศักยภาพบุคคลออทิสติก' ? (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#006633',
                      }}></View>
                  ) : (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#FFCC00',
                      }}></View>
                  )}
                </View>
                <View style={{width: item.distance ? '55%' : '100%'}}>
                  <Text
                    style={{
                      fontFamily: 'Prompt-Medium',
                      color: '#484848',
                      fontSize: 15,
                    }}>
                    {item.name}
                    <Text
                      style={{
                        fontFamily: 'Prompt-Medium',
                        color: '#484848',
                        fontSize: 12,
                      }}></Text>
                  </Text>
                </View>
                <View
                  style={{
                    width: item.distance ? '40%' : '100%',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Prompt-Medium',
                      color: '#484848',
                      fontSize: 13,
                    }}>
                    {item.distance
                      ? 'ระยะห่าง ' +
                        item.distance
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                        ' กม.'
                      : ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ));
      return (
        <SafeAreaView style={{flex: 1}}>
          <MapView
                ref={ref => {
                  this.map = ref;
                }}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                initialRegion={this.state.region}
                >
                {this.state.locations.map((item, index) => (
                    <Marker 
                    key={index}
                    pinColor={item.type == 'ศูนย์บริการคนพิการ' ?  '#FF0000' : item.type == 'ศูนย์พัฒนาศักยภาพและอาชีพ' ? '#0000FF' :  item.type == 'ศูนย์พัฒนาศักยภาพบุคคลออทิสติก'  ? '#006633' : '#FFCC00'}
                    identifier={'id-'+index}
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude
                    }}
                    onPress={() => this.setState({selectItem: item, showAddress: false})}
                    >
                  </Marker>
                ))}
                </MapView>
          {this.state.selectItem && (
            <View>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({showAddress: !this.state.showAddress})
                }>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'column',
                    backgroundColor: '#CE207F',
                    padding: 15,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '60%'}}>
                      <Text
                        style={{
                          fontFamily: 'Prompt-Medium',
                          color: '#FFFFFF',
                          fontSize: 15,
                        }}>
                        {this.state.selectItem.name}
                        <Text
                          style={{
                            fontFamily: 'Prompt-Medium',
                            color: '#FFFFFF',
                            fontSize: 12,
                          }}>
                          {' '}
                          {this.state.selectItem.distance
                            ? '(ระยะห่าง ' +
                              this.state.selectItem.distance
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                              ' กม.)'
                            : ''}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '40%',
                      }}>
                      <TouchableOpacity
                        style={{padding: 10}}
                        onPress={() =>
                          this.pressMap(
                            this.state.selectItem.latitude +
                              ',' +
                              this.state.selectItem.longitude,
                          )
                        }>
                        <Icon
                          name="directions"
                          size={20}
                          color={
                            this.state.selectItem.latitude.length == 0 ||
                            this.state.selectItem.longitude.length == 0
                              ? '#F1F1F1'
                              : '#FFFFFF'
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{padding: 10}}
                        onPress={() =>
                          this.pressPhone(this.state.selectItem.phone)
                        }>
                        <Icon
                          name="phone"
                          size={20}
                          color={
                            this.state.selectItem.phone.length == 0
                              ? '#F1F1F1'
                              : '#FFFFFF'
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{padding: 10}}
                        onPress={() =>
                          this.pressMail(this.state.selectItem.email)
                        }>
                        <Icon
                          name="envelope-open-text"
                          size={20}
                          color={
                            this.state.selectItem.email.length == 0
                              ? '#F1F1F1'
                              : '#FFFFFF'
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  display: this.state.showAddress ? 'flex' : 'none',
                  width: '100%',
                  padding: 5,
                  backgroundColor: '#F1F1F1',
                }}>
                {this.state.selectItem.address.length > 0 && (
                  <View style={{flexDirection: 'row', margin: 5}}>
                    <View style={{width: 15, alignItems: 'center'}}>
                      <Icon name="directions" size={10} color="#484848" />
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Prompt-Medium',
                        color: '#484848',
                        fontSize: 12,
                        flexWrap: 'wrap',
                        width: '100%',
                      }}>
                      {' '}
                      {this.state.selectItem.address}
                    </Text>
                  </View>
                )}
                {this.state.selectItem.phone.length > 0 && (
                  <TouchableOpacity
                    onPress={() =>
                      this.pressPhone(this.state.selectItem.phone)
                    }>
                    <View style={{flexDirection: 'row', margin: 5}}>
                      <View style={{width: 15, alignItems: 'center'}}>
                        <Icon name="phone" size={10} color="#484848" />
                      </View>
                      <Text
                        style={{
                          fontFamily: 'Prompt-Medium',
                          color: '#484848',
                          fontSize: 12,
                          flexWrap: 'wrap',
                        }}>
                        {' '}
                        {this.state.selectItem.phone}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                {this.state.selectItem.fax.length > 0 && (
                  <View style={{flexDirection: 'row', margin: 5}}>
                    <View style={{width: 15, alignItems: 'center'}}>
                      <Icon name="fax" size={10} color="#484848" />
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Prompt-Medium',
                        color: '#484848',
                        fontSize: 12,
                        flexWrap: 'wrap',
                      }}>
                      {' '}
                      {this.state.selectItem.fax}
                    </Text>
                  </View>
                )}
                {this.state.selectItem.email.length > 0 && (
                  <TouchableOpacity
                    onPress={() => this.pressMail(this.state.selectItem.email)}>
                    <View style={{flexDirection: 'row', margin: 5}}>
                      <View style={{width: 15, alignItems: 'center'}}>
                        <Icon
                          name="envelope-open-text"
                          size={10}
                          color="#484848"
                        />
                      </View>
                      <Text
                        style={{
                          fontFamily: 'Prompt-Medium',
                          color: '#484848',
                          fontSize: 12,
                          flexWrap: 'wrap',
                        }}>
                        {' '}
                        {this.state.selectItem.email}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          <View style={{alignItems: 'flex-end', marginTop: 15, zIndex: 3}}>
            <MultiSelect
              data={serviceType}
              onSelectedItemsChange={this.onSelectionsChange}
              selectedItems={this.state.selectedServiceType}
              title="กรุณาเลือกประเภทของศูนย์ฯ"
              select="ประเภทของศูนย์ฯ"
              enableTitle={true}
              containerStyle={{
                position: 'absolute',
                backgroundColor: 'white',
                paddingLeft: 5,
                paddingRight: 5,
                right: 15,
                zIndex: 3,
                elevation: 3,
              }}
              styleTextDropdown={{
                fontFamily: 'Prompt-Medium',
                color: '#484848',
                fontSize: 16,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 60,
              right: 15,
              alignItems: 'flex-end',
              zIndex: 2,
              elevation: 2,
            }}>
            <RNPickerSelect
              onValueChange={(value) => {
                if (
                  value !== this.state.provinceSelected &&
                  Date.now() - this.state.mountedOn > 100
                ) {
                  this.setState(
                    {
                      mountedOn: Date.now(),
                      provinceSelected: value,
                    },
                    () => {
                      if (value == provinceList[0].value) {
                        let selectServices = [];
                        for (
                          let i = 0;
                          i < this.state.selectedServiceType.length;
                          i++
                        ) {
                          selectServices[i] =
                            this.state.selectedServiceType[i].value;
                        }
                        let tempLocations = [];
                        for (
                          let i = 0;
                          i < this.state.AllLocations.length;
                          i++
                        ) {
                          if (
                            selectServices.includes(
                              this.state.AllLocations[i].type,
                            )
                          ) {
                            tempLocations[i] = this.state.AllLocations[i];
                          }
                        }
                        this.setState({
                          locations: tempLocations,
                        });
                      } else {
                        let tempLocations = [];
                        let selectServices = [];
                        for (
                          let i = 0;
                          i < this.state.selectedServiceType.length;
                          i++
                        ) {
                          selectServices[i] =
                            this.state.selectedServiceType[i].value;
                        }
                        for (
                          let i = 0;
                          i < this.state.AllLocations.length;
                          i++
                        ) {
                          if (
                            selectServices.includes(
                              this.state.AllLocations[i].type,
                            ) &&
                            value.includes(this.state.AllLocations[i].province)
                          ) {
                            tempLocations[i] = this.state.AllLocations[i];
                          }
                        }
                        this.setState({
                          locations: tempLocations,
                        });
                      }
                    },
                  );
                }
              }}
              items={provinceList}
              placeholder={{}}
              value={this.state.provinceSelected}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={true}
              Icon={() => {
                return (
                  <Icon name="caret-down" size={20} style={{marginRight: 5 , marginTop : -4}} />
                );
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 30,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.openPanel();
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 15,
                  opacity: 0.8,
                }}>
                <Text
                  style={{
                    fontFamily: 'Prompt-Medium',
                    color: '#484848',
                    fontSize: 14,
                  }}>
                  รายชื่อศูนย์ฯ
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <SwipeablePanel
            fullWidth
            closeOnTouchOutside={true}
            isActive={this.state.swipeablePanelActive}
            onClose={this.closePanel}>
            <View
              style={{
                paddingBottom:
                  Math.round(Dimensions.get('window').height) * 0.5,
              }}>
              {locationList}
            </View>
          </SwipeablePanel>
        </SafeAreaView>
      );
    }
  }
}
