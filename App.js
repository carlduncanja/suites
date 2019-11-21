import React from 'react';
import { StyleSheet, SafeAreaView, Animated, PanResponder, Platform, ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Sidebar from './layout/Sidebar';
import Content from './layout/Content';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tabSelected:{},
      tabSelectedBool: false,
      currentDate: moment(new Date()),
      selected: {},
      screenDimensions: {},
      daySelected: false,
      searchOpen:false,
      transparent:false,
      searchValue:"",
      showSlider: false,
      scheduleDetails:{},
      slideDraggable:true,
      maxDragHeight: 0,
      scheduleButtons: false,
      displayFullCalendar: false,
      statusLastRow: false,
      deleteAppointment: false,
      completeDeleteAppointment: false,
      displayTodayAppointment: false,
    }

    this.onPressTab = this.onPressTab.bind(this); 
    this.decreaseMonthChange = this.decreaseMonthChange.bind(this);
    this.increaseMonthChange = this.increaseMonthChange.bind(this);
    this.onPressDay = this.onPressDay.bind(this);
    this.searchPress = this.searchPress.bind(this);
    this.searchChangeText = this.searchChangeText.bind(this);
    this.closeTransparent = this.closeTransparent.bind(this);
    this.showScheduleDetails = this.showScheduleDetails.bind(this);
    this.stopScheduleDrag = this.stopScheduleDrag.bind(this);
    this.restartDrag = this.restartDrag.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
    this.showScheduleButtons = this.showScheduleButtons.bind(this);
    this.showFullCalendar = this.showFullCalendar.bind(this);
    this.showLastCalendarRow = this.showLastCalendarRow.bind(this);
    this.deleteFloatingAction = this.deleteFloatingAction.bind(this);
    this.completeDeleteFloatingAction = this.completeDeleteFloatingAction.bind(this);
    this.exitDelete = this.exitDelete.bind(this);
    this.showTodayAppointment = this.showTodayAppointment.bind(this);
  }

  getDimensions(event){
    this.setState({
      screenDimensions:{
        "width":event.nativeEvent.layout.width, 
        "height":event.nativeEvent.layout.height
      }
    })
  }

  onPressTab(event,selected){
    selectedObject = {"tabSelected":selected,"status":true};
    tabSelectedBool = true;
    this.setState({tabSelected:selectedObject, tabSelectedBool});
  }

  decreaseMonthChange(e,date){
    current = this.state.currentDate;
    this.setState({currentDate: current.subtract(1,'month')});
  }

  increaseMonthChange(){
    current = this.state.currentDate;
    this.setState({currentDate: current.add(1,'month')});
  }
  onPressDay(event,selected){
  if (this.state.daySelected === true) {
      if (this.state.selected.selected === selected){
      selectedObject = {};
      daySelected = false;
      }else{
      selectedObject = {"selected":selected,"status":true};
      daySelected = true;
      }
      
  }else{
      selectedObject = {"selected":selected,"status":true};
      daySelected = true;
  }      
      
  this.setState({selected:selectedObject, daySelected});
  }

  getCurrentDays(inputMonth, inputYear){
  let results=[];
  let daysInMonth = moment([inputYear, inputMonth -1]).daysInMonth();
  for (let i =1; i<= daysInMonth; i++){
      i < 10 ?  day=`0${i}` :  day = i;
      let str = `${inputYear}-${inputMonth}-${day}`;
      let dayofWeek=moment(str).format("ddd");
      results.push({"dayOfWeek":dayofWeek,"day":i});
  }
  return results
  }

  searchPress(){
      t = this.state.transparent;
      t === true? newTrans = false: newTrans = true 
      this.setState({
          transparent:newTrans,
          searchOpen:true,
      });
  }

  searchChangeText(textInput){
      this.setState({
          searchValue:textInput
      })
  }

  closeTransparent(){
      this.setState({
          transparent:false,
          searchOpen: false,
          showSlider:false,
      })
  }

  showScheduleDetails(appointment){
      let newObject = Object.assign({},appointment);
      this.state.sliderTransparent === true && this.state.showSlider === true ? 
          status = false : status = true
      this.setState({
          scheduleDetails:newObject,
          //sliderTransparent:status,
          transparent:status,
          showSlider:status,
      })
  }
    
  stopScheduleDrag(height){
    let draggable;
      height === Dimensions.get('window').height - 150 ? draggable = false : null
      this.setState({maxDragHeight: height, slideDraggable:draggable})
  }

  restartDrag(){      
      this.setState({slideDraggable:true})
  }

  showScheduleButtons(){
    this.state.scheduleButtons === true ?
        this.setState({scheduleButtons:false}) :
        this.setState({scheduleButtons:true})
   
  }

  showFullCalendar(){
    let status = !this.state.displayFullCalendar;
    this.setState({displayFullCalendar:status})
  }

  showLastCalendarRow(){
    !this.state.statusLastRow === true ? 
      this.setState({statusLastRow:true})
      :
      this.setState({
        displayFullCalendar:false,
        statusLastRow: false
      })
  }

  deleteFloatingAction(){
    status = !this.state.deleteAppointment;
    this.setState({deleteAppointment:status})
    this.timer = setTimeout(() => {
      this.setState({deleteAppointment:false})
    },2000)
  }

  completeDeleteFloatingAction(){
    clearTimeout(this.timer)
    this.setState({completeDeleteAppointment: true})
  }

  exitDelete(){
    this.setState({completeDeleteAppointment: false, deleteAppointment: false, scheduleButtons: false})
  }

  showTodayAppointment(){
    this.setState({displayTodayAppointment: !this.state.displayTodayAppointment})
    console.log("Current Date: ", this.state.currentDate)
  }
  
  render(){
    // console.log("Current Week First Day: ", moment().startOf('isoweek').format('D') )
    // console.log("Current Week Last Day: ", moment().endOf('week').format('D'))
    return (
      <SafeAreaView style={styles.container} onLayout={this.getDimensions}>
        <View style={styles.scroll} >
          <View style = {styles.sidebar}>
            <Sidebar 
              screenDimensions = {this.state.screenDimensions}
              searchOpen = {this.state.searchOpen}
              transparent = {this.state.transparent}
              showSlider = {this.state.showSlider}
              tabSelected = {this.state.tabSelected}
              tabSelectedBool = {this.state.tabSelectedBool}
              onPressTab = {this.onPressTab}
            />
          </View>
          <View style = {styles.content}>
            {this.state.tabSelected.tabSelected === 'schedule' ? 
              <Content 
                {...this.state}  
                name="SCHEDULE"
                searchChangeText = {this.searchChangeText}
                decreaseMonthChange = {this.decreaseMonthChange}
                increaseMonthChange = {this.increaseMonthChange}
                closeTransparent = {this.closeTransparent}
                onPressDay = {this.onPressDay}
                searchPress = {this.searchPress}
                currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                prevMonthDays = {this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) - 1).toString(), this.state.currentDate.format("YYYY"))}
                nextMonthDays = {this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) + 1).toString(), this.state.currentDate.format("YYYY"))}
                showScheduleDetails = {this.showScheduleDetails}
                showScheduleButtons = {this.showScheduleButtons}
                stopScheduleDrag = {this.stopScheduleDrag}
                restartDrag = {this.restartDrag}
                showFullCalendar = {this.showFullCalendar}
                showLastCalendarRow = {this.showLastCalendarRow}
                deleteFloatingAction = {this.deleteFloatingAction}
                completeDeleteFloatingAction = {this.completeDeleteFloatingAction}
                exitDelete = {this.exitDelete}
                showTodayAppointment = {this.showTodayAppointment}
                />
              :
              this.state.tabSelected.tabSelected === 'case files' ?
                <Content 
                  {...this.state} 
                  name="CASE FILES" 
                  onPressDay = {this.onPressDay}
                  currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                  prevMonthDays = {this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) - 1).toString(), this.state.currentDate.format("YYYY"))}
                  nextMonthDays = {this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) + 1).toString(), this.state.currentDate.format("YYYY"))}
                />
                :
                this.state.tabSelected.tabSelected === 'patients' ?
                  <Content 
                    {...this.state} 
                    name="PATIENTS"
                    />
                  :
                  this.state.tabSelected.tabSelected === 'inventory' ?
                    <Content {...this.state} name="INVENTORY"/>
                    :
                    this.state.tabSelected.tabSelected === 'delivery' ?
                      <Content {...this.state} name="DELIVERY"/>
                      :
                      this.state.tabSelected.tabSelected === 'equipments' ?
                        <Content {...this.state} name="EQUIPMENTS"/>
                        :
                        this.state.tabSelected.tabSelected === 'alerts' ?
                          <Content {...this.state} name="ALERTS"/>
                          :
                          <Content {...this.state} name="HOME"/>
            }
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
}




const styles = StyleSheet.create({
  container: {    
    flex:1,
    backgroundColor: '#fff',
  },
  scroll:{
    flex:1,
    flexDirection:'row',
  },
  sidebar:{
    //flex:1,
  },
  content:{
    flex:12,
  }
       
});
