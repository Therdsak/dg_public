// import React, { Component } from 'react';
// import {SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
// import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
// import Spinner from 'react-native-loading-spinner-overlay';
// import DocumentPicker from 'react-native-document-picker';
// import t from 'tcomb-form-native';
// import moment from 'moment';
// import 'moment/locale/th';
// var _ = require('lodash');

// const provinceList = {"1":"กรุงเทพมหานคร","2":"สมุทรปราการ","3":"นนทบุรี","4":"ปทุมธานี","5":"พระนครศรีอยุธยา","6":"อ่างทอง","7":"ลพบุรี","8":"สิงห์บุรี","9":"ชัยนาท","10":"สระบุรี","11":"ชลบุรี","12":"ระยอง","13":"จันทบุรี","14":"ตราด","15":"ฉะเชิงเทรา","16":"ปราจีนบุรี","17":"นครนายก","18":"สระแก้ว","19":"นครราชสีมา","20":"บุรีรัมย์","21":"สุรินทร์","22":"ศรีสะเกษ","23":"อุบลราชธานี","24":"ยโสธร","25":"ชัยภูมิ","26":"อำนาจเจริญ","27":"หนองบัวลำภู","28":"ขอนแก่น","29":"อุดรธานี","30":"เลย","31":"หนองคาย","32":"มหาสารคาม","33":"ร้อยเอ็ด","34":"กาฬสินธุ์","35":"สกลนคร","36":"นครพนม","37":"มุกดาหาร","38":"เชียงใหม่","39":"ลำพูน","40":"ลำปาง","41":"อุตรดิตถ์","42":"แพร่","43":"น่าน","44":"พะเยา","45":"เชียงราย","46":"แม่ฮ่องสอน","47":"นครสวรรค์","48":"อุทัยธานี","49":"กำแพงเพชร","50":"ตาก","51":"สุโขทัย","52":"พิษณุโลก","53":"พิจิตร","54":"เพชรบูรณ์","55":"ราชบุรี","56":"กาญจนบุรี","57":"สุพรรณบุรี","58":"นครปฐม","59":"สมุทรสาคร","60":"สมุทรสงคราม","61":"เพชรบุรี","62":"ประจวบคีรีขันธ์","63":"นครศรีธรรมราช","64":"กระบี่","65":"พังงา","66":"ภูเก็ต","67":"สุราษฎร์ธานี","68":"ระนอง","69":"ชุมพร","70":"สงขลา","71":"สตูล","72":"ตรัง","73":"พัทลุง","74":"ปัตตานี","75":"ยะลา","76":"นราธิวาส","77":"บึงกาฬ"};

// const attachments = [
//     'สำเนาบัตรประจำตัวคนพิการ',
//     'สำเนาบัตรประชาชนผู้กู้ยืม',
//     'สำเนาทะเบียนบ้านผู้กู้ยืม',
//     'สำเนาหนังสือสัญญาเช่าบ้าน (ในกรณีที่ผู้กู้เช่าบ้านอยู่)',
//     'รูปถ่ายผู้กู้ยืม',
//     'แผนที่อยู่อาศัย',
//     'แผนที่สถานที่ประกอบอาชีพ',
//     'สำเนาบัตรประชาชนผู้ค้ำประกัน',
//     'สำเนาทำเบียนบ้านผู้ค้ำประกัน',
//     'หนังสือรับรองเงินเดือนของผู้ค้ำประกัน (เว้นแต่เป็นเกษตรกร)',
//     'หนังสือรับรองว่าเป็นผู้อุปการะคนพิการ (ในกรณีเป็นผู้ดูแลคนพิการ)',
//     'ประมาณค่าใช้จ่ายในการประกอบอาชีพที่ขอกู้',
//     'ใบรับรองแพทย์ (ในกรณีคนพิการมีสภาพความพิการร้ายแรงและผู้ดูแลคนพิการเป็นผู้ขอกู้แทนคนพิการ)',
//     'หนังสือยินยอมคู่สมรส',
// ];

// const getDistrictApi = "https://pwd-digitalcard.com/api/districts/";
// const getSubdistrictApi = "https://pwd-digitalcard.com/api/subdistricts/";
// const uploadApi = "https://pwd-digitalcard.com/api/application/v1/";

// const Form = t.form.Form;

// const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
// stylesheet.textbox.normal.borderWidth = 0;
// stylesheet.textbox.error.borderWidth = 0;
// stylesheet.textbox.normal.marginBottom = 0;
// stylesheet.textbox.error.marginBottom = 0;
// stylesheet.textbox.notEditable.borderWidth = 0;
// stylesheet.pickerContainer.normal.borderWidth = 0;
// stylesheet.pickerContainer.error.borderWidth = 0;

