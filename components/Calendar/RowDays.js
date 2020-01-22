import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Month from './Month';
import RowCalendarDays from './RowCalendarDays'
import moment from 'moment';

export default class RowDays extends Component{
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

    render(){
        let daysArray = this.props.startDays.concat(this.props.currentDays.concat(this.props.endDays))
        return(
            <ScrollView
                style = {[styles.container]}
                horizontal={true}
                ref="scrollview"
                contentOffset={{x:this.props.calendarOffset, y:0}} 
                contentContainerStyle={{paddingRight:'50%'}}
                onScroll={(event)=>{
                    this.props.getScrollMeasure(event);
                }}
                scrollEventThrottle={6}
                bounces={false}
            >
                {daysArray.map((day,index)=>{
                    return (
                        <View 
                            onLayout={(event)=>{
                                this.props.getAppointmentScroll({"day":day,"event":event.nativeEvent.layout.x});
                                moment().format("YYYY/MM/D") === moment(day).format("YYYY/MM/D") && moment().format("YYYY/MM/D") === this.props.currentDate.format("YYYY/MM/D")? this.props.getCalendarOffset(event): null; 
                            }}
                            key={index} 
                            style={styles.day}
                        >
                             <RowCalendarDays
                                currentDate = {this.props.currentDate}
                                onPressDay={this.props.onPressDay}
                                key={index}
                                day={moment(day)}
                                weekday={moment(day).format("ddd")}
                                selected = {this.props.selected}
                            />              
                        </View>
                            
                    )
                })}
            </ScrollView>
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
        paddingRight:30, 
        paddingLeft: 30, 
        paddingBottom:20,
        paddingTop:3,
        borderColor:'#EDF2F7',
        borderRightWidth:0.5,
        borderBottomWidth:0.5,
        borderTopWidth:0.5,

    }
   
})