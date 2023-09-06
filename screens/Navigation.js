import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
  View,
  Image,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {NativeModules} from 'react-native';

import CardRegister from './Card/Register';
import DigitalCard from './Card/Detail';
import Benefits from './Benefits';
import BenefitDetail from './BenefitDetail';
import LoanWebsite from './LoanWebsite';
import InfomationWebsite from './InfomationWebsite';
import ServiceWebsite from './ServiceWebsite';
import JointUnitWebsite from './JointUnitWebsite';
// import Loan from './Loan';
// import LoanApplication from './LoanApplication';
import CallCenter from './CallCenter';
import Location from './Location';
import NewsDetail from './NewsDetail';
import Jobs from './Jobs';
import JobsDetail from './JobsDetail';
import JobsCategory from './JobsCategory';

import Pincode from './Pincode';
import Policy from './Policy';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {fadeIn, fadeOut, fromLeft} from 'react-navigation-transitions';

let checkExpireDate = new Date().getTime();
let showExpireDateAlert = false;

changeExpireDate = str => {
  if (str != null) {
    if (str != 'ตลอดชีพ') {
      let dateArr = str.split('-');
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
      return new Date(
        parseInt(dateArr[0]) +
          ' ' +
          monthsEn[parseInt(dateArr[1]) - 1] +
          '. ' +
          (parseInt(dateArr[2]) - 543),
      );
    } else {
      return 'LIFELONG';
    }
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

getDaysBetweenDates = (d0, d1) => {
  var msPerDay = 8.64e7;
  var x0 = new Date(d0);
  var x1 = new Date(d1);
  x0.setHours(12, 0, 0);
  x1.setHours(12, 0, 0);
  return Math.round((x1 - x0) / msPerDay);
};

const handleCustomTransition = ({scenes}) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (
    prevScene &&
    prevScene.route.routeName === 'Benefit' &&
    nextScene.route.routeName === 'BenefitDetail'
  ) {
    return fromLeft();
  } else if (
    prevScene &&
    (nextScene.route.routeName === 'Jobs' ||
      nextScene.route.routeName === 'JobsDetail' ||
      nextScene.route.routeName === 'NewsDetail')
  ) {
    return fadeIn();
  } else if (
    prevScene &&
    (prevScene.route.routeName === 'Jobs' ||
      prevScene.route.routeName === 'NewsDetail')
  ) {
    return fadeOut();
  }

  let cardExpireDate = changeExpireDate(cardDetail.CARD_EXPIRE_DATE);

  if (
    showExpireDateAlert == false &&
    cardDetail &&
    cardExpireDate !== 'LIFELONG' &&
    prevScene != nextScene &&
    new Date().getTime() - checkExpireDate > 21600
  ) {
    checkExpireDate = new Date().getTime();
    if (
      cardExpireDate !== 'LIFELONG' &&
      cardExpireDate.getTime() < new Date().getTime()
    ) {
      showExpireDateAlert = true;
      Alert.alert(
        'แจ้งเตือน',
        'บัตรประจำตัวคนพิการของท่านหมดอายุแล้วเมื่อวันที่ ' +
          this.shortDateFormat(cardDetail.CARD_EXPIRE_DATE),
        [
          {
            text: 'ตกลง',
            onPress: () => {
              showExpireDateAlert = false;
              global.cardDetail = null;
              AsyncStorage.removeItem('cardDetail');
              NativeModules.DevSettings.reload();
            },
          },
        ],
      );
    }
  }

  if (
    cardDetail &&
    prevScene != nextScene &&
    cardExpireDate !== 'LIFELONG' &&
    cardExpireDate.getTime() > new Date().getTime() &&
    getDaysBetweenDates(new Date().getTime(), cardExpireDate.getTime()) <= 30 &&
    getDaysBetweenDates(new Date().getTime(), cardExpireDate.getTime()) > 0
  ) {
    let showRemindExpireDateAlert = false;
    let dayLeft = getDaysBetweenDates(
      new Date().getTime(),
      cardExpireDate.getTime(),
    );
    if (
      global.showRemindExpireDateAlert1st == false &&
      dayLeft <= 30 &&
      dayLeft > 20
    ) {
      AsyncStorage.setItem(
        'showRemindExpireDateAlert1st',
        JSON.stringify(true),
      );
      global.showRemindExpireDateAlert1st = true;
      showRemindExpireDateAlert = true;
    } else if (
      global.showRemindExpireDateAlert2nd == false &&
      dayLeft <= 20 &&
      dayLeft > 10
    ) {
      AsyncStorage.setItem(
        'showRemindExpireDateAlert2nd',
        JSON.stringify(true),
      );
      global.showRemindExpireDateAlert2nd = true;
      showRemindExpireDateAlert = true;
    } else if (
      global.showRemindExpireDateAlert3rd == false &&
      dayLeft <= 10 &&
      dayLeft > 0
    ) {
      AsyncStorage.setItem(
        'showRemindExpireDateAlert3rd',
        JSON.stringify(true),
      );
      global.showRemindExpireDateAlert3rd = true;
      showRemindExpireDateAlert = true;
    }
    if (showRemindExpireDateAlert) {
      Alert.alert(
        'แจ้งเตือน',
        'บัตรประจำตัวคนพิการของท่านจะหมดอายุในอีก ' +
          dayLeft +
          ' วัน (' +
          this.shortDateFormat(cardDetail.CARD_EXPIRE_DATE) +
          ')',
        [
          {
            text: 'ตกลง',
          },
        ],
      );
    }
  }
};

const Card = createStackNavigator(
  {
    DigitalCard: {
      screen: DigitalCard,
      navigationOptions: () => ({
        headerTruncatedBackTitle: '',
        headerShown: false,
      }),
    },
    Benefit: {
      screen: Benefits,
      navigationOptions: () => ({
        title: 'ข้อมูลสิทธิคนพิการ',
        headerTruncatedBackTitle: '',
        headerTintColor: '#B91E67',
        headerTitleStyle: {
          backgroundColor: '#FCFCFC',
          fontFamily: 'Prompt-Medium',
          fontSize: 18,
          color: '#B91E67',
        },
      }),
    },
    BenefitDetail: {
      screen: BenefitDetail,
      navigationOptions: () => ({
        headerTruncatedBackTitle: '',
        headerTintColor: '#B91E67',
        headerTitleStyle: {
          backgroundColor: '#FCFCFC',
          fontFamily: 'Prompt-Medium',
          fontSize: 18,
          color: '#B91E67',
        },
      }),
    },
    LoanWebsite: {
      screen: LoanWebsite,
      navigationOptions: () => ({
        title: 'กู้ยืมเงินกองทุน',
        headerTruncatedBackTitle: '',
        headerTintColor: '#B91E67',
        headerTitleStyle: {
          backgroundColor: '#FCFCFC',
          fontFamily: 'Prompt-Medium',
          fontSize: 18,
          color: '#B91E67',
        },
      }),
    },

    InfomationWebsite: {
      screen: InfomationWebsite,
      navigationOptions: () => ({
        title: 'ตรวจสอบ สิทธิ สวัสดิการ',
        headerTruncatedBackTitle: '',
        headerTintColor: '#B91E67',
        headerTitleStyle: {
          backgroundColor: '#FCFCFC',
          fontFamily: 'Prompt-Medium',
          fontSize: 18,
          color: '#B91E67',
        },
      }),
    },   
    
    ServiceWebsite: {
      screen: ServiceWebsite,
      navigationOptions: () => ({
        title: 'ระบบ E-Service',
        headerTruncatedBackTitle: '',
        headerTintColor: '#B91E67',
        headerTitleStyle: {
          backgroundColor: '#FCFCFC',
          fontFamily: 'Prompt-Medium',
          fontSize: 18,
          color: '#B91E67',
        },
      }),
    },   

    JointUnitWebsite: {
      screen: JointUnitWebsite,
      navigationOptions: () => ({
        title: 'สิทธิประโยชน์จากหน่วยร่วม',
        headerTruncatedBackTitle: '',
        headerTintColor: '#B91E67',
        headerTitleStyle: {
          backgroundColor: '#FCFCFC',
          fontFamily: 'Prompt-Medium',
          fontSize: 18,
          color: '#B91E67',
        },
      }),
    },   
    // Loan: {
    //     screen: Loan,
    //     navigationOptions: {
    //       header: null,
    //     }
    // },
    // LoanApplication: {
    //     screen: LoanApplication,
    //     navigationOptions: () => ({
    //         title: 'บันทึกแบบคำขอกู้ยืมเงิน',
    //         headerTruncatedBackTitle: '',
    //         headerTintColor: '#B91E67',
    //         headerTitleStyle: {
    //             backgroundColor: '#FCFCFC',
    //             fontFamily: 'Prompt-Medium',
    //             fontSize: 18,
    //             color: '#B91E67'
    //         },
    //     }),
    // },
    NewsDetail: {
      screen: NewsDetail,
      navigationOptions: {
        header: null,
      },
    },
    Jobs: {
      screen: Jobs,
      navigationOptions: () => ({
        header: null,
      }),
    },
    JobsDetail: {
      screen: JobsDetail,
      navigationOptions: () => ({
        header: null,
      }),
    },
    JobsCategory: {
      screen: JobsCategory,
      navigationOptions: () => ({
        title: 'ค้นหางาน',
        headerTruncatedBackTitle: '',
        headerTintColor: '#B91E67',
        headerTitleStyle: {
          backgroundColor: '#FCFCFC',
          fontFamily: 'Prompt-Medium',
          fontSize: 18,
          color: '#B91E67',
        },
      }),
    },
    // Pincode: {
    //   screen: Pincode,
    //   navigationOptions: {
    //     tabBarVisible: false,
    //   },
    // },
    // Policy: {
    //   screen: Policy,
    //   navigationOptions: {
    //     tabBarVisible: false,
    //   },
    // },
  },
  {
    initialRouteName: 'DigitalCard',
    transitionConfig: nav => handleCustomTransition(nav),
  },
);

const screens = {
  CardRegister: {
    screen: CardRegister,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  Card: {
    screen: Card,
    navigationOptions: {
      tabBarLabel: 'หน้าหลัก',
      tabBarIcon: (
        <Image source={{uri: 'icon_profile'}} style={{width: 28, height: 28}} />
      ),
    },
  },
  CallCenter: {
    screen: CallCenter,
    navigationOptions: {
      tabBarLabel: 'สายด่วน',
      tabBarIcon: (
        <Image source={{uri: 'icon_call'}} style={{width: 28, height: 28}} />
      ),
    },
  },
  Location: {
    screen: Location,
    navigationOptions: {
      tabBarLabel: 'หน่วยงานที่\nให้บริการด้าน\nคนพิการ',
      tabBarIcon: (
        <Image
          source={{uri: 'icon_location'}}
          style={{width: 28, height: 28}}
        />
      ),
    },
  },
  Pincode: {
    screen: Pincode,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  Policy: {
    screen: Policy,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
};

const TabBar = props => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const {routes, index: activeRouteIndex} = navigation.state;
  return (
    <View style={[tabStyles.container]}>
      {routes.map((route, routeIndex) => {
        if (route.routeName != 'CardRegister' && route.routeName != 'Pincode' && route.routeName != 'Policy') {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
          return (
            <TouchableOpacity
              key={routeIndex}
              style={[
                tabStyles.tabButton,
                routeIndex > 0
                  ? {borderLeftWidth: 1, borderColor: '#E1E1E1'}
                  : '',
              ]}
              onPress={() => {
                onTabPress({route});
              }}
              onLongPress={() => {
                onTabLongPress({route});
              }}
              accessibilityLabel={getAccessibilityLabel({route})}>
              {renderIcon({route, focused: isRouteActive, tintColor})}
              <Text
                style={[
                  route.routeName != 'Location'
                    ? tabStyles.text
                    : tabStyles.textSmall,
                  {color: tintColor},
                ]}>
                {getLabelText({route})}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FCFCFC',
    elevation: 2,
    height: 55,
    marginBottom: getBottomSpace() / 2,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
    fontFamily: 'Prompt-Regular',
    fontSize: 14,
  },
  textSmall: {
    marginLeft: 5,
    fontFamily: 'Prompt-Regular',
    fontSize: 12,
  },
});

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggin: 'loading',
    };
  }

  async componentDidMount() {
    let value = await AsyncStorage.getItem('cardDetail');
    global.showRemindExpireDateAlert1st = JSON.parse(
      await AsyncStorage.getItem('showRemindExpireDateAlert1st'),
    );
    global.showRemindExpireDateAlert2nd = JSON.parse(
      await AsyncStorage.getItem('showRemindExpireDateAlert2nd'),
    );
    global.showRemindExpireDateAlert3rd = JSON.parse(
      await AsyncStorage.getItem('showRemindExpireDateAlert3rd'),
    );
    console.log('value : ', value);
    if (value === null) {
      this.setState({loggin: 'none'});
    }else{
      global.cardDetail = JSON.parse(value);
    if (global.cardDetail != null && global.cardDetail.NID.length == 13) {
      this.setState({loggin: 'logged'});
    } else {
      this.setState({loggin: 'none'});
    }
    }
    

    console.log('this.state.loggin : ', this.state.loggin);
  }

  render() {
    if (this.state.loggin == 'none' || this.state.loggin == 'logged') {
      const MainMenu = createAppContainer(
        createBottomTabNavigator(screens, {
          headerMode: 'none',
          initialRouteName:
            this.state.loggin == 'none' ? 'CardRegister' : 'Pincode',
          tabBarComponent: TabBar,
          tabBarOptions: {
            showIcon: true,
            activeTintColor: '#000000',
            inactiveTintColor: '#000000',
          },
        }),
      );
      return <MainMenu />;
    } else {
      return (
        <ImageBackground
          source={{uri: 'background'}}
          style={{width: '100%', height: '100%'}}>
          <SafeAreaView
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              elevation: 2,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 108,
                marginTop: 22,
                marginBottom: 22,
              }}>
              <Image
                source={{uri: 'egov_text_logo'}}
                style={{width: 145, height: 108}}
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator />
            </View>
          </SafeAreaView>
        </ImageBackground>
      );
    }
  }
}