// stylesheet.formGroup.normal.borderWidth = 0;
// stylesheet.formGroup.error.borderWidth = 0;
// stylesheet.formGroup.normal.borderRadius = 0;
// stylesheet.formGroup.error.borderRadius = 0;
// stylesheet.formGroup.normal.borderBottomWidth = 1;
// stylesheet.formGroup.error.borderBottomWidth = 1;
// stylesheet.formGroup.normal.marginBottom = 5;
// stylesheet.formGroup.error.marginBottom = 5;
// stylesheet.controlLabel.normal.marginTop = 10;
// stylesheet.controlLabel.error.marginTop = 10;
// stylesheet.pickerContainer.normal.marginBottom = 5;
// stylesheet.pickerContainer.error.marginBottom = 5;

// stylesheet.controlLabel.error.fontFamily = 'Prompt-Medium';
// stylesheet.controlLabel.normal.fontFamily = 'Prompt-Medium';
// stylesheet.controlLabel.normal.fontSize = 16;
// stylesheet.controlLabel.normal.color = '#484848';
// stylesheet.formGroup.normal.borderColor = '#484848'
// stylesheet.formGroup.normal.marginLeft = 15;
// stylesheet.formGroup.normal.marginRight = 15;
// stylesheet.formGroup.error.marginLeft = 15;
// stylesheet.formGroup.error.marginRight = 15;
// stylesheet.textbox.normal.color = '#484848';
// stylesheet.textboxView.normal.color = '#484848';
// stylesheet.select.normal.color = '#484848';;
// stylesheet.textboxView.notEditable.color = '#484848';
// stylesheet.pickerContainer.normal.color = '#484848';;

// stylesheet.controlLabel.error.color = '#B91E67';
// stylesheet.formGroup.error.borderColor = '#B91E67'
// stylesheet.textbox.error.color = '#B91E67';
// stylesheet.textboxView.error.color = '#B91E67';
// stylesheet.select.error.color = '#B91E67';
// stylesheet.pickerContainer.error.color = '#B91E67';

// export default class LoanApplication extends Component {

//     constructor(props) {
//       super(props);
//       this.state = {
//         posted : false,
//         spinner: false, 
//         saveApplicationId: null,
//         step1Error: false, 
//         step2Error: false, 
//         step3Error: false, 
//         step4Error: false, 
//         step1SameAddress: false,
//         Step1AddressOption: {
//             district: {},
//             subdistrict: {},
//             districtGov: {},
//             subdistrictGov: {},
//         },
//         step2SameAddress: false,
//         Step2AddressOption: {
//             district: {},
//             subdistrict: {},
//         },
//         step3SameAddress: false,
//         Step3AddressOption: {
//             district: {},
//             subdistrict: {},
//         },
//         fileObj: {},
//         tempZipcode : {},
//       };
//     }
    
    
//     async SingleFilePicker(key) {
//         try {
//           const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.allFiles],
//           });
//           const allowType = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png', 'application/pdf', 'com.adobe.pdf'];
//           if(allowType.includes(res.type)){
//             let fileObj = this.state.fileObj;
//             fileObj[key] = res;
//             this.setState({fileObj});
//           }else{
//               Alert.alert('รูปแบบไฟล์แนบไม่รองรับ');
//           }
    
//         } catch (err) {
//           if (DocumentPicker.isCancel(err)) {
//             console.log('Canceled');
//           } else {
//             console.log('Unknown Error: ' + JSON.stringify(err));
//             throw err;
//           }
//         }
//       }

//       dateFormat = (str) => {
//         if(str!=null){
//           let dateArr = str.split('-');
//           let dateStatus = false;
//           let dateText = '';
//           if(parseInt(dateArr[2])){
//             dateStatus = true;
//             dateText += (parseInt(dateArr[2])-543)+'-';
//           }
//           if(parseInt(dateArr[1])){
//             dateStatus = true;
//             dateText += parseInt(dateArr[1])+'-';
//           }
//           if(parseInt(dateArr[0])){
//             dateStatus = true;
//             dateText += parseInt(dateArr[0]);
//           }
          
//           return  dateStatus ? dateText : '0000-00-00';
//         }
//       };

//     _onChangeForm1(value) {
//         this.setState({
//             step1Value: value,
//             step1SameAddress: value.sameAddress,
//         }, () => {

//             if(value.province>0){
//                 fetch(getDistrictApi+value.province)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     this.setState({
//                         Step1AddressOption: {
//                             ...this.state.Step1AddressOption,
//                             district: json
//                         },
//                     });
//                 })
//             }
    
