import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import moment from 'moment';
import Schedule from '../Schedule/Schedule';
import Calendar from '../Calendar/Calendar';
import RowCalendar from '../Calendar/RowCalendar';
import SlideUpPanel from '../components/SideUpPanel';

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state={
            currentDate: moment(new Date()),
            selected: {},
            daySelected: false,
            searchOpen:false,
            transparent:false,
            searchValue:"",
            showSlider: false,
            sliderTransparent:false,
            scheduleDetails:{},
        }

        this.decreaseMonthChange = this.decreaseMonthChange.bind(this);
        this.increaseMonthChange = this.increaseMonthChange.bind(this);
        this.onPressDay = this.onPressDay.bind(this);
        this.searchPress = this.searchPress.bind(this);
        this.searchChangeText = this.searchChangeText.bind(this);
        this.closeTransparent = this.closeTransparent.bind(this);
        this.showScheduleDetails = this.showScheduleDetails.bind(this);
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
        })
    }

    showScheduleDetails(appointment){
        console.log(`Clicked ${appointment}`);
        this.setState({
            scheduleDetails:appointment,
            sliderTransparent:true,
            showSlider:true,
        })
    }
      
    render() {
        return (
            <View style = {styles.content}>
                {this.props.name === 'SCHEDULE' ? 
                    <Schedule 
                        {...this.state}
                        searchChangeText = {this.searchChangeText}
                        decreaseMonthChange = {this.decreaseMonthChange}
                        increaseMonthChange = {this.increaseMonthChange}
                        closeTransparent = {this.closeTransparent}
                        onPressDay = {this.onPressDay}
                        searchPress = {this.searchPress}
                        currentDays = {this.getCurrentDays()}
                        showScheduleDetails = {this.showScheduleDetails}
                    />
                    :
                    this.props.name === 'CASE FILES' ?
                        <RowCalendar
                        currentDate = {this.state.currentDate}
                        decreaseMonthChange = {this.decreaseMonthChange}
                        increaseMonthChange = {this.increaseMonthChange}
                        onPressDay = {this.onPressDay}
                        currentDays = {this.getCurrentDays()}
                        selected={this.state.selected}
                        daySelected={this.daySelected}
                        />

                        :
                        this.props.name === 'PATIENTS' ?
                            <Calendar 
                            currentDate = {this.state.currentDate}
                            decreaseMonthChange = {this.decreaseMonthChange}
                            increaseMonthChange = {this.increaseMonthChange}
                            onPressDay = {this.onPressDay}
                            currentDays = {this.getCurrentDays()}
                            selected={this.state.selected}
                            daySelected={this.daySelected}/>
                    
                            :
                            this.props.name === 'INVENTORY' ?
                                <SlideUpPanel/>
                                :
                                this.props.name === 'DELIVERY' ?
                                    <Text>DELIVERY</Text>
                                    :
                                    this.props.name === 'EQUIPMENTS' ?
                                        <Text>DELIVERY</Text>
                                        :
                                        this.props.name === 'ALERTS' ?
                                            <Text>ALERTS</Text>
                                            :
                                            <Text>HOME</Text>
                } 
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:3,
    }
})