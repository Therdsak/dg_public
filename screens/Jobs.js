import React, {Component} from 'react';
import {SafeAreaView, Linking, ActivityIndicator,TouchableHighlight, StyleSheet, ImageBackground, FlatList, View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import {Chevron} from 'react-native-shapes'

const provinceList = [{"label":"กระบี่","value":"กระบี่"},{"label":"กรุงเทพมหานคร","value":"กรุงเทพมหานคร"},{"label":"กาญจนบุรี","value":"กาญจนบุรี"},{"label":"กาฬสินธุ์","value":"กาฬสินธุ์"},{"label":"กำแพงเพชร","value":"กำแพงเพชร"},{"label":"ขอนแก่น","value":"ขอนแก่น"},{"label":"จันทบุรี","value":"จันทบุรี"},{"label":"ฉะเชิงเทรา","value":"ฉะเชิงเทรา"},{"label":"ชลบุรี","value":"ชลบุรี"},{"label":"ชัยนาท","value":"ชัยนาท"},{"label":"ชัยภูมิ","value":"ชัยภูมิ"},{"label":"ชุมพร","value":"ชุมพร"},{"label":"ตรัง","value":"ตรัง"},{"label":"ตราด","value":"ตราด"},{"label":"ตาก","value":"ตาก"},{"label":"นครนายก","value":"นครนายก"},{"label":"นครปฐม","value":"นครปฐม"},{"label":"นครพนม","value":"นครพนม"},{"label":"นครราชสีมา","value":"นครราชสีมา"},{"label":"นครศรีธรรมราช","value":"นครศรีธรรมราช"},{"label":"นครสวรรค์","value":"นครสวรรค์"},{"label":"นนทบุรี","value":"นนทบุรี"},{"label":"นราธิวาส","value":"นราธิวาส"},{"label":"น่าน","value":"น่าน"},{"label":"บึงกาฬ","value":"บึงกาฬ"},{"label":"บุรีรัมย์","value":"บุรีรัมย์"},{"label":"ปทุมธานี","value":"ปทุมธานี"},{"label":"ประจวบคีรีขันธ์","value":"ประจวบคีรีขันธ์"},{"label":"ปราจีนบุรี","value":"ปราจีนบุรี"},{"label":"ปัตตานี","value":"ปัตตานี"},{"label":"พระนครศรีอยุธยา","value":"พระนครศรีอยุธยา"},{"label":"พะเยา","value":"พะเยา"},{"label":"พังงา","value":"พังงา"},{"label":"พัทลุง","value":"พัทลุง"},{"label":"พิจิตร","value":"พิจิตร"},{"label":"พิษณุโลก","value":"พิษณุโลก"},{"label":"ภูเก็ต","value":"ภูเก็ต"},{"label":"มหาสารคาม","value":"มหาสารคาม"},{"label":"มุกดาหาร","value":"มุกดาหาร"},{"label":"ยะลา","value":"ยะลา"},{"label":"ยโสธร","value":"ยโสธร"},{"label":"ร้อยเอ็ด","value":"ร้อยเอ็ด"},{"label":"ระนอง","value":"ระนอง"},{"label":"ระยอง","value":"ระยอง"},{"label":"ราชบุรี","value":"ราชบุรี"},{"label":"ลพบุรี","value":"ลพบุรี"},{"label":"ลำปาง","value":"ลำปาง"},{"label":"ลำพูน","value":"ลำพูน"},{"label":"ศรีสะเกษ","value":"ศรีสะเกษ"},{"label":"สกลนคร","value":"สกลนคร"},{"label":"สงขลา","value":"สงขลา"},{"label":"สตูล","value":"สตูล"},{"label":"สมุทรปราการ","value":"สมุทรปราการ"},{"label":"สมุทรสงคราม","value":"สมุทรสงคราม"},{"label":"สมุทรสาคร","value":"สมุทรสาคร"},{"label":"สระบุรี","value":"สระบุรี"},{"label":"สระแก้ว","value":"สระแก้ว"},{"label":"สิงห์บุรี","value":"สิงห์บุรี"},{"label":"สุพรรณบุรี","value":"สุพรรณบุรี"},{"label":"สุราษฎร์ธานี","value":"สุราษฎร์ธานี"},{"label":"สุรินทร์","value":"สุรินทร์"},{"label":"สุโขทัย","value":"สุโขทัย"},{"label":"หนองคาย","value":"หนองคาย"},{"label":"หนองบัวลำภู","value":"หนองบัวลำภู"},{"label":"อ่างทอง","value":"อ่างทอง"},{"label":"อำนาจเจริญ","value":"อำนาจเจริญ"},{"label":"อุดรธานี","value":"อุดรธานี"},{"label":"อุตรดิตถ์","value":"อุตรดิตถ์"},{"label":"อุทัยธานี","value":"อุทัยธานี"},{"label":"อุบลราชธานี","value":"อุบลราชธานี"},{"label":"เชียงราย","value":"เชียงราย"},{"label":"เชียงใหม่","value":"เชียงใหม่"},{"label":"เพชรบุรี","value":"เพชรบุรี"},{"label":"เพชรบูรณ์","value":"เพชรบูรณ์"},{"label":"เลย","value":"เลย"},{"label":"แพร่","value":"แพร่"},{"label":"แม่ฮ่องสอน","value":"แม่ฮ่องสอน"}];
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: 'Prompt-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#BA1F68', 
    borderRadius: 15, 
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 15,
    paddingRight: 30,
  },
  inputAndroid: {
    fontFamily: 'Prompt-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#BA1F68', 
    borderRadius: 15, 
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 15,
    paddingRight: 30,
  },
  placeholder: {
    fontFamily: 'Prompt-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  iconContainer: {
    top: 14,
    right: 15,
  },
});

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      JobsData: [],
      isFetching: true,
      provinceSelected : this.getProvince(cardDetail.ADDRESS),
      screenWidth: Math.round(Dimensions.get('window').width), 
      screenHeight: Math.round(Dimensions.get('window').height), 
      mountedOn: Date.now(),
    };
  }

  componentDidMount(){
    this.loadJobs(this.state.page);
  }

  getDeform = (str) => {
     if(str!=null){
       return '/'+parseInt(str);
     }
   };

 getAge = (str) => {
    if(str!=null){
      let year = new Date().getFullYear();
      let dateArr = str.split('-');
      return '/'+((year+543)-parseInt(dateArr[2]));
    }
  };

  getProvince = (str) => {
    if(str!=null){
      let data = str.split('.');
      return  data[(data.length-1)];
    }
  };
  

  loadJobs = (page) =>{
    fetch('https://pwd-digitalcard.com/api/jobs/'+page+this.getAge(cardDetail.BIRTH_DATE)+this.getDeform(cardDetail.DEFORM_ID)+'/'+this.state.provinceSelected)
    .then((response) => response.json())
    .then((resJobs) => {
      if(resJobs.length>0){
        if(page==1){
          this.setState({ 
            JobsData: resJobs, 
            isFetching: false,
          });
        }else{
          this.setState({ 
            JobsData: [...this.state.JobsData, ...resJobs], 
            isFetching: false,
          });
        }
      }else if(page==1 && resJobs.length==0){
        this.setState({ 
          JobsData: [],
          page: this.state.page==1 ? 1 : this.state.page-1, 
          isFetching: false,
        });
      }else{
        this.setState({ 
          page: this.state.page==1 ? 1 : this.state.page-1, 
          isFetching: false,
        });
      }
    }).catch((error) => {
      console.log("Fetching failed "+error);
    });
  }

  onRefresh() {
    this.setState({ isFetching: true, JobsData: [] }, function() { this.loadJobs(1) });
  }

  onScrollHandler = () => {
    this.setState({
      page: this.state.page+1
    }, () => {
      this.loadJobs(this.state.page);
    });
  }

  renderListItem = ({ item, index }) => {
    return (
        <TouchableOpacity key={item.id} onPress = {() => this.props.navigation.navigate('JobsDetail', item)}>
        <View style={{flex: 1, flexDirection: 'row', padding: 15, backgroundColor: index%2==0 ? '#F8F8F8' : '#FFFFFF'}}>
            <View style={{width: '100%', paddingLeft: 15, paddingRight: 15}}>
              <Text style={{fontFamily: 'Prompt-Medium', fontSize: 14, color: '#484848', flexShrink: 1}}>{item.title}</Text>
              <Text style={{fontFamily: 'Prompt-Medium', fontSize: 13, color: '#484848', flexShrink: 1, marginTop: 10}}>สถานที่ {item.location} ต.{item.subdistrict} อ.{item.district} จ.{item.province} {item.zipcode}</Text>
              <Text style={{fontFamily: 'Prompt-Medium', fontSize: 12, color: '#BA1F68', textDecorationLine: 'underline', marginTop: 5}}>ดูรายละเอียดเพิ่มเติม</Text>
            </View>
        </View>
      </TouchableOpacity>
    )
  };

  listEmptyComponent = () => {
    if(this.state.isFetching){
      return (
        <View style={{flex: 1, flexDirection: 'row', paddingLeft: 5, paddingRight: 5, backgroundColor: '#FFFFFF', width: '100%'}}>
          <View style={{width: '100%', flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#535353'}}>กำลังโหลดข้อมูล...</Text>
          </View>
        </View>
      );
    }else{
      return (
        <View style={{flex: 1, flexDirection: 'row', paddingLeft: 5, paddingRight: 5, backgroundColor: '#FFFFFF', width: '100%'}}>
          <View style={{width: '100%', flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#535353'}}>ไม่พบตำแหน่งว่างงาน...</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
      <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', elevation: 2}}>
        <View style={{alignItems: 'space-between'}}>
          <View style={{backgroundColor: '#FFFFFF', borderRadius: 15, width: '90%', overflow: 'hidden', shadowColor: "#000", shadowOffset: { width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 5, elevation: 3}}>
          <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', padding: 20}}>
            <RNPickerSelect
            onValueChange={(value) => {
              if (value !== this.state.provinceSelected && (Date.now() - this.state.mountedOn > 100)) {
               this.setState({
                mountedOn: Date.now(),
                provinceSelected: value
                }, () => {
                  this.loadJobs(1);
                });
              }
            }}
            items={provinceList}
            placeholder= {{}}
            value={this.state.provinceSelected}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            Icon={() => {
              return <Chevron size={1.5} color='white' />;
            }}
            />
          </View>
          <FlatList
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          style={{height: this.state.screenHeight-220, width: '100%'}}
          data={this.state.JobsData}
          renderItem={this.renderListItem}
          ListEmptyComponent={this.listEmptyComponent}
          keyExtractor={(item, index) => item.id.toString()}
          onEndReached={this.onScrollHandler}
          onEndThreshold={0.1}
          />
          </View>
          <TouchableOpacity style={{position: 'absolute', top: -12, right: -12, elevation: 3}} onPress={()=>{this.props.navigation.goBack()}}>
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