//             if(value.district>0){
//                 fetch(getSubdistrictApi+value.district)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     this.setState({
//                         Step1AddressOption: {
//                             ...this.state.Step1AddressOption,
//                             subdistrict: json.subdistrict,
//                         },
//                         tempZipcode: json.zipcode,
//                     });
//                 })
//             }
    
//             if(value.subdistrict>0){
//                 this.setState({
//                     step1Value: {
//                         ...value,
//                         zipcode: this.state.tempZipcode[value.subdistrict]
//                     }
//                 });
//             }
    
//             if(value.provinceGov>0){
//                 fetch(getDistrictApi+value.provinceGov)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     this.setState({
//                         Step1AddressOption: {
//                             ...this.state.Step1AddressOption,
//                             districtGov: json,
//                         },
//                     });
//                 })
//             }
    
//             if(value.districtGov>0){
//                 fetch(getSubdistrictApi+value.districtGov)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     this.setState({
//                         Step1AddressOption: {
//                             ...this.state.Step1AddressOption,
//                             subdistrictGov: json.subdistrict,
//                         },
//                         tempZipcode: json.zipcode,
//                     });
//                 })
//             }
    
//             if(value.subdistrictGov>0){
//                 this.setState({
//                     step1Value: {
//                         ...value,
//                         zipcodeGov: this.state.tempZipcode[value.subdistrictGov]
//                     }
//                 });
//             }

//             if(this.state.step1Error){
//                 this._onCheckForm1();
//             }
//         });
//     }

//     _onCheckForm1() {
//         let value = this.refs.form1.getValue();
//         if(value){
//             this.setState({ step1Error: false });
//         }else{
//             this.setState({ step1Error: true });
//         }
//     }

//     _onChangeForm2(value) {
//         this.setState({
//             step2Value: value,
//             step2SameAddress: value.sameAddress,
//          }, () => {

//             if(value.province>0){
//                 fetch(getDistrictApi+value.province)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     this.setState({
//                         Step2AddressOption: {
//                             ...this.state.Step2AddressOption,
//                             district: json
//                         },
//                     });
//                 })
//             }
    
//             if(value.district>0){
//                 fetch(getSubdistrictApi+value.district)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     this.setState({
//                         Step2AddressOption: {
//                             ...this.state.Step2AddressOption,
//                             subdistrict: json.subdistrict,
//                         },
//                         tempZipcode: json.zipcode,
//                     });
//                 })
//             }
    
//             if(value.subdistrict>0){
//                 this.setState({
//                     step2Value: {
//                         ...value,
//                         zipcode: this.state.tempZipcode[value.subdistrict]
//                     }
//                 });
//             }
            
//             if(this.state.step2Error){
//                 this._onCheckForm2();
//             }
//         });
//     }

//     _onCheckForm2() {
//         let value = this.refs.form2.getValue();
//         if(value){
//             this.setState({ step2Error: false });
//         }else{
//             this.setState({ step2Error: true });
//         }
//     }

//     _onChangeForm3(value) {
//         this.setState({
//             step3Value: value,
//             step3SameAddress: value.sameAddress,
//          }, () => {

//             if(value.province>0){
//                 fetch(getDistrictApi+value.province)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     this.setState({
//                         Step3AddressOption: {
//                             ...this.state.Step3AddressOption,
//                             district: json
//                         },
//                     });
//                 })
//             }
    
//             if(value.district>0){
//                 fetch(getSubdistrictApi+value.district)
//                 .then((response) => response.json())
//                 .then((json) => {
//                     this.setState({
//                         Step3AddressOption: {
//                             ...this.state.Step3AddressOption,
//                             subdistrict: json.subdistrict,
//                         },
//                         tempZipcode: json.zipcode,
//                     });
//                 })
//             }
    
//             if(value.subdistrict>0){
//                 this.setState({
//                     step3Value: {
//                         ...value,
//                         zipcode: this.state.tempZipcode[value.subdistrict]
//                     }
//                 });
//             }
            
//             if(this.state.step3Error){
//                 this._onCheckForm3();
//             }
//         });
//     }

//     _onCheckForm3() {
//         let value = this.refs.form3.getValue();
//         if(value){
//             this.setState({ step3Error: false });
//         }else{
//             this.setState({ step3Error: true });
//         }
//     }

//     _onChangeForm4(value) {
//         this.setState({step4Value: value });
//         if(this.state.step4Error){
//             this._onCheckForm4();
//         }
//     }

