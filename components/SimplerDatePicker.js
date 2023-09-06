// import React from 'react';
// import PropTypes from 'prop-types';
// import {Alert, Platform, View, StyleSheet, Text} from 'react-native';
// import Moment from 'moment';
// import {Dropdown} from 'react-native-element-dropdown';
// // import { Picker } from '@react-native-picker/picker';

// const styles = StyleSheet.create({
//   containerStyle: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   yearStyle: {
//     flex : 1,
//     marginRight: 5,
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     fontFamily: 'Prompt-Medium',
//   },
//   monthStyle: {
//     flex: 1,
//     marginRight: 5,
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     fontFamily: 'Prompt-Medium',
//   },
//   dayStyle: {
//     flex: 1,
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     fontFamily: 'Prompt-Medium',
//   },
//   textStyle: {
//     fontSize: 16,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     fontFamily: 'Prompt-Medium',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     fontFamily: 'Prompt-Medium',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//     fontFamily: 'Prompt-Medium',
//     color: 'black',
//   },
// });

// const pad = (n, z) => (Array(z).join('0') + n).slice(-z);

// class SimplerDatePicker extends React.Component {
//   static getYearData = (minDate = Moment(), maxDate = Moment()) => {
//     const min = Number.parseInt(minDate.format('YYYY'));
//     const max = Number.parseInt(maxDate.format('YYYY'));
//     var list = [];
//     list.push({label: min.toString(), value: min.toString()});
//     for (let i = min + 1; i < max; i++) {
//       var data = {
//         label: i.toString(),
//         value: i.toString(),
//       };
//       list.push(data);
//     }
//     list.push({label: max.toString(), value: max.toString()});
//     return list;
//   };
//   static getMonthData = (minDate = Moment(), maxDate = Moment()) => {
//     var list = [];
//     // for (const element of )
//     for (const element of Moment.months()){
//       list.push({label: element, value: element});
//     }
//     return list;
//   };
//   static getDayData = (
//     minDate = Moment(),
//     maxDate = Moment(),
//     year,
//     yearData,
//     month,
//   ) => {
    
//     if (year < 0 || month < 0) {
//       return [];
//     }
//     const date = Moment(`${yearData[year._index].label}/${pad(month._index + 1, 2)}/01`,"YYYY/MM/DD");
//     const daysInMonth = year._index >= 0 && month._index >= 0 ? date.daysInMonth() : 0;
//     var list = [];
//     for (let i = 0 + 1; i <= daysInMonth; i++) {
//       var data = {
//         label: i.toString(),
//         value: i.toString(),
//       };
//       list.push(data);
//     }
//     return list;
//   };
//   static isMonthValid = (minDate, maxDate, yearData, year, month) => {
//     if (year < 0 || month < 0) {
//       return false;
//     }
//     const monthData = SimplerDatePicker.getMonthData(minDate, maxDate);
//     const dayData = SimplerDatePicker.getDayData(
//       minDate,
//       maxDate,
//       year,
//       yearData,
//       month,
//     );
//     return dayData.reduce(
//       (res, day, i) =>
//         res ||
//         SimplerDatePicker.isDayValid(
//           minDate,
//           maxDate,
//           yearData,
//           year,
//           monthData,
//           month,
//           i,
//         ),
//       false,
//     );
//   };
//   static isDayValid = (
//     minDate,
//     maxDate,
//     yearData,
//     year,
//     monthData,
//     month,
//     day,
//   ) => {
//     console.log('1234 : ' , month)
//     if (year < 0 || month._index < 0 || day < 0) {
//       return false;
//     }
//     return SimplerDatePicker.isWithinBounds(
//       minDate,
//       maxDate,
//       Moment(
//         `${yearData[year]}/${pad(month._index + 1, 2)}/${pad(day + 1, 2)}`,
//         'YYYY/MM/DD',
//       ),
//     );
//   };
//   static isWithinBounds = (minDate, maxDate, moment) => {
//     const min = Moment(minDate).subtract(1, 'days');
//     const max = Moment(maxDate).add(1, 'days');
//     return moment.isBetween(
//       minDate,
//       maxDate,
//       //min,
//       //max,
//       null,
//       '[]',
//     );
//   };
//   // static getPickerItems = (prompt = 'Select Item', items = [], shouldHide = (() => false), pickerProps = {}) => {
//   //   return [
//   //     <Picker.Item
//   //       {...pickerProps}
//   //       value={null}
//   //       label={prompt}
//   //     />,
//   //     items
//   //       .map(
//   //         (e, i) => (!shouldHide(e, i)) && (
//   //           <Picker.Item
//   //             {...pickerProps}
//   //             key={e}
//   //             label={`${e}`}
//   //             value={i}
//   //           />
//   //         )
//   //       ),
//   //   ]
//   //     .filter(e => !!e);
//   // };
//   static extractStateFromMoment(moment, minDate, maxDate) {
//     if (!moment) {
//       return {
//         year: -1,
//         month: -1,
//         day: -1,
//       };
//     }
//     const yearData = SimplerDatePicker.getYearData(minDate, maxDate);
//     const year = yearData.indexOf(moment.format('YYYY'));
//     if (year < 0) {
//       return {
//         year: -1,
//         month: -1,
//         day: -1,
//       };
//     }
//     const monthData = SimplerDatePicker.getMonthData(minDate, maxDate);
//     const month = monthData.indexOf(moment.format('MMMM'));
//     if (month < 0) {
//       return {
//         year,
//         month: -1,
//         day: -1,
//       };
//     }
//     const dayData = SimplerDatePicker.getDayData(
//       minDate,
//       maxDate,
//       year,
//       yearData,
//       month,
//     );
//     const day = dayData.indexOf(Number.parseInt(moment.format('D')));
//     return {
//       year,
//       month,
//       day,
//     };
//   }
//   static getMomentFromState = (minDate, maxDate, year, month, day) => {
//     const yearData = SimplerDatePicker.getYearData(minDate, maxDate);
//     if (day >= 0 && month >= 0 && year >= 0) {
//       const moment = Moment(
//         `${yearData[year]}-${pad(month + 1, 2)}-${pad(day + 1, 2)}`,
//         'YYYY-MM-DD',
//       );
//       if (SimplerDatePicker.isWithinBounds(minDate, maxDate, moment)) {
//         return moment;
//       }
//     }
//     return null;
//   };
//   constructor(props) {
//     super(props);
//     const {date, minDate, maxDate} = props;
//     this.state = {
//       ...SimplerDatePicker.extractStateFromMoment(date, minDate, maxDate),
//     };
//   }

