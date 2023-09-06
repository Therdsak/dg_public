// import { each } from 'lodash';
// import React, {Component} from 'react';
// import {SafeAreaView, ActivityIndicator, StyleSheet, ImageBackground, FlatList, View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';


// export default class Loan extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         disabledBtn: false,
//         isFetching: true,
//         ApplicationsData: [],
//         screenWidth: Math.round(Dimensions.get('window').width), 
//         screenHeight: Math.round(Dimensions.get('window').height), 
//     };
//   }
//   componentDidMount() {
//     this.loadApplications();
//     this.willFocusSubscription = this.props.navigation.addListener(
//       'willFocus',
//       () => {
//         this.loadApplications();
//       }
//     );
//   }

//   componentWillUnmount() {
//     this.willFocusSubscription.remove();
//   }

//   dateFormat = (str) => {
//     if(str!=null){
//       let dateArr = str.split('-');
//       let dateStatus = false;
//       let dateText = '';
//       if(parseInt(dateArr[2])){
//         dateStatus = true;
//         dateText += (parseInt(dateArr[2])-543)+'-';
//       }
//       if(parseInt(dateArr[1])){
//         dateStatus = true;
//         dateText += parseInt(dateArr[1])+'-';
//       }
//       if(parseInt(dateArr[0])){
//         dateStatus = true;
//         dateText += parseInt(dateArr[0]);
//       }
      
//       return  dateStatus ? dateText : '0000-00-00';
//     }
//   };

//   loadApplications = () =>{
//     fetch('https://pwd-digitalcard.com/api/application-history/'+cardDetail.NID+'/'+this.dateFormat(cardDetail.BIRTH_DATE))
//     .then((response) => response.json())
//     .then((resApplications) => {
//         resApplications.map((item, index) => {
//             if(item.status=='รอดำเนินการ'){
//                 this.setState({ 
//                   disabledBtn: true,
//                 });
//             }
//         });
//         this.setState({ 
//           ApplicationsData: resApplications, 
//           isFetching: false,
//         });
//     }).catch((error) => {
//       console.log("Fetching failed "+error);
//     });
//   }

//   onRefresh() {
//     this.setState({ isFetching: true, disabledBtn: false, ApplicationsData: [] }, function() { this.loadApplications() });
//   }

//   renderListItem = ({ item, index }) => {
//     return (
//         <View style={{flex: 1, flexDirection: 'row', padding: 15, backgroundColor: index%2==0 ? '#F8F8F8' : '#FFFFFF'}}>
//             <View style={{width: '100%', paddingLeft: 15, paddingRight: 15}}>
//               <Text style={{fontFamily: 'Prompt-Medium', fontSize: 14, color: '#BA1F68', flexShrink: 1}}>{item.status}</Text>
//               <Text style={{fontFamily: 'Prompt-Medium', fontSize: 13, color: '#484848', flexShrink: 1}}>เลขที่อ้างอิง #{item.ref}</Text>
//               <Text style={{fontFamily: 'Prompt-Medium', fontSize: 13, color: '#484848', flexShrink: 1}}>วันที่ {item.created_at}</Text>
//               <Text style={{fontFamily: 'Prompt-Medium', fontSize: 13, color: '#484848', flexShrink: 1}}>จำนวนเงิน {item.amount} บาท</Text>
//             </View>
//         </View>
//     )
//   };

//   listEmptyComponent = () => {
//     if(this.state.isFetching){
//       return (
//         <View style={{flex: 1, flexDirection: 'row', paddingLeft: 5, paddingRight: 5, backgroundColor: '#FFFFFF', width: '100%'}}>
//           <View style={{width: '100%', flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'center'}}>
//             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#535353'}}>กำลังโหลดข้อมูล...</Text>
//           </View>
//         </View>
//       );
//     }else{
//       return (
//         <View style={{flex: 1, flexDirection: 'row', paddingLeft: 5, paddingRight: 5, backgroundColor: '#FFFFFF', width: '100%'}}>
//           <View style={{width: '100%', flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'center'}}>
//             <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#535353'}}>ไม่พบแบบคำขอกู้ยืมเงิน...</Text>
//           </View>
//         </View>
//       );
//     }
//   }

//   btnClick = () => {
//       if(!this.state.isFetching && !this.state.disabledBtn){
//         this.props.navigation.navigate('LoanApplication')
//       }
//   }

//   render() {
//     return (
//       <ImageBackground source={{uri: 'background'}} style={{width: '100%', height: '100%'}}>
//       <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', elevation: 2}}>
//         <View style={{alignItems: 'center'}}>
//           <View style={{position:'relative', backgroundColor: '#FFFFFF', borderRadius: 15, width: '90%', overflow: 'hidden', shadowColor: "#000", shadowOffset: { width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 5, elevation: 3}}>
//             <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', padding: 20}}>
//                 <View style={{marginRight: 5}}>
//                 <Text style={{fontFamily: 'Prompt-Medium', fontSize: 18, color: '#BA1F68'}}>แบบคำขอกู้ยืมเงิน</Text>
//                 </View>
//             </View>
//             <FlatList
//             onRefresh={() => this.onRefresh()}
//             refreshing={this.state.isFetching}
//             style={{height: this.state.screenHeight-220, width: '100%'}}
//             data={this.state.ApplicationsData}
//             renderItem={this.renderListItem}
//             ListEmptyComponent={this.listEmptyComponent}
//             keyExtractor={(item, index) => item.ref.toString()}
//             onEndReachedThreshold = {0.1}
//             ListFooterComponent = {() => <View></View>}
//             ListFooterComponentStyle={{
//               marginBottom: 45
//             }}
//             />
//             <View style={{position: 'absolute', bottom: 0, backgroundColor: '#FFFFFF', width: '100%'}}>
//                 <TouchableOpacity disabled={this.state.disabledBtn} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10}} onPress = {() => this.btnClick()}>
//                     <View style={{backgroundColor: '#'+(this.state.disabledBtn ? 'CCCCCC' : 'BA1F68'), borderRadius: 15, paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}>
//                         <Text style={{fontFamily: 'Prompt-Medium', fontSize: 15, color: '#FFFFFF'}}>บันทึกแบบคำขอกู้ยืมเงิน</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//           </View>
//           <TouchableOpacity style={{position: 'absolute', top: -12, right: -12, elevation: 3}} onPress={()=>{this.props.navigation.goBack()}}>
//             <View style={{width: 48, height: 48, backgroundColor: '#BA1F68', borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}>
//               <Text style={{fontSize: 16, color: '#FFFFFF', fontFamily: 'Prompt-Medium'}}>ปิด</Text>
//             </View>
//           </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       </ImageBackground>
//     );
//   }
// }