//     _onCheckForm4() {
//         let value = this.refs.form4.getValue();
//         if(value){
//             this.setState({ step4Error: false });
//         }else{
//             this.setState({ step4Error: true });
//         }
//     }

//     _onSubmit() {
//         this.doSpinner(true);
//         let data = new FormData();
//         data.append('id_card',cardDetail.NID);
//         data.append('dob', this.dateFormat(cardDetail.BIRTH_DATE));
//         data.append('step1Value', JSON.stringify(this.state.step1Value));
//         data.append('step2Value', JSON.stringify(this.state.step2Value));
//         data.append('step3Value', JSON.stringify(this.state.step3Value));
//         data.append('step4Value', JSON.stringify(this.state.step4Value));
//         attachments.map((item, key) =>{
//             if(typeof this.state.fileObj[key]!='undefined'){
//                 let url =  this.state.fileObj[key].uri;
//                 data.append('fileObj['+key+']', {
//                     name: this.state.fileObj[key].name,
//                     type: this.state.fileObj[key].type,
//                     uri: Platform.OS === "android" ? url : url.replace("file://", ""),
//                 });
//             }
//         });

//         fetch(uploadApi, {
//             method: 'POST',
//             body: data,
//         }).then((response) => response.json())
//         .then((responseData) => {
//             this.setState({
//                 saveApplicationId: responseData.id
//             }, () => {
//                 this.setState({ 
//                     posted: true,
//                     step1Value: null,
//                     step2Value: null,
//                     step3Value: null,
//                     step4Value: null,
//                     step1Error: false,
//                     step2Error: false,
//                     step3Error: false,
//                     step4Error: false,
//                 });
//                 this.doSpinner(false);
//             });
//         }).catch((error) => {
//             this.doSpinner(false);
//             Alert.alert('มีบางอย่างผิดพลาด. กรุณาลองใหม่อีกครั้ง..');
//             console.error(error);
//         });
//     }


//     doSpinner = (status) =>{
//         this.setState({
//           spinner: status
//         });
//     }

//     render() {

