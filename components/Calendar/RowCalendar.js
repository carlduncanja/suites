import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView, ScrollViewBase, TouchableOpacity} from 'react-native';
import Month from './Month';
import RowCalendarDays from './RowCalendarDays'
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';

export default class RowCalendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            scrollView: null,
        };
        
    }

    componentDidMount() {
        this.onScrollViewCreated(this.refs.scrollview);
    }

    //pass the ref for the scroll view to the parent.
    onScrollViewCreated = (_scrollview) => {
       if (this.props.setScrollView) this.props.setScrollView(_scrollview)
    };

    getFilterDay(){
        if (this.props.selected.status === false){
            filterDayEvent = 0
        }else{
            filterDay = this.props.datePositions.filter(date => moment(date.day).format("YYYY MM D") === moment(this.props.selected.selected).format("YYYY MM D"))
            filterDayEvent = filterDay[0].event
        }
        return  filterDayEvent   
    }

    getLevels = day =>{
        const appointments = require('../../assets/db.json').appointments;
        let result = appointments.filter(appointment => moment(appointment.startTime).format("YYYY/MM/DD") === moment(day).format("YYYY/MM/DD"))
        let status = result.length === 0 ? false : true
        return status
    }

    render(){    
        const daysArray = this.props.startDays.concat(this.props.currentDays.concat(this.props.endDays))
        
        return(
            <>
                {/* <View style={styles.magnify} >
                   
                </View> */}
                <ScrollView
                    style = {[styles.container,]}
                    horizontal={true}
                    ref="scrollview"
                    //contentOffset={this.props.selected.status === false ? {x:this.props.calendarOffset, y:0} : {x:this.getFilterDay(),y:0}} 
                    contentOffset={{x:this.props.calendarOffset, y:0}}
                    contentContainerStyle={{paddingRight:'50%'}}
                    onScroll={(event)=>
                        this.props.getScrollMeasure(event)
                        // this.props.goToAppointment();}
                    }
                    scrollEventThrottle={9}
                    bounces={false}
                    >
                    {daysArray.map((day,index)=>{
                        return (
                            <View 
                                onLayout={(event)=>{
                                    moment(day).format("YYYY-MM-D") === this.props.selected.selected.format("YYYY-MM-D") ?
                                        this.props.getCalendarOffset(event.nativeEvent.layout.x)
                                        :
                                        null
                                    this.props.getAppointmentScroll({"day":day,"event":event.nativeEvent.layout.x});
                                    
                                    
                                }}
                                key={index} 
                                // style={styles.day}
                                //style={moment(this.props.scrollAppointmentDay).format("YYYY MM D") === moment(day).format("YYYY MM D") ? [styles.day,styles.selectedDay]: styles.day}
                                ref = {view => this.dayRef = view}
                            >
                                {(this.props.selected.selected.format("YYYY MM D") || moment(this.props.scrollAppointmentDay).format("YYYY MM D")) === moment(day).format("YYYY MM D") ?
                                    <DayIdentifier color="#3FC7F4"/>
                                    :
                                    null
                                }
                          
                                <View style={{paddingRight:40, paddingLeft:40}}>
                                    <RowCalendarDays
                                        currentDate = {this.props.currentDate}
                                        onPressDay={this.props.onPressDay}
                                        key={index}
                                        day={moment(day)}
                                        weekday={moment(day).format("ddd")}
                                        selected = {this.props.selected}
                                        filterStatus = {this.getLevels(day)}
                                    />              
                                </View>
                                
                            </View>
                                
                        )
                    })}
                </ScrollView>
            </>
           
           
        )
    }
}

const styles = StyleSheet.create({
    container:{
        //paddingRight:'6.2%',
        flexDirection:'column',
        marginTop:5,
        flexDirection:'row',
        borderLeftWidth:0.5,
        borderColor:'#EDF2F7',
    },
    day:{
        alignItems:'center',
        paddingBottom:20,
        paddingTop:3,
        borderColor:'#EDF2F7',
        borderRightWidth:0.5,
        borderBottomWidth:0.5,
        borderTopWidth:0.5,
    },
    selectedDay:{
        backgroundColor:'yellow'
    },
    magnify:{
        position:'absolute',
        marginTop:5,
        zIndex:1,
        borderWidth:1,
        alignItems:'center',
        width:113,
        height:100,
        // paddingRight:40,
        // paddingLeft:40,
        borderColor:'red',
        left:0,
        top:0,
    }
    
})