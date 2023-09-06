import React, {Component} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
  Animated,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Tooltip from 'react-native-walkthrough-tooltip';
import Barcode from 'react-native-barcode-builder';
import ModalLibrary from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/th';
var {width, height} = Dimensions.get('window');

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          height: '100%',
        }}>
        <Animated.View
          style={[
            {
              marginTop: 150,
              width: '90%',
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              elevation: 20,
            },
            {transform: [{scale: scaleValue}]},
          ]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const ModalLogout = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Animated.View
          style={[
            {
              width: '90%',
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              elevation: 20,
            },
            {transform: [{scale: scaleValue}]},
          ]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default class DigitalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      NewsData: [],
      AdvantagesData: [],
      EserviceData: [],
      AdvantageConditionData: [],
      isFetching: true,
      isCardVisible: false,
      displayWidth: Math.round(Dimensions.get('window').width),
      cardWidth: Math.round(Dimensions.get('window').width) * 0.9,
      cardRatio: 1,
      logout: false,
      stateData: '',
      checkDayExpire: 31,
      timeOut: true,
      toolTipVisible: false,
    };
  }

  async componentDidMount() {
    this.loadNews(this.state.page);
    this.loadAdvantage();
    this.loadEservice();
    this.loadAdvantageCondition();

    await fetch('https://pwd-digitalcard.com/api/message/?time=' + Date.now())
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          govMessage: res.message,
          toolTipVisible: true,
          isFetching: false,
        });
      })
      .catch((error) => {
        this.setState({
          isFetching: false,
        });
        console.log(error);
      });
    var dateCurrent = moment(Date.now()).format('DD-MM-YYYY');
    var yearCurrent = parseInt(dateCurrent.substring(6, 10)) + 543;
    var dateResult = dateCurrent.substring(0, 6) + yearCurrent;

    var a = moment([
      dateResult.substring(6, 10),
      dateResult.substring(3, 5),
      dateResult.substring(0, 2),
    ]);
    var b = moment([
      global.cardDetail.CARD_EXPIRE_DATE.substring(6, 10),
      global.cardDetail.CARD_EXPIRE_DATE.substring(3, 5),
      global.cardDetail.CARD_EXPIRE_DATE.substring(0, 2),
    ]);

    this.setState({
      checkDayExpire: b.diff(a, 'days') + 1,
    });

    setTimeout(
      function () {
        this.setState({timeOut: false});
      }.bind(this),
      5000,
    );
  }

  loadNews = (page) => {
    fetch(
      'https://pwd-digitalcard.com/api/news/' + page + '/?time=' + Date.now(),
    )
      .then((response) => response.json())
      .then((resNews) => {
        if (resNews.length > 0) {
          this.setState({
            NewsData: [...resNews, ...this.state.NewsData],
            isFetching: false,
          });
        } else {
          this.setState({
            page: this.state.page == 1 ? 1 : this.state.page - 1,
            isFetching: false,
          });
        }
      })
      .catch((error) => {
        console.log('Fetching failed');
      });
  };

  loadAdvantage = () => {
    fetch('https://pwd-digitalcard.com/api/advantage')
      .then((response) => response.json())
      .then((resAdvantages) => {
        if (resAdvantages.length > 0) {
          this.setState({
            AdvantagesData: [...resAdvantages, ...this.state.AdvantagesData],
            isFetching: false,
          });
        } else {
          this.setState({
            isFetching: false,
          });
        }
      })
      .catch((error) => {
        console.log('Fetching failed');
      });
  };

  loadEservice = () => {
    fetch('https://pwd-digitalcard.com/api/eservice')
      .then((response) => response.json())
      .then((resEservice) => {
        if (resEservice.length > 0) {
          this.setState({
            EserviceData: [...resEservice, ...this.state.EserviceData],
            isFetching: false,
          });
        } else {
          this.setState({
            isFetching: false,
          });
        }
      })
      .catch((error) => {
        console.log('Fetching failed');
      });
  };

  loadAdvantageCondition = () => {
    fetch('https://pwd-digitalcard.com/api/advantage_condition')
      .then((response) => response.json())
      .then((resAdvantageCondition) => {
        if (resAdvantageCondition.length > 0) {
          this.setState({
            AdvantageConditionData: [
              ...resAdvantageCondition,
              ...this.state.AdvantageConditionData,
            ],
            isFetching: false,
          });
        } else {
          this.setState({
            isFetching: false,
          });
        }
      })
      .catch((error) => {
        console.log('Fetching failed');
      });
  };

  onRefresh() {
    this.setState({isFetching: true, NewsData: []}, function () {
      this.loadNews(1);
    });
  }

  onScrollHandler = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.loadNews(this.state.page);
      },
    );
  };

  renderHeader = (cardShow) => {
    return (
      <View style={{width: '100%'}}>
        {this.state.checkDayExpire < 30 && this.state.timeOut ? (
          <View
            onLayout={(event) => this.onLayout(event)}
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 10,
              backgroundColor: '#CE207F',
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 14,
                fontFamily: 'Prompt-Bold',
              }}>
              เเจ้งเตือนบัตรคนพิการของท่านใกล้หมดอายุ
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 14,
                  fontFamily: 'Prompt-Bold',
                }}>
                ภายในวันที่
              </Text>

              <Text
                style={{
                  color: '#FFFF00',
                  fontSize: 14,
                  fontFamily: 'Prompt-Bold',
                  marginLeft: 6,
                }}>
                {global.cardDetail.CARD_EXPIRE_DATE}
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={{
            position: 'absolute',
            marginTop:
              this.state.checkDayExpire < 30 && this.state.timeOut ? 80 : 30,
            right: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                logout: true,
              });
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#CE207F',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 7.5,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 20,
              }}>
              <Image
                source={{uri: 'icon_logout'}}
                style={{width: 15, height: 15}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            marginTop:
              this.state.checkDayExpire < 30 && this.state.timeOut ? 80 : 30,
            right: 60,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({toolTipVisible: true})}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#CE207F',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 7.5,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 20,
              }}>
              <Image
                source={{uri: 'icon_mailbox'}}
                style={{width: 22, height: 17}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            borderRadius: 15,
            marginTop: 90,
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#F2F2F2',
              padding: 10,
            }}>
            <View style={{position: 'absolute', marginTop: -60, left: 25}}>
              <View
                style={{
                  width: 95,
                  height: 95,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 47.5,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    width: 89,
                    height: 89,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 44.5,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      width: 85,
                      height: 85,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#FFFFFF',
                      borderRadius: 42.5,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{width: 80, height: 96}}
                      source={{uri: cardDetail.IMAGE_DATA}}
                    />
                  </View>
                </View>
              </View>
              {/* <View
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: -20,
                  backgroundColor: '#CE207F',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 20,
                    fontFamily: 'Prompt-Medium',
                  }}>
                  {cardDetail.DEFORM_ID}
                </Text>
              </View> */}
            </View>
            <Text
              style={{
                textAlign: 'center',
                width: '100%',
                color: '#CE207F',
                fontSize: 14,
                fontFamily: 'Prompt-Medium',
                paddingLeft: 125,
              }}>
              {this.idFormat(cardDetail.NID)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 15,
              paddingBottom: 15,
            }}>
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 5,
                }}>
                <View style={{width: 30, justifyContent: 'flex-start'}}>
                  <Image
                    source={{uri: 'icon_name'}}
                    style={{width: 16.34, height: 10.54}}
                  />
                </View>
                <Text
                  style={{
                    color: '#484848',
                    fontSize: 14,
                    fontFamily: 'Prompt-Medium',
                  }}>
                  {cardDetail.PERSON_NAME}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 30, justifyContent: 'flex-start'}}>
                  <Image
                    source={{uri: 'icon_birthday'}}
                    style={{width: 12.89, height: 12.89}}
                  />
                </View>
                <Text
                  style={{
                    color: '#484848',
                    fontSize: 14,
                    fontFamily: 'Prompt-Medium',
                  }}>
                  {this.normalDateFormat(cardDetail.BIRTH_DATE)}
                </Text>
              </View>
            </View>
            <View>
              {/* <QRCode size={60} value={this.idFormat(cardDetail.NID)} /> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              padding: 15,
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: '#F7F7F7',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#484848',
                  fontSize: 13,
                  fontFamily: 'Prompt-Medium',
                }}>
                ประเภทความพิการ ({cardDetail.DEFORM_ID}){' '}
                {cardDetail.DEFORM_NAME}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 15,
              paddingLeft: 20,
              paddingRight: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#484848',
                  fontSize: 13,
                  fontFamily: 'Prompt-Medium',
                }}>
                บัตรหมดอายุ
              </Text>
              <Text
                style={{
                  color: '#484848',
                  fontSize: 13,
                  fontFamily: 'Prompt-Medium',
                }}>
                {this.normalDateFormat(cardDetail.CARD_EXPIRE_DATE)}
              </Text>
            </View>
            <View style={{position: 'absolute', right: 20}}>
              <TouchableOpacity onPress={this.closeCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#CE207F',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 7.5,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontFamily: 'Prompt-Medium',
                      marginRight: 5,
                    }}>
                    กดเพื่อดูบัตรจริง
                  </Text>
                  <Image
                    source={{uri: 'icon_view_card'}}
                    style={{width: 18, height: 13.5}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ModalLibrary isVisible={this.state.isCardVisible}>
          {cardShow}
        </ModalLibrary>
        <View style={{flexDirection: 'row', marginTop: 22, marginBottom: 22}}>
          <TouchableOpacity
            style={{
              flex: 0.333,
              backgroundColor: '#E7725C',
              padding: 8,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 3,
            }}
            onPress={() => {
              this.setState({
                stateData: '',
              });
              this.props.navigation.navigate('Benefit');
            }}>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{height: 34.84, justifyContent: 'center'}}>
                <Image
                  source={{uri: 'icon_benefit'}}
                  style={{width: 34.84, height: 34.84}}
                />
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'Prompt-Medium',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                ข้อมูล{'\n'}สิทธิคนพิการ
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.333,
              backgroundColor: '#E7725C',
              padding: 8,
              marginLeft: 15,
              marginRight: 15,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 3,
            }}
            onPress={() => {
              this.setState({
                stateData: '',
              });
              this.props.navigation.navigate('JobsCategory');
            }}>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{height: 34.84, justifyContent: 'center'}}>
                <Image
                  source={{uri: 'icon_jobs'}}
                  style={{width: 35.44, height: 31.34}}
                />
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'Prompt-Medium',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                ค้นหา{'\n'}งาน
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.333,
              backgroundColor: '#E7725C',
              padding: 8,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 3,
            }}
            onPress={() => {
              this.setState({
                stateData: '',
              });
              this.props.navigation.navigate('LoanWebsite');
            }}>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{height: 34.84, justifyContent: 'center'}}>
                <Image
                  source={{uri: 'icon_fund'}}
                  style={{width: 36.47, height: 30.97}}
                />
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'Prompt-Medium',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                กู้ยืมเงิน{'\n'}กองทุน
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 22}}>
          <TouchableOpacity
            style={{
              flex: 0.333,
              backgroundColor: '#E7725C',
              padding: 8,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 3,
            }}
            onPress={() => {
              this.setState({
                stateData: 'e-service',
              });
            }}>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{height: 34.84, justifyContent: 'center'}}>
                <Image
                  source={{uri: 'icon_service'}}
                  style={{width: 34.84, height: 34.84}}
                />
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'Prompt-Medium',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                ระบบ {'\n'}e-service
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 0.333,
              backgroundColor: '#E7725C',
              padding: 8,
              borderRadius: 15,
              alignItems: 'center',
              marginLeft: 15,
              justifyContent: 'center',
              elevation: 3,
            }}
            onPress={() => {
              this.setState({
                stateData: 'benefit',
              });
            }}>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{height: 34.84, justifyContent: 'center'}}>
                <Image
                  source={{uri: 'icon_inspection'}}
                  style={{width: 34.84, height: 34.84}}
                />
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'Prompt-Medium',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                ตรวจสอบ{'\n'}สิทธิ สวัสดิการ
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 0.333,
              backgroundColor: '#E7725C',
              padding: 8,
              borderRadius: 15,
              alignItems: 'center',
              marginLeft: 15,
              justifyContent: 'center',
              elevation: 3,
            }}
            onPress={() => {
              this.setState({
                stateData: 'joint_unit',
              });
              // this.props.navigation.navigate("Policy",);
            }}>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{height: 34.84, justifyContent: 'center'}}>
                <Image
                  source={{uri: 'icon_love'}}
                  style={{width: 34.84, height: 34.84}}
                />
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontFamily: 'Prompt-Medium',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                สิทธิประโยชน์{'\n'}จากหน่วยร่วม
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.state.stateData === 'e-service' ||
        this.state.stateData === 'benefit' ||
        this.state.stateData === 'joint_unit' ? (
          <View style={{flexDirection: 'row', marginTop: 0, marginBottom: 22}}>
            <ScrollView>
              {this.state.stateData === 'e-service' ? (
                <>
                  <Text
                    style={{
                      color: '#484848',
                      fontSize: 20,
                      fontFamily: 'Prompt-Bold',
                      marginTop: 8,
                      textAlign: 'left',
                      width: '100%',
                      marginBottom: 12,
                    }}>
                    ระบบ E-Service
                  </Text>
                  {this.state.EserviceData.map((prop, key) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('ServiceWebsite', {
                            url: prop.link,
                          });
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            padding: 10,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 15,
                            marginBottom: 15,
                          }}>
                          <View
                            style={{
                              position: 'relative',
                              width: 100,
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                width: 100,
                                height: 100 * 0.687,
                                borderRadius: 10,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderColor: '#EFEFEF',
                              }}
                              source={{uri: prop.image_path}}
                              // source={{ uri: item.image }}
                            />
                          </View>
                          <View
                            style={{
                              width: '75%',
                              paddingLeft: 15,
                              paddingRight: 15,
                              display: 'flex',
                              flexDirection: 'column',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Prompt-Bold',
                                fontSize: 13,
                                color: '#484848',
                              }}>
                              {prop.name}
                            </Text>
                            <Text
                              numberOfLines={4} 
                              ellipsizeMode='tail'
                              style={{
                                fontFamily: 'Prompt-Medium',
                                fontSize: 13,
                                color: '#484848',
                              }}>
                              {prop.description}
                            </Text>
                            {/* <Text
                              style={{
                                fontFamily: 'Prompt-Medium',
                                fontSize: 12,
                                color: '#BA1F68',
                                textDecorationLine: 'underline',
                              }}>
                              จาก
                            </Text> */}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              ) : this.state.stateData === 'benefit' ? (
                <>
                  <Text
                    style={{
                      color: '#484848',
                      fontSize: 20,
                      fontFamily: 'Prompt-Bold',
                      marginTop: 8,
                      textAlign: 'left',
                      width: '100%',
                      marginBottom: 12,
                    }}>
                    ตรวจสอบ สิทธิ สวัสดิการ
                  </Text>
                  {this.state.AdvantageConditionData.map((prop, key) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('InfomationWebsite', {
                            url: prop.link,
                          });
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            padding: 10,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 15,
                            marginBottom: 15,
                          }}>
                          <View
                            style={{
                              position: 'relative',
                              width: 100,
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                width: 100,
                                height: 100 * 0.687,
                                borderRadius: 10,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderColor: '#EFEFEF',
                              }}
                              source={{uri: prop.image_path}}
                              // source={{ uri: item.image }}
                            />
                          </View>
                          <View
                            style={{
                              width: '75%',
                              paddingLeft: 15,
                              paddingRight: 15,
                              display: 'flex',
                              flexDirection: 'column',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Prompt-Bold',
                                fontSize: 13,
                                color: '#484848',
                              }}>
                              {prop.name}
                            </Text>
                            <Text
                              numberOfLines={4} 
                              ellipsizeMode='tail'
                              style={{
                                fontFamily: 'Prompt-Medium',
                                fontSize: 13,
                                color: '#484848',
                              }}>
                              {prop.description}
                            </Text>
                            {/* <Text
                              style={{
                                fontFamily: 'Prompt-Medium',
                                fontSize: 12,
                                color: '#BA1F68',
                                textDecorationLine: 'underline',
                              }}>
                              จาก
                            </Text> */}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              ) : (
                <>
                  <Text
                    style={{
                      color: '#484848',
                      fontSize: 20,
                      fontFamily: 'Prompt-Bold',
                      marginTop: 8,
                      textAlign: 'left',
                      width: '100%',
                      marginBottom: 12,
                    }}>
                    สิทธิประโยชน์จากหน่วยร่วม
                  </Text>
                  {this.state.AdvantagesData.map((prop, key) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('JointUnitWebsite', {
                            url: prop.link,
                          });
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            padding: 10,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 15,
                            marginBottom: 15,
                          }}>
                          <View
                            style={{
                              position: 'relative',
                              width: 100,
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                width: 100,
                                height: 100 * 0.687,
                                borderRadius: 10,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderColor: '#EFEFEF',
                              }}
                              source={{uri: prop.image_path}}
                              // source={{ uri: item.image }}
                            />
                          </View>
                          <View
                            style={{
                              width: '75%',
                              paddingLeft: 15,
                              paddingRight: 15,
                              
                              display: 'flex',
                              flexDirection: 'column',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Prompt-Bold',
                                fontSize: 13,
                                color: '#484848',
                              }}>
                              {prop.name}
                            </Text>
                            <Text
                              numberOfLines={4} 
                              ellipsizeMode='tail'
                              style={{
                                fontFamily: 'Prompt-Medium',
                                fontSize: 13,
                                color: '#484848',
                              }}>
                              {prop.description}{' '}
                             
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Prompt-Medium',
                                fontSize: 12,
                                color: '#BA1F68',
                                textDecorationLine: 'underline',
                              }}>
                              จาก{prop.created_by}
                            </Text>
                           
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              )}
            </ScrollView>
          </View>
        ) : null}

        <View style={{flexDirection: 'column', marginTop: 0, marginBottom: 0 , marginLeft : 8 , marginRight : 8}}>
            <View style={{height : 1 , width : '100%' , backgroundColor : '#696969',}}></View>
             <Text
                    style={{
                      color: '#484848',
                      fontSize: 20,
                      fontFamily: 'Prompt-Regular',
                      marginTop: 8,
                      textAlign: 'left',
                      width: '100%',
                      marginBottom: 12,
                    }}>
                    ข่าวสาร
                  </Text>
        </View>
      </View>
    );
  };

  renderListItem = ({item, index}) => {
    const imgWidth = this.state.displayWidth * 0.33;
    // moment(item.updated_at).format("DD-MM-YYYY");
    var dateCurrennt = moment(Date.now()).format('DD-MM-YYYY');
    // console.log('ggg : ' , moment(item.updated_at).format("DD-MM-YYYY"))
    // console.log('ggg 1 : ' , dateCurrennt)
    // console.log('ggg 2 : ' , item.updated_at)

    var a = moment([
      dateCurrennt.substring(6, 10),
      dateCurrennt.substring(3, 5),
      dateCurrennt.substring(0, 2),
    ]);
    var b = moment([
      moment(item.updated_at).format('DD-MM-YYYY').substring(6, 10),
      moment(item.updated_at).format('DD-MM-YYYY').substring(3, 5),
      moment(item.updated_at).format('DD-MM-YYYY').substring(0, 2),
    ]);

    // console.log('a : ' , a)
    // console.log('b : ' , b)

    var checkDate = a.diff(b, 'days') + 1;
    console.log('result : ', checkDate);
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => this.props.navigation.navigate('NewsDetail', item)}>
        <View
          onLayout={(event) => this.onLayout(event)}
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            marginBottom: 15,
          }}>
          <View
            style={{
              position: 'relative',
              width: imgWidth,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: imgWidth,
                height: imgWidth * 0.687,
                borderRadius: 10,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#EFEFEF',
              }}
              source={{uri: item.image}}
            />
          </View>
          <View
            style={{
              width:
                this.state.displayWidth -
                (imgWidth + (Platform.OS === 'ios' ? 10 : 45)),
              paddingLeft: 15,
              paddingRight: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Prompt-Medium',
                fontSize: 13,
                color: '#484848',
                flexShrink: 1,
              }}>
              {item.title}{' '}
              <Text
                style={{
                  fontFamily: 'Prompt-Medium',
                  fontSize: 12,
                  color: '#BA1F68',
                  textDecorationLine: 'underline',
                  marginTop: 10,
                }}>
                อ่านต่อ
              </Text>
            </Text>
          </View>
          {checkDate > 30 ? null : (
            <View style={{position: 'absolute', right: 6, top: 2}}>
              <Image
                source={{uri: 'icon_new'}}
                style={{width: 32, height: 32}}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  listEmptyComponent = () => {
    if (this.state.isFetching) {
      return <View style={{marginTop: 15, borderRadius: 15}} />;
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: '#FFFFFF',
            marginTop: 15,
            borderRadius: 15,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Prompt-Medium',
                fontSize: 18,
                color: '#535353',
              }}>
              ไม่พบข้อมูล...
            </Text>
          </View>
        </View>
      );
    }
  };

  idFormat = (str, split = true) => {
    if (str != null) {
      let cleaned = str.replace(/\D/g, '');
      let match = cleaned.match(/^(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})$/);
      let splitItem = '-';
      if (!split) {
        splitItem = ' ';
      }
      if (match) {
        return (
          match[1] +
          splitItem +
          match[2] +
          splitItem +
          match[3] +
          splitItem +
          match[4] +
          splitItem +
          match[5]
        );
      } else {
        return str;
      }
    }
  };

  nameFormat = (str, type) => {
    if (str != null) {
      let nameArr = str.split(' ');
      if (type == 1) {
        let name = nameArr[0] + ' ';
        name += nameArr[1];
        return name;
      } else {
        let lastname = '';
        for (let i = 2; i < nameArr.length; i++) {
          lastname += nameArr[i] + ' ';
        }
        return lastname;
      }
    }
  };

  normalDateFormat = (str, lang = 'th') => {
    if (str != null) {
      let dateArr = str.split('-');
      let dateStatus = false;
      let dateText = '';
      const monthsTh = [
        'มกราคม',
        'กุมภาพันธ์',
        'มีนาคม',
        'เมษายน',
        'พฤษภาคม',
        'มิถุนายน',
        'กรกฎาคม',
        'สิงหาคม',
        'กันยายน',
        'ตุลาคม',
        'พฤศจิกายน',
        'ธันวาคม',
      ];
      const monthsEn = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ];
      if (parseInt(dateArr[0])) {
        dateStatus = true;
        dateText += parseInt(dateArr[0]) + ' ';
      } else {
        dateText += '-' + ' ';
      }
      if (parseInt(dateArr[1])) {
        dateStatus = true;
        if (lang == 'th') {
          dateText += monthsTh[parseInt(dateArr[1]) - 1] + ' ';
        } else {
          dateText += monthsEn[parseInt(dateArr[1]) - 1] + '. ';
        }
      } else {
        dateText += '-' + ' ';
      }
      if (parseInt(dateArr[2])) {
        dateStatus = true;
        if (lang == 'th') {
          dateText += parseInt(dateArr[2]) + ' ';
        } else {
          dateText += parseInt(dateArr[2]) - 543 + ' ';
        }
      } else {
        dateText += '-' + ' ';
      }
      return dateStatus ? dateText : lang == 'th' ? 'ตลอดชีพ' : 'LIFELONG';
    }
  };

  shortDateFormat = (str, lang = 'th') => {
    if (str != null) {
      if (str != 'ตลอดชีพ') {
        let dateArr = str.split('-');
        const monthsTh = [
          'ม.ค.',
          'ก.พ.',
          'มี.ค.',
          'เม.ย.',
          'พ.ค.',
          'มิ.ย.',
          'ก.ค.',
          'ส.ค.',
          'ก.ย.',
          'ต.ค.',
          'พ.ย.',
          'ธ.ค.',
        ];
        const monthsEn = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec',
        ];
        if (lang == 'th') {
          return (
            parseInt(dateArr[0]) +
            ' ' +
            monthsTh[parseInt(dateArr[1]) - 1] +
            ' ' +
            dateArr[2]
          );
        } else {
          return (
            parseInt(dateArr[0]) +
            ' ' +
            monthsEn[parseInt(dateArr[1]) - 1] +
            '. ' +
            (parseInt(dateArr[2]) - 543)
          );
        }
      } else {
        return lang == 'th' ? 'ตลอดชีพ' : 'LIFELONG';
      }
    }
  };

  closeCard = () => {
    this.setState({isCardVisible: !this.state.isCardVisible});
  };

  onLayout = () => {
    let width = Math.round(Dimensions.get('window').width);
    let height = Math.round(Dimensions.get('window').height);
    if (global.cardDetail.CTYPE == 'Card') {
      if (height / 2 > width) {
        width = width * 0.88;
      }
      if (width / 2 > height) {
        width = width * 0.75;
        height = height * 0.75;
      }
    } else {
      if (height / 2 > width) {
        width = width * 0.88;
      }
      if (width / 2 > height) {
        width = width * 0.8;
        height = height * 0.8;
      }
    }
    this.setState({
      displayWidth: width,
      cardWidth: height > width ? width * 0.9 : (width + 120) * 0.627,
      cardRatio: height > width ? 1 : ((width + 120) / height) * 0.627,
    });
  };

  render() {
    let cardShow;

    if (global.cardDetail.CTYPE == 'Card') {
      const card = StyleSheet.create({
        container: {
          flexDirection: 'column',
          width: '100%',
          borderRadius: 15,
        },
        firstSection: {
          flexDirection: 'row',
        },
        profileDetail: {
          flex: 1,
          flexDirection: 'column',
          marginLeft: 5 * this.state.cardRatio,
        },
        photo: {
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80 * this.state.cardRatio,
          height: 96 * this.state.cardRatio,
        },
        photoImage: {
          width: 80 * this.state.cardRatio,
          height: 96 * this.state.cardRatio,
        },
        header: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          fontFamily: 'THSarabunNew-Bold',
          fontWeight: 'bold',
          fontSize: 12 * this.state.cardRatio,
        },
        titlePwd: {
          fontWeight: 'bold',
          color: '#b72b69',
        },
        id: {
          marginBottom: 5 * this.state.cardRatio,
          fontSize: 14 * this.state.cardRatio,
          fontFamily: 'THSarabunNew-Bold',
          fontWeight: 'bold',
        },
        label: {
          fontFamily: 'THSarabunNew-Bold',
          fontSize: 14 * this.state.cardRatio,
          marginTop: -5 * this.state.cardRatio,
        },
        text: {
          fontSize: 12 * this.state.cardRatio,
          fontFamily: 'THSarabunNew-Bold',
          fontWeight: 'bold',
          marginTop: -5 * this.state.cardRatio,
        },
        deform: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -15 * this.state.cardRatio,
        },
        address: {
          flexDirection: 'row',
          marginTop: 10 * this.state.cardRatio,
          marginBottom: 10 * this.state.cardRatio,
        },
        addressText: {
          marginLeft: 10 * this.state.cardRatio,
          width: '55%',
        },
        date: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '30%',
        },
        lastestSection: {
          flexDirection: 'row',
        },
      });
      cardShow = (
        <View
          style={{
            justifyContent: 'center',
            flexDirection: this.state.cardRatio == 1 ? 'column' : 'row',
            alignItems: 'center',
          }}>
          <View
            onLayout={(event) => this.onLayout(event)}
            style={{width: this.state.cardWidth}}>
            <ImageBackground
              source={{uri: 'watermark'}}
              imageStyle={{borderRadius: 15}}
              style={{padding: 10 * this.state.cardRatio}}>
              <View style={card.container}>
                <View style={card.firstSection}>
                  <View style={card.photo}>
                    <Image
                      style={card.photoImage}
                      source={{uri: cardDetail.IMAGE_DATA}}
                    />
                  </View>
                  <View style={card.profileDetail}>
                    <View style={card.header}>
                      <Text numberOfLines={1} style={card.title}>
                        บัตรประจำตัวคนพิการ ID Card for{' '}
                        <Text style={card.titlePwd}>PWD</Text>
                      </Text>
                      <Text style={card.id}>
                        {this.idFormat(cardDetail.NID)}
                      </Text>
                    </View>
                    <Text style={card.label}>
                      ชื่อ{' '}
                      <Text style={card.text}>
                        {this.nameFormat(cardDetail.PERSON_NAME, 1)}
                      </Text>
                    </Text>
                    <Text style={card.label}>
                      นามสกุล{' '}
                      <Text style={card.text}>
                        {this.nameFormat(cardDetail.PERSON_NAME, 2)}
                      </Text>
                    </Text>
                    <Text style={card.label}>
                      วัน-เดือน-ปี เกิด{' '}
                      <Text style={card.text}>
                        {this.normalDateFormat(cardDetail.BIRTH_DATE)}
                      </Text>
                    </Text>
                    <Text style={card.label}>ประเภทความพิการ</Text>
                    <View style={card.deform}>
                      <Text style={card.text}>{cardDetail.DEFORM_ID}</Text>
                      <Text style={card.text}>{cardDetail.DEFORM_NAME}</Text>
                    </View>
                  </View>
                </View>
                <View style={card.address}>
                  <Text style={card.label}>ที่อยู่</Text>
                  <Text style={[card.text, card.addressText]}>
                    {cardDetail.ADDRESS}
                  </Text>
                </View>
                <View style={card.lastestSection}>
                  <View style={card.date}>
                    <Text style={card.label}>วันออกบัตร</Text>
                    <Text style={card.text}>
                      {this.shortDateFormat(cardDetail.CARD_ISSUE_DATE)}
                    </Text>
                  </View>
                  <View style={card.date}>
                    <Text style={card.label}>วันหมดอายุ</Text>
                    <Text style={card.text}>
                      {this.shortDateFormat(cardDetail.CARD_EXPIRE_DATE)}
                    </Text>
                  </View>
                  <View style={{position: 'absolute', right: 10, bottom: 5}}>
                    <QRCode
                      size={60 * this.state.cardRatio}
                      value={this.idFormat(cardDetail.NID)}
                    />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback onPress={this.closeCard}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#BA1F68',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontFamily: 'Prompt-Medium',
                  }}>
                  ปิด
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    } else {
      const newCard = StyleSheet.create({
        firstSection: {
          flexDirection: 'row',
        },
        container: {
          flexDirection: 'column',
          width: '100%',
          borderRadius: 15,
        },
        profileDetail: {
          flex: 1,
          flexDirection: 'column',
          marginLeft: 15 * this.state.cardRatio,
        },
        photo: {
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80 * this.state.cardRatio,
          height: 96 * this.state.cardRatio,
        },
        photoImage: {
          width: 80 * this.state.cardRatio,
          height: 96 * this.state.cardRatio,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        },
        title: {
          fontFamily: 'THSarabunNew-Bold',
          fontSize: 16 * this.state.cardRatio,
          marginRight: 5 * this.state.cardRatio,
          marginTop: -5 * this.state.cardRatio,
        },
        titleEng: {
          fontFamily: 'THSarabunNew-Bold',
          fontSize: 12 * this.state.cardRatio,
          textAlign: 'center',
          lineHeight: 12 * this.state.cardRatio,
          color: '#b72b69',
          marginTop: -2.5 * this.state.cardRatio,
        },
        id: {
          fontSize: 14 * this.state.cardRatio,
          fontFamily: 'THSarabunNew-Bold',
          fontWeight: 'bold',
        },
        label: {
          marginTop: -5 * this.state.cardRatio,
          fontFamily: 'THSarabunNew-Bold',
          fontSize: 14 * this.state.cardRatio,
        },
        eng: {
          color: '#b72b69',
          marginTop: -5 * this.state.cardRatio,
          fontSize: 10 * this.state.cardRatio,
        },
        text: {
          marginTop: -5 * this.state.cardRatio,
          fontSize: 12 * this.state.cardRatio,
          fontFamily: 'THSarabunNew-Bold',
          fontWeight: 'bold',
        },
        deform: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -18 * this.state.cardRatio,
        },
        middle: {
          flexDirection: 'row',
          marginBottom: 5 * this.state.cardRatio,
          marginLeft: 15 * this.state.cardRatio,
        },
        middleText: {
          width: '55%',
        },
        lastestSection: {
          flexDirection: 'row',
        },
        lastestSectionCol: {
          flex: 0.3 * this.state.cardRatio,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      });

      cardShow = (
        <View
          style={{
            justifyContent: 'center',
            flexDirection: this.state.cardRatio == 1 ? 'column' : 'row',
            alignItems: 'center',
          }}>
          <View
            onLayout={(event) => this.onLayout(event)}
            style={{width: this.state.cardWidth}}>
            <ImageBackground
              source={{uri: 'watermark'}}
              imageStyle={{borderRadius: 15}}
              style={{
                padding: 10 * this.state.cardRatio,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={[newCard.photo, {position: 'absolute', right: 10}]}>
                <Image
                  style={newCard.photoImage}
                  source={{uri: cardDetail.IMAGE_DATA}}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: -57 * this.state.cardRatio,
                  height: 20 * this.state.cardRatio,
                  width: 135 * this.state.cardRatio,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  transform: [{rotate: '90deg'}],
                }}>
                <Barcode
                  value={cardDetail.NID}
                  format="CODE128"
                  height={10}
                  width={1}
                />
              </View>
              <View style={newCard.container}>
                <View style={newCard.firstSection}>
                  <View style={newCard.profileDetail}>
                    <View style={newCard.header}>
                      <Image
                        source={{uri: 'icon_disabled'}}
                        style={{
                          width: 18.98 * this.state.cardRatio,
                          height: 20.33 * this.state.cardRatio,
                          marginRight: 5 * this.state.cardRatio,
                        }}
                      />
                      <Image
                        source={{uri: 'thai_flag'}}
                        style={{
                          width: 22.31 * this.state.cardRatio,
                          height: 20.33 * this.state.cardRatio,
                          marginRight: 5 * this.state.cardRatio,
                        }}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={newCard.title}>บัตรประจำตัวคนพิการ</Text>
                          <View>
                            <Text style={newCard.titleEng}>
                              Thai National Identification Card
                            </Text>
                            <Text
                              style={[
                                newCard.titleEng,
                                {marginTop: -5 * this.state.cardRatio},
                              ]}>
                              for Persons with Disabilities
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: -5 * this.state.cardRatio,
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              marginRight: 5 * this.state.cardRatio,
                            }}>
                            <Text style={newCard.label}>
                              เลขประจำตัวประชาชน
                            </Text>
                            <Text
                              style={[
                                newCard.label,
                                {
                                  color: '#b72b69',
                                  marginTop: -10 * this.state.cardRatio,
                                },
                              ]}>
                              Identification Number
                            </Text>
                          </View>
                          <Text style={newCard.id}>
                            {this.idFormat(cardDetail.NID, false)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={newCard.label}>
                      ชื่อตัวและชื่อสกุล{' '}
                      <Text style={[newCard.text, newCard.name]}>
                        {cardDetail.PERSON_NAME}
                      </Text>
                    </Text>
                    <View
                      style={{
                        width:
                          this.state.cardWidth -
                          (80 + 20 + 30) * this.state.cardRatio,
                        alignItems: 'center',
                      }}>
                      <View>
                        <Text style={[newCard.label, newCard.eng]}>
                          Name{' '}
                          <Text style={[newCard.text, newCard.eng]}>
                            {this.nameFormat(cardDetail.PERSON_NAME_ENG, 1)}
                          </Text>
                        </Text>
                        <Text style={[newCard.label, newCard.eng]}>
                          Last Name{' '}
                          <Text style={[newCard.text, newCard.eng]}>
                            {this.nameFormat(cardDetail.PERSON_NAME_ENG, 2)}
                          </Text>
                        </Text>
                        <Text style={newCard.label}>
                          เกิดวันที่{' '}
                          <Text style={newCard.text}>
                            {this.normalDateFormat(cardDetail.BIRTH_DATE)}
                          </Text>
                        </Text>
                        <Text style={[newCard.label, newCard.eng]}>
                          Date of Birth{' '}
                          <Text style={[newCard.text, newCard.eng]}>
                            {this.normalDateFormat(cardDetail.BIRTH_DATE, 'en')}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={newCard.middle}>
                  <Text style={newCard.label}>ที่อยู่ </Text>
                  <Text style={[newCard.text, newCard.middleText]}>
                    {cardDetail.ADDRESS}
                  </Text>
                </View>
                <View style={newCard.middle}>
                  <Text style={newCard.label}>ผู้ดูแล </Text>
                  <Text style={[newCard.text, newCard.middleText]}>
                    {this.idFormat(cardDetail.CURATOR_NID, false)}
                    {'\n'}
                    {cardDetail.CURATOR_NAME}
                  </Text>
                </View>
                <View style={newCard.lastestSection}>
                  <View style={newCard.lastestSectionCol}>
                    <Text style={newCard.text}>
                      {this.shortDateFormat(cardDetail.CARD_ISSUE_DATE)}
                    </Text>
                    <Text style={newCard.label}>วันออกบัตร</Text>
                    <Text style={[newCard.text, newCard.eng]}>
                      {this.shortDateFormat(cardDetail.CARD_ISSUE_DATE, 'en')}
                    </Text>
                    <Text style={[newCard.label, newCard.eng]}>
                      Date of Issue
                    </Text>
                  </View>
                  <View style={newCard.lastestSectionCol}>
                    <Text style={newCard.text}>
                      {this.shortDateFormat(cardDetail.CARD_EXPIRE_DATE)}
                    </Text>
                    <Text style={newCard.label}>วันหมดอายุ</Text>
                    <Text style={[newCard.text, newCard.eng]}>
                      {this.shortDateFormat(cardDetail.CARD_EXPIRE_DATE, 'en')}
                    </Text>
                    <Text style={[newCard.label, newCard.eng]}>
                      Date of Expiry
                    </Text>
                  </View>
                  <View style={newCard.lastestSectionCol}>
                    <Text style={newCard.label}>ประเภทความพิการ</Text>
                    <Text style={newCard.text}>{cardDetail.DEFORM_ID}</Text>
                    <Text style={[newCard.label, newCard.eng]}>
                      Type of Disability
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback onPress={this.closeCard}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#BA1F68',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontFamily: 'Prompt-Medium',
                  }}>
                  ปิด
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFF',
        }}>
        <ModalPoup visible={this.state.toolTipVisible}>
          <View>
            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#E6E6E6',
                  paddingBottom: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Prompt-Medium',
                    fontSize: 18,
                    color: '#30758D',
                  }}>
                  สารจากกรม
                </Text>
                {/* <TouchableOpacity
                    style={{position: 'absolute', right: 5}}
                    onPress={() => this.setState({toolTipVisible: false})}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: '#BA1F68',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#FFFFFF',
                          fontFamily: 'Prompt-Medium',
                        }}>
                        ปิด
                      </Text>
                    </View>
                  </TouchableOpacity> */}
                <TouchableOpacity
                  style={{position: 'absolute', top: -42, right: -40}}
                  onPress={() => {
                    this.setState({toolTipVisible: false});
                  }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: '#BA1F68',
                      borderRadius: 24,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#FFFFFF',
                        fontFamily: 'Prompt-Medium',
                      }}>
                      ปิด
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{paddingTop: 5}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Prompt-Medium',
                    fontSize: 14,
                  }}>
                  {this.state.govMessage}
                </Text>
              </View>
            </View>
          </View>
        </ModalPoup>
        <ModalLogout visible={this.state.logout}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 180,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
                paddingBottom: 5,
                marginTop: 12,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Prompt-Medium',
                  fontSize: 20,
                  color: '#30758D',
                }}>
                ออกจากระบบ
              </Text>
            </View>
            <View style={{paddingTop: 16}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Prompt-Medium',
                  fontSize: 16,
                }}>
                คุณต้องการออกจากระบบ ?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3,
                }}
                onPress={() => {
                  this.setState({
                    logout: false,
                  });
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
                    ยกเลิก
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3,
                }}
                onPress={() => {
                  this.setState({
                    logout: false,
                  });
                  AsyncStorage.removeItem('cardDetail');
                  this.props.navigation.navigate('CardRegister');
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
                    ตกลง
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ModalLogout>
        <ImageBackground
          source={{uri: 'background'}}
          style={{width: '100%', height: '100%'}}>
          <SafeAreaView
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              elevation: 2,
            }}>
            <FlatList
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              style={{
                height: '100%',
                width: '100%',
                paddingLeft: '5%',
                paddingRight: '5%',
              }}
              data={this.state.NewsData}
              ListHeaderComponent={this.renderHeader(cardShow)}
              renderItem={this.renderListItem}
              ListEmptyComponent={this.listEmptyComponent}
              keyExtractor={(item, index) => item.id.toString()}
              onEndReached={this.onScrollHandler}
              onEndThreshold={0.1}
            />
          </SafeAreaView>
          <View
            style={{
              flex: 1,
              position: 'absolute',
              left: 0,
              top: 0,
              opacity: 0.5,
              backgroundColor: 'black',
              width: width,
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}
