import React, { useState } from 'react';
import {Text, View, StyleSheet, ScrollView, ScrollViewBase, TouchableOpacity} from 'react-native';
import Month from './Month';
import RowCalendarDays from './RowCalendarDays'
import DayIdentifier from '../common/DayIdentifier';
import moment from 'moment';

export default RowCalendar = (props) => {
    [scrollView] = useState(now);
    // componentDidMount() {
    //     this.onScrollViewCreated(this.refs.scrollview);
    // }

    //pass the ref for the scroll view to the parent.
    onScrollViewCreated = (_scrollview) => {
       if (props.setScrollView) setScrollView(_scrollview)
    };

    getFilterDay = () => {
        if (props.selected.status === false){
            filterDayEvent = 0
        }else{
            filterDay = props.datePositions.filter(date => moment(date.day).format("YYYY MM D") === moment(props.selected.selected).format("YYYY MM D"))
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

        const daysArray = props.startDays.concat(props.currentDays.concat(props.endDays));
        
        return(
            <ScrollView
                style = {[styles.container]}
                horizontal={true}
                // ref="scrollview"
                //contentOffset={this.props.selected.status === false ? {x:this.props.calendarOffset, y:0} : {x:this.getFilterDay(),y:0}} 
                contentOffset={{x: props.calendarOffset, y:0}}
                contentContainerStyle={{paddingRight:'50%'}}
                // onScroll={(event)=>{this.props.getScrollMeasure(event); this.props.goToAppointment();}}
                scrollEventThrottle={6}
                bounces={false}
            >
                {daysArray.map((day,index)=>{
                    return (
                        <View 
                            onLayout={(event)=>{
                                moment(day).format("YYYY-MM-D") === props.selected.selected.format("YYYY-MM-D") ?
                                    props.getCalendarOffset(event.nativeEvent.layout.x)
                                    :
                                    null
                                props.getAppointmentScroll({"day":day,"event":event.nativeEvent.layout.x});
                                
                                 
                            }}
                            key={index} 
                            style={styles.day}
                        >
                            {props.selected.selected.format("YYYY MM D") === moment(day).format("YYYY MM D") ?
                                <DayIdentifier color="#3FC7F4"/>
                                :
                                null
                            }
                            <View style={{paddingRight:40, paddingLeft:40}}>
                                <RowCalendarDays
                                    currentDate = {props.currentDate}
                                    onPressDay={props.onPressDay}
                                    key={index}
                                    day={moment(day)}
                                    weekday={moment(day).format("ddd")}
                                    selected = {props.selected}
                                    filterStatus = {this.getLevels(day)}
                                />              
                            </View>
                             
                        </View>
                            
                    )
                })}
            </ScrollView>
           
        )
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

    }
   
})