//         const step1Fields = t.struct({
//             type: t.maybe(t.enums({
//                 '1': 'คนพิการ',
//                 '2': 'ผู้ดูแล',
//             })),
//             id: t.Number,
//             issueBy: t.maybe(t.String),
//             issueDate: t.maybe(t.Date),
//             expireDate: t.maybe(t.Date),
//             preName: t.maybe(t.enums({
//                 '1': 'นาย',
//                 '2': 'นาง',
//                 '3': 'นางสาว',
//                 '4': 'อื่นๆ',
//             })),
//             name: t.String,
//             lastname: t.String,
//             dob: t.maybe(t.Date),
//             address: t.maybe(t.String),
//             moo: t.maybe(t.String),
//             soi: t.maybe(t.String),
//             road: t.maybe(t.String),
//             province: t.maybe(t.enums(provinceList)),
//             district: t.maybe(t.enums(this.state.Step1AddressOption.district)),
//             subdistrict: t.maybe(t.enums(this.state.Step1AddressOption.subdistrict)),
//             zipcode: t.maybe(t.Number),
//             nearBy: t.maybe(t.String),
//             stayed: t.maybe(t.enums({
//                 '1': 'น้อยกว่า 1 ปี',
//                 '2': '1 ปี',
//                 '3': '2 ปี',
//                 '4': '3 ปี',
//                 '5': '4 ปี',
//                 '6': '5 ปี',
//                 '7': '6 ปี',
//                 '8': '7 ปี',
//                 '9': '8 ปี',
//                 '10': '9 ปี',
//                 '11': '10 ปี',
//                 '12': 'มากกว่า 10 ปี',
//             })),
//             sameAddress: t.maybe(t.Boolean),
//             addressGov: t.maybe(t.String),
//             mooGov: t.maybe(t.String),
//             soiGov: t.maybe(t.String),
//             roadGov: t.maybe(t.String),
//             provinceGov: t.maybe(t.enums(provinceList)),
//             districtGov: t.maybe(t.enums(this.state.Step1AddressOption.districtGov)),
//             subdistrictGov: t.maybe(t.enums(this.state.Step1AddressOption.subdistrictGov)),
//             zipcodeGov: t.maybe(t.Number),
//             phone: t.maybe(t.String),
//             occupation: t.maybe(t.String),
//             salary: t.maybe(t.String),
//             status: t.maybe(t.enums({
//                 '1': 'สถานะภาพผู้กู้',
//             })),
//         });
//         const step1Options = {
//             stylesheet: stylesheet,
//             i18n: {
//                 optional: ' (ไม่จำเป็น)',
//                 required: '',
//                 add: 'เพิ่ม',
//                 remove: '✘',
//                 up: '↑',
//                 down: '↓',
//                 dash: "กรุณาเลือก"
//             },
//             fields: {
//                 type: {
//                     label: 'ประเภท',
//                 },
//                 id: {
//                     label: 'หมายเลขบัตรประชาชน',
//                 },
//                 issueBy: {
//                     label: 'ออกโดย',
//                 },
//                 issueDate: {
//                     label: 'วันที่ออกบัตร',
//                     mode: 'date',
//                     config: {
//                         defaultValueText: ' ',
//                         format: (date) => {
//                         return moment(date).format('DD/MM/YYYY');
//                         },
//                     }
//                 },
//                 expireDate: {
//                     label: 'บัตรหมดอายุ',
//                     mode: 'date',
//                     config: {
//                         defaultValueText: ' ',
//                         format: (date) => {
//                         return moment(date).format('DD/MM/YYYY');
//                         },
//                     }
//                 },
//                 preName: {
//                     label: 'คำนำหน้า',
//                 },
//                 name: {
//                     label: 'ชื่อ',
//                 },
//                 lastname: {
//                     label: 'นามสกุล',
//                 },
//                 dob: {
//                     label: 'วันเดือนปีเกิด',
//                     mode: 'date',
//                     config: {
//                         defaultValueText: ' ',
//                         format: (date) => {
//                         return moment(date).format('DD/MM/YYYY');
//                         },
//                     }
//                 },
//                 address: {
//                     label: 'ที่อยู่ปัจจุบัน',
//                 },
//                 moo: {
//                     label: 'หมู่',
//                 },
//                 soi: {
//                     label: 'ซอย',
//                 },
//                 road: {
//                     label: 'ถนน',
//                 },
//                 province: {
//                     label: 'จังหวัด',
//                 },
//                 district: {
//                     label: 'อำเภอ/เขต',
//                 },
//                 subdistrict: {
//                     label: 'ตำบล/แขวง',
//                 },
//                 zipcode: {
//                     label: 'รหัสไปรษณีย์',
//                     editable: false,
//                 },
//                 nearBy: {
//                     label: 'สถานที่ใกล้เคียง',
//                 },
//                 stayed: {
//                     label: 'อาศัยมาแล้วเป็นเวลา',
//                 },
//                 sameAddress: {
//                     label: 'ใช้ที่อยู่ปัจจุบัน',
//                 },
//                 addressGov: {
//                     label: 'ที่อยู่ตามทะเบียนบ้าน',
//                     hidden: this.state.step1SameAddress,
//                 },
//                 mooGov: {
//                     label: 'หมู่',
//                     hidden: this.state.step1SameAddress,
//                 },
//                 soiGov: {
//                     label: 'ซอย',
//                     hidden: this.state.step1SameAddress,
//                 },
//                 roadGov: {
//                     label: 'ถนน',
//                     hidden: this.state.step1SameAddress,
//                 },
//                 provinceGov: {
//                     label: 'จังหวัด',
//                     hidden: this.state.step1SameAddress,
//                 },
//                 districtGov: {
//                     label: 'อำเภอ/เขต',
//                     hidden: this.state.step1SameAddress,
//                 },
//                 subdistrictGov: {
//                     label: 'ตำบล/แขวง',
//                     hidden: this.state.step1SameAddress,
//                 },
//                 zipcodeGov: {
//                     label: 'รหัสไปรษณีย์',
//                     hidden: this.state.step1SameAddress,
//                     editable: false,
//                 },
//                 phone: {
//                     label: 'โทรศัพท์',
//                 },
//                 occupation: {
//                     label: 'อาชีพปัจจุบัน',
//                 },
//                 salary: {
//                     label: 'รายได้/เดือน',
//                 },
//                 status: {
//                     label: 'สถานะภาพผู้กู้',
//                 },
//             }
//         }; 

