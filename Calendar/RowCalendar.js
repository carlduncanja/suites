import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Month from './Month';
import RowCalendarDays from './RowCalendarDays'


export default class RowCalendar extends Component {
    render() {
        return (
            <View style={styles.container}>                
                <ScrollView  horizontal={true} style={{paddingBottom:10}}>
                    <View style={styles.carouselDates}>
                        {this.props.currentDays.map((day,index)=>{
                            return (
                                <RowCalendarDays
                                    onPressDay={this.props.onPressDay} 
                                    key={`day-${index}`} 
                                    day={day.day}
                                    weekday={day.dayOfWeek}
                                    selected = {this.props.selected}
                                />
                            )
                        })}
                    </View>
                </ScrollView> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        flexDirection:'column', 
        marginTop:5,
    },
    carouselDates:{
        //flex:1,
        flexDirection:'row',
        marginLeft:5,
        marginRight:5,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'#EDF2F7',
    }
})
