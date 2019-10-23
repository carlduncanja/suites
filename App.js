import React from 'react';
import { StyleSheet, SafeAreaView, Platform, ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import ScheduleListView from './Schedule/ScheduleListView';
import moment from 'moment';
import Calendar from './Calendar/Calendar';
import RowCalendar from './Calendar/RowCalendar';
import NavigationBar from './layout/NavigationBar';
import Sidebar from './layout/Sidebar';
import Content from './layout/Content';
import Schedule from './Schedule/Schedule';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentDate: moment(new Date()),
      selected: {},
      daySelected: false,
      tabSelected:{},
      tabSelectedBool: false,
      searchOpen:false,
      visibleSearchPopover:false,
    }

    this.decreaseMonthChange = this.decreaseMonthChange.bind(this);
    this.increaseMonthChange = this.increaseMonthChange.bind(this);
    this.onPressDay = this.onPressDay.bind(this);
    this.onPressTab = this.onPressTab.bind(this);
    this.searchPress = this.searchPress.bind(this);
    this.searchClosePopover = this.searchClosePopover.bind(this);
  }

  decreaseMonthChange(){
    current = this.state.currentDate;
    this.setState({currentDate: current.subtract(1,'month')})
  }
  increaseMonthChange(){
    current = this.state.currentDate;
    this.setState({currentDate: current.add(1,'month')})
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

  getCurrentDays(){
    let results=[];
    let currentMonth = this.state.currentDate.format("MM");
    let currentYear = this.state.currentDate.format("YYYY");
    let daysInMonth = moment([currentYear, currentMonth-1]).daysInMonth();
    for (let i =1; i<= daysInMonth; i++){
      i < 10 ?  day=`0${i}` :  day = i;
      let str = `${currentYear}-${currentMonth}-${day}`;
      let dayofWeek=moment(str).format("ddd");
      results.push({"dayOfWeek":dayofWeek,"day":i});
    }
    return results
  }

  onPressTab(event,selected){
    selectedObject = {"tabSelected":selected,"status":true};
    tabSelectedBool = true;
    this.setState({tabSelected:selectedObject, tabSelectedBool});
  }

  searchPress(){
    this.setState({
      searchOpen:true,
      visibleSearchPopover:true
    });
  }

  searchClosePopover(){
    this.setState({visibleSearchPopover:false});
  }
  
  render(){

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll} >
          <View style = {styles.sidebar}>
            <Sidebar 
              tabSelected={this.state.tabSelected}
              tabSelectedBool={this.state.tabSelectedBool}
              onPressTab = {this.onPressTab}
            />
          </View>
          <View style = {styles.content}>
          <Calendar 
                currentDate = {this.state.currentDate}
                decreaseMonthChange = {this.decreaseMonthChange}
                increaseMonthChange = {this.increaseMonthChange}
                onPressDay = {this.onPressDay}
                currentDays = {this.getCurrentDays()}
                selected={this.state.selected}
                daySelected={this.daySelected}/>
            {/* {this.state.tabSelected.tabSelected === 'schedule' ? 
              <Schedule 
                {...this.state}
                decreaseMonthChange = {this.decreaseMonthChange}
                increaseMonthChange = {this.increaseMonthChange}
                onPressDay = {this.onPressDay}
                searchClosePopover = { this.searchClosePopover }
                searchPress = {this.searchPress}
                currentDays = {this.getCurrentDays()}
              />
              :
              this.state.tabSelected.tabSelected === 'case files' ?
                <RowCalendar
                  currentDate = {this.state.currentDate}
                  decreaseMonthChange = {this.decreaseMonthChange}
                  increaseMonthChange = {this.increaseMonthChange}
                  onPressDay = {this.onPressDay}
                  currentDays = {this.getCurrentDays()}
                  selected={this.state.selected}
                  daySelected={this.daySelected}
                />
                // <Content {...this.props} name="CASE FILES"/>
                :
                this.state.tabSelected.tabSelected === 'patients' ?
                <Calendar 
                currentDate = {this.state.currentDate}
                decreaseMonthChange = {this.decreaseMonthChange}
                increaseMonthChange = {this.increaseMonthChange}
                onPressDay = {this.onPressDay}
                currentDays = {this.getCurrentDays()}
                selected={this.state.selected}
                daySelected={this.daySelected}/>
                  // <Content {...this.props} name="PATIENTS"/>
                  :
                  this.state.tabSelected.tabSelected === 'inventory' ?
                    <Content {...this.props} name="INVENTORY"/>
                    :
                    this.state.tabSelected.tabSelected === 'delivery' ?
                      <Content {...this.props} name="DELIVERY"/>
                      :
                      this.state.tabSelected.tabSelected === 'equipments' ?
                        <Content {...this.props} name="EQUIPMENTS"/>
                        :
                        this.state.tabSelected.tabSelected === 'alerts' ?
                          <Content {...this.props} name="ALERTS"/>
                          :
                          <Content {...this.props} name="HOME"/>
            } */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
}

const height = Dimensions.get('window').height;
const navHeight = height-24;
const currentDate = moment(new Date());

const styles = StyleSheet.create({
  container: {    
    flex:1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 24: 0, 
    // height:'100%'   
  },
  scroll:{
    flex:1,
    flexDirection:'row',
  },
  sidebar:{
    flex:1,
    height: navHeight,
  },
  content:{
    flex:3,
  }
       
});