//         const step2Fields = t.struct({
//             preName: t.maybe(t.enums({
//             '1': 'นาย',
//             '2': 'นาง',
//             '3': 'นางสาว',
//             '4': 'อื่นๆ',
//             })),
//             name: t.maybe(t.String),
//             lastname: t.maybe(t.String),
//             register: t.maybe(t.String),
//             type: t.maybe(t.enums({
//             '1': 'ประเภทความพิการ',
//             })),
//             status: t.maybe(t.enums({
//             '1': 'สถานะคนพิการ',
//             })),
//             religion: t.maybe(t.enums({
//             '1': 'ศาสนา',
//             })),
//             sameAddress: t.maybe(t.Boolean),
//             address: t.maybe(t.String),
//             moo: t.maybe(t.String),
//             soi: t.maybe(t.String),
//             road: t.maybe(t.String),
//             province: t.maybe(t.enums(provinceList)),
//             district: t.maybe(t.enums(this.state.Step1AddressOption.district)),
//             subdistrict: t.maybe(t.enums(this.state.Step1AddressOption.subdistrict)),
//             zipcode: t.maybe(t.Number),
//         });
//         const step2Options = {
//         stylesheet: stylesheet,
//         i18n: {
//             optional: ' (ไม่จำเป็น)',
//             required: '',
//             add: 'เพิ่ม',
//             remove: '✘',
//             up: '↑',
//             down: '↓',
//             dash: "กรุณาเลือก"
//         },
//         fields: {
//             preName: {
//                 label: 'คำนำหน้า',
//             },
//             name: {
//                 label: 'ชื่อ',
//             },
//             lastname: {
//                 label: 'นามสกุล',
//             },
//             register: {
//                 label: 'จดทะเบียน',
//             },
//             type: {
//                 label: 'ประเภทความพิการ',
//             },
//             status: {
//                 label: 'สถานะคนพิการ',
//             },
//             religion: {
//                 label: 'ศาสนา',
//             },
//             sameAddress: {
//                 label: 'ใช้ที่อยู่เดียวกับผู้กู้',
//             },
//             address: {
//                 label: 'ซึ่งอยู่บ้านเลขที่',
//                 hidden: this.state.step2SameAddress,
//             },
//             moo: {
//                 label: 'หมู่',
//                 hidden: this.state.step2SameAddress,
//             },
//             soi: {
//                 label: 'ซอย',
//                 hidden: this.state.step2SameAddress,
//             },
//             road: {
//                 label: 'ถนน',
//                 hidden: this.state.step2SameAddress,
//             },
//             province: {
//                 label: 'จังหวัด',
//                 hidden: this.state.step2SameAddress,
//             },
//             district: {
//                 label: 'อำเภอ/เขต',
//                 hidden: this.state.step2SameAddress,
//             },
//             subdistrict: {
//                 label: 'ตำบล/แขวง',
//                 hidden: this.state.step2SameAddress,
//             },
//             zipcode: {
//                 label: 'รหัสไปรษณีย์',
//                 hidden: this.state.step2SameAddress,
//                 editable: false,
//             },
//         }
//         }; 

//         const step3Fields = t.struct({
//             money: t.maybe(t.Number),
//             purpose: t.maybe(t.enums({
//             '1': 'ขยายกิจการ',
//             '2': 'เริ่มต้นประกอบอาชีพ',
//             '3': 'อื่นๆ',
//             })),
//             type: t.maybe(t.enums({
//             '1': 'ประเภทอาชีพ',
//             })),
//             name: t.maybe(t.String),
//             age: t.maybe(t.Number),
//             sameAddress: t.maybe(t.Boolean),
//             address: t.maybe(t.String),
//             moo: t.maybe(t.String),
//             soi: t.maybe(t.String),
//             road: t.maybe(t.String),
//             province: t.maybe(t.enums(provinceList)),
//             district: t.maybe(t.enums(this.state.Step1AddressOption.district)),
//             subdistrict: t.maybe(t.enums(this.state.Step1AddressOption.subdistrict)),
//             zipcode: t.maybe(t.Number),
//             phone: t.maybe(t.String),
//             relationship: t.maybe(t.enums({
//             '1': 'ความสัมพันธ์กับผู้กู้',
//             })),
//         });
//         const step3Options = {
//         stylesheet: stylesheet,
//         i18n: {
//             optional: ' (ไม่จำเป็น)',
//             required: '',
//             add: 'เพิ่ม',
//             remove: '✘',
//             up: '↑',
//             down: '↓',
//             dash: "กรุณาเลือก"
//         },
//         fields: {
//             money: {
//                 label: 'ยอดเงิน',
//             },
//             purpose: {
//                 label: 'วัตถุประสงค์',
//             },
//             type: {
//                 label: 'ประเภทอาชีพ',
//             },
//             name: {
//                 label: 'ผู้ค้ำประกัน กู้ฉุกเฉินไม่มีผู้ค้ำประกัน',
//             },
//             age: {
//                 label: 'อายุ (ปี)',
//             },
//             sameAddress: {
//                 label: 'ใช้ที่อยู่เดียวกับผู้กู้',
//             },
//             address: {
//                 label: 'ซึ่งอยู่บ้านเลขที่',
//                 hidden: this.state.step3SameAddress,
//             },
//             moo: {
//                 label: 'หมู่',
//                 hidden: this.state.step3SameAddress,
//             },
//             soi: {
//                 label: 'ซอย',
//                 hidden: this.state.step3SameAddress,
//             },
//             road: {
//                 label: 'ถนน',
//                 hidden: this.state.step3SameAddress,
//             },
//             province: {
//                 label: 'จังหวัด',
//                 hidden: this.state.step3SameAddress,
//             },
//             district: {
//                 label: 'อำเภอ/เขต',
//                 hidden: this.state.step3SameAddress,
//             },
//             subdistrict: {
//                 label: 'ตำบล/แขวง',
//                 hidden: this.state.step3SameAddress,
//             },
//             zipcode: {
//                 label: 'รหัสไปรษณีย์',
//                 hidden: this.state.step3SameAddress,
//                 editable: false,
//             },
//             phone: {
//                 label: 'โทรศัพท์',
//             },
//             relationship: {
//                 label: 'ความสัมพันธ์กับผู้กู้',
//             },
//         }
//         }; 