//   //componentDidMount() {
//   //  // XXX: Force the caller to sync with the currently selected
//   //  //      date. This is important for times where the date has
//   //  //      been selected, but it is invalid given the range.
//   //  const { minDate, maxDate, onDatePicked } = this.props;
//   //  const { year, month, day } = this.state;
//   //  return onDatePicked(
//   //    SimplerDatePicker
//   //      .getMomentFromState(
//   //        minDate,
//   //        maxDate,
//   //        year,
//   //        month,
//   //        day,
//   //      ),
//   //  );
//   //}
//   componentWillUpdate(nextProps, nextState) {
//     const {date, minDate, maxDate, onDatePicked} = nextProps;
//     const {day, month, year} = nextState;
//     const userChangedDate =
//       day !== this.state.day ||
//       month !== this.state.month ||
//       year !== this.state.year;
//     if (!!date && date !== this.props.date) {
//       const newState = SimplerDatePicker.extractStateFromMoment(
//         date,
//         minDate,
//         maxDate,
//       );
//       const {day: newDay, month: newMonth, year: newYear} = newState;
//       const yearChanged = newYear !== year;
//       const monthChanged = newMonth !== month;
//       const dayChanged = newDay !== day;
//       if (yearChanged || monthChanged || dayChanged) {
//         return this.setState({
//           ...newState,
//         });
//       }
//     } else if (userChangedDate) {
//       return onDatePicked(
//         SimplerDatePicker.getMomentFromState(
//           minDate,
//           maxDate,
//           year,
//           month,
//           day,
//         ),
//       );
//     }
//   }
//   onYearPicked = (year) => {
//     const {minDate, maxDate} = this.props;
//     const {month, day} = this.state;
//     const yearData = SimplerDatePicker.getYearData(minDate, maxDate);
//     const monthData = SimplerDatePicker.getMonthData(minDate, maxDate);
//     const monthValid = SimplerDatePicker.isMonthValid(
//       minDate,
//       maxDate,
//       yearData,
//       year,
//       month,
//     );
//     const dayValid = SimplerDatePicker.isDayValid(
//       minDate,
//       maxDate,
//       yearData,
//       year,
//       monthData,
//       month,
//       day,
//     );
//     return this.setState({
//       year,
//       month: monthValid ? month : -1,
//       day: dayValid && monthValid ? day : -1,
//     });
//   };
//   onMonthPicked = (month) => {
//     const {minDate, maxDate} = this.props;
//     const {year, day} = this.state;
//     const yearData = SimplerDatePicker.getYearData(minDate, maxDate);
//     const monthData = SimplerDatePicker.getMonthData(minDate, maxDate);
//     const dayValid = SimplerDatePicker.isDayValid(
//       minDate,
//       maxDate,
//       yearData,
//       year,
//       monthData,
//       month,
//       day,
//     );
//     console.log('dayValid ? day : -1, : ' , dayValid ? day : -1,)
//     return this.setState({
//       month,
//       day: dayValid ? day : -1,
//     });
//   };
//   onDayPicked = (day) =>
//     this.setState({
//       day,
//     });