//         const step4Fields = t.struct({
//             loan: t.maybe(t.Number),
//             months: t.maybe(t.Number),
//             cost: t.maybe(t.String),
//             ps: t.maybe(t.String),
//         });
//         const step4Options = {
//         stylesheet: stylesheet,
//         i18n: {
//             optional: ' (ไม่จำเป็น)',
//             required: '',
//             add: 'เพิ่ม',
//             remove: '✘',
//             up: '↑',
//             down: '↓',
//             dash: "กรุณาเลือก"
//         },
//         fields: {
//             loan: {
//                 label: 'ผ่อนชำระเดือนละ (บาท)',
//             },
//             months: {
//                 label: 'จำนวนเดือน',
//             },
//             cost: {
//                 label: 'รายละเอียดประมาณค่าใช้จ่าย',
//                 multiline: true,
//                 stylesheet: {
//                     ...Form.stylesheet,
//                     controlLabel: {
//                       normal: {
//                         marginTop: 10,
//                         marginLeft: 15,
//                         marginRight: 15,
//                         fontFamily: 'Prompt-Medium',
//                         fontSize: 16,
//                         color: '#484848',
//                       },
//                       error: {
//                         marginTop: 10,
//                         marginLeft: 15,
//                         marginRight: 15,
//                         fontFamily: 'Prompt-Medium',
//                         fontSize: 16,
//                         color: '#B91E67',
//                       }
//                     },
//                     textbox: {
//                         ...Form.stylesheet.textbox,
//                         normal: {
//                             ...Form.stylesheet.textbox.normal,
//                             height: 60,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             borderColor: '#484848',
//                             borderWidth: 0,
//                             borderBottomWidth: 1,
//                         },
//                         error: {
//                             ...Form.stylesheet.textbox.error,
//                             height: 60,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             borderColor: '#B91E67',
//                             borderWidth: 0,
//                             borderBottomWidth: 1,
//                         }
//                     }
//                 },
//             },
//             ps: {
//                 label: 'หมายเหตุ',
//                 multiline: true,
//                 stylesheet: {
//                     ...Form.stylesheet,
//                     controlLabel: {
//                       normal: {
//                         marginTop: 10,
//                         marginLeft: 15,
//                         marginRight: 15,
//                         fontFamily: 'Prompt-Medium',
//                         fontSize: 16,
//                         color: '#484848',
//                       },
//                       error: {
//                         marginTop: 10,
//                         marginLeft: 15,
//                         marginRight: 15,
//                         fontFamily: 'Prompt-Medium',
//                         fontSize: 16,
//                         color: '#B91E67',
//                       }
//                     },
//                     textbox: {
//                         ...Form.stylesheet.textbox,
//                         normal: {
//                             ...Form.stylesheet.textbox.normal,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             height: 60,
//                             borderColor: '#484848',
//                             borderWidth: 0,
//                             borderBottomWidth: 1,
//                         },
//                         error: {
//                             ...Form.stylesheet.textbox.error,
//                             height: 60,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             borderColor: '#B91E67',
//                             borderWidth: 0,
//                             borderBottomWidth: 1,
//                         }
//                     }
//                 },
//             },
//         }
//         }; 