//   render() {
//     const {
//       containerStyle,
//       yearStyle,
//       monthStyle,
//       dayStyle,
//       textStyle,
//       placeholderStyle,
//       selectedTextStyle,
//       inputSearchStyle,
//       minDate,
//       maxDate,
//       date,
//       mode,
//       getPromptString,
//       yearName,
//       monthName,
//       dayName,
//       yearPickerProps,
//       monthPickerProps,
//       dayPickerProps,
//     } = this.props;
//     const {year, month, day} = this.state;
//     const yearData = SimplerDatePicker.getYearData(minDate, maxDate);
//     const monthData = SimplerDatePicker.getMonthData(minDate, maxDate);
//     const dayData = SimplerDatePicker.getDayData(
//       minDate,
//       maxDate,
//       year,
//       yearData,
//       month,
//     );

//     // console.log('monthData : ', monthData);
//     // console.log('dayData : ', dayData);
//     return (
//       <View style={containerStyle}>
//         <Dropdown
//           style={[yearStyle]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
//           itemTextStyle={{fontFamily: 'Prompt-Medium'}}
//           data={yearData}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'ปี'}
//           searchPlaceholder="ค้นหา..."
//           value={year}
//           onChange={(item, i) => {
//             console.log('item : ', item);
//             return this.onYearPicked(Number.isNaN(item) ? -1 : item);
//           }}
//         />

//         <Dropdown
//           disable={(year < 0)}
//           style={[
//             monthStyle,
//           ]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
//           itemTextStyle={{fontFamily: 'Prompt-Medium'}}
//           data={monthData}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'เดือน'}
//           searchPlaceholder="ค้นหา..."
//           value={month}
//           onChange={(item, i)  => {
//             return this.onMonthPicked(Number.isNaN(item) ? -1 : item);
//           }}
//         />

//         <Dropdown
//           disable={(month < 0)}
//           style={[
//             dayStyle,
//           ]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           itemContainerStyle={{fontFamily: 'Prompt-Medium'}}
//           itemTextStyle={{fontFamily: 'Prompt-Medium'}}
//           data={dayData}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'วัน'}
//           searchPlaceholder="ค้นหา..."
//           value={day}
//           onChange={(item) => {
//             return this.onDayPicked(Number.isNaN(item) ? -1 : item);
//           }}
//         />
//       </View>
//     );
//   }
// }

// SimplerDatePicker.propTypes = {
//   containerStyle: PropTypes.shape({}),
//   yearStyle: PropTypes.shape({}),
//   monthStyle: PropTypes.shape({}),
//   dayStyle: PropTypes.shape({}),
//   textStyle: PropTypes.shape({}),
//   minDate: PropTypes.shape({}),
//   maxDate: PropTypes.shape({}),
//   date: PropTypes.shape({}),
//   mode: PropTypes.string,
//   getPromptString: PropTypes.func,
//   yearName: PropTypes.string,
//   monthName: PropTypes.string,
//   dayName: PropTypes.string,
//   onDatePicked: PropTypes.func,
//   yearPickerProps: PropTypes.shape({}),
//   monthPickerProps: PropTypes.shape({}),
//   dayPickerProps: PropTypes.shape({}),
// };

// SimplerDatePicker.defaultProps = {
//   containerStyle: styles.containerStyle,
//   yearStyle: styles.yearStyle,
//   monthStyle: styles.monthStyle,
//   dayStyle: styles.dayStyle,
//   textStyle: styles.textStyle,
//   minDate: Moment().subtract(100, 'years'),
//   maxDate: Moment(),
//   date: null,
//   mode: 'dropdown',
//   getPromptString: (name) => `Select ${name}`,
//   yearName: 'Year',
//   monthName: 'Month',
//   dayName: 'Day',
//   onDatePicked: (moment) => {
//     const date = moment && moment.format('YYYY/MM/DD');
//     if (Platform.OS !== 'web') {
//       Alert.alert(date);
//     }
//     return console.log(date);
//   },
//   yearPickerProps: {},
//   monthPickerProps: {},
//   dayPickerProps: {},
// };

// export default SimplerDatePicker;