//         const styles = StyleSheet.create({
//             label: {
//                 fontFamily: 'Prompt-Medium',
//                 fontSize: 16,
//                 color: '#484848',
//                 marginTop: 10,
//             },
//             buttonUpload: {
//                 paddingTop: 5,
//                 paddingBottom: 5,
//                 borderBottomWidth: 1,
//                 borderColor: '#484848',
//             },
//             buttonUploadText: {
//                 fontSize: 16,
//                 color: '#484848',
//                 padding: 15,
//             },
//             buttonTextStyle: {
//                 fontFamily: 'Prompt-Medium',
//                 fontSize: 18,
//                 color: '#CE207F',
//             },
//         })
//         if(this.state.posted==false){
//             return (
//                 <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
//                     <Spinner
//                     visible={this.state.spinner}
//                     textStyle={{fontSize: 14, color: '#FFFFFF', fontFamily: 'Prompt-Medium'}}
//                     />
//                     <ProgressSteps labelFontSize={0} activeLabelFontSize={14} marginBottom={45} marginLeft={15} marginRight={55} labelFontFamily={'Prompt-Medium'} activeLabelColor={'#B91E67'} activeStepIconBorderColor={'#B91E67'} activeStepNumColor={'#484848'}>
//                         <ProgressStep label="ผู้กู้" onNext={this._onCheckForm1.bind(this)} errors={this.state.step1Error} nextBtnDisabled={this.state.step1Error} nextBtnText={'ถัดไป'} previousBtnText={'ก่อนหน้า'} nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}>
//                             <Form ref="form1" type={step1Fields} options={step1Options} value={this.state.step1Value} onChange={this._onChangeForm1.bind(this)} />
//                         </ProgressStep>
//                         <ProgressStep label="คนพิการ" onNext={this._onCheckForm2.bind(this)} errors={this.state.step2Error} nextBtnDisabled={this.state.step2Error} nextBtnText={'ถัดไป'} previousBtnText={'ก่อนหน้า'} nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}>
//                             <Form ref="form2" type={step2Fields} options={step2Options} value={this.state.step2Value} onChange={this._onChangeForm2.bind(this)} />
//                         </ProgressStep>
//                         <ProgressStep label="การกู้เงิน" onNext={this._onCheckForm3.bind(this)} errors={this.state.step3Error} nextBtnDisabled={this.state.step3Error} nextBtnText={'ถัดไป'} previousBtnText={'ก่อนหน้า'} nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}>
//                             <Form ref="form3" type={step3Fields} options={step3Options} value={this.state.step3Value} onChange={this._onChangeForm3.bind(this)} />
//                         </ProgressStep>
//                         <ProgressStep label="การชำระคืนเงินกู้" onNext={this._onCheckForm4.bind(this)} errors={this.state.step4Error} nextBtnDisabled={this.state.step4Error} nextBtnText={'ถัดไป'} previousBtnText={'ก่อนหน้า'} nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}>
//                             <Form ref="form4" type={step4Fields} options={step4Options} value={this.state.step4Value} onChange={this._onChangeForm4.bind(this)} />
//                         </ProgressStep>
//                         <ProgressStep label="เอกสารแนบ" finishBtnText={'บันทึกคำขอกู้ยืม'} onSubmit={this._onSubmit.bind(this)} previousBtnText={'ก่อนหน้า'} nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}>
//                             {attachments.map((item, key) =>
//                             <View style={{marginLeft: 15, marginRight: 15,}} key={key}>
//                                 <Text style={styles.label}>{item}</Text>
//                                 <TouchableOpacity
//                                 activeOpacity={0.5}
//                                 style={styles.buttonUpload}
//                                 onPress={this.SingleFilePicker.bind(this, key)}>
//                                     <Text style={styles.buttonUploadText}>
//                                         {typeof this.state.fileObj[key]!='undefined' ? this.state.fileObj[key].name : 'กรุณาเลือกไฟล์'}
//                                     </Text>
//                                 </TouchableOpacity>
//                             </View>
//                             )}
//                         </ProgressStep>
//                     </ProgressSteps>
//                 </SafeAreaView>
//             );
//         }else{
//             return (
//                 <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA', paddingLeft: 15, paddingRight: 15}}>
//                     <Text style={{color: '#B91E67', fontSize: 20, fontFamily: 'Prompt-Medium', marginBottom: 10,  textAlign: "center"}}>บันทึกแบบคำขอกู้เงินสำเร็จ</Text>
//                     <Text style={{color: '#484848', fontSize: 16, fontFamily: 'Prompt-Medium', marginBottom: 10,  textAlign: "center"}}>#{this.state.saveApplicationId}</Text>
//                     <View style={{marginTop: 15, width: '100%'}}>
//                         <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress = {() => this.props.navigation.navigate('Loan')}>
//                             <View style={{backgroundColor: '#BA1F68', borderRadius: 15, paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}>
//                                 <Text style={{fontFamily: 'Prompt-Medium', fontSize: 15, color: '#FFFFFF'}}>ย้อนกลับ</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </SafeAreaView>
//             );
//         }
//   }
// }
