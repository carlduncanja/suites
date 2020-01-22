import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Dimensions} from 'react-native';
import DailyAppointmentCard from './DailyAppointmentCard';
import moment from 'moment';
import ActionContainer from '../common/ActionContainer';


const APPS = require('../../assets/db.json').appointments;

const getAppointments = (date) =>{
    const dateAppointments = [];
    {APPS.map((app)=>{
        app.startTime.substring(0,10) === date ? dateAppointments.push(app) : null}
    )}
    return dateAppointments
}


export default class ScheduleListView extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    getDays = () => {
        let daysInMonth = []
        this.props.startDays.map((day)=>daysInMonth.push({"day":day,"inMonth":false}))
        this.props.currentDays.map((day)=>daysInMonth.push({"day":day.format("YYYY-MM-DD"),"inMonth":true}))
        this.props.endDays.map((day)=>daysInMonth.push({"day":day,"inMonth":false}))
        return daysInMonth
    }
  
    componentDidMount(){
        this.onScrollViewCreated(this.refs.dayScrollView);
    }

    onScrollViewCreated = (_scrollview) => {
        if (this.props.setScrollView) this.props.setScrollView(_scrollview)
    };
    

  
    render() {
        return (
            <ScrollView 
                style={[styles.container]} 
                ref = "dayScrollView" 
                contentOffset={{x:0, y:this.props.scheduleOffset}}
                contentContainerStyle={{paddingBottom:'50%'}}
                //onScroll = {(event)=> {this.props.appointmentScroll(event); }}
                scrollEventThrottle={6}
                bounces={false}
                >
                {   
                    this.getDays().map((date, index)=>{
                        return (
                            <View 
                                onLayout={(event) => {
                                    date.day === moment(this.props.selected.selected).format("YYYY-MM-DD") ? this.props.getOffset(event.nativeEvent.layout.y) : null; 
                                    this.props.getAppointments({"date":moment(date.day),"event":event.nativeEvent.layout.y});
                                }}
                                key={index}
                                >

                                <DailyAppointmentCard
                                    keyValue={index}
                                    animateSlide = {this.props.animateSlide}
                                    dailyText = {`${moment(date.day).format("dddd").toString()} - ${moment(date.day).format("MMM D").toString()}`}
                                    dailyAppointments = {getAppointments(date.day)}
                                    showScheduleDetails = {this.props.showScheduleDetails}
                                    status = {date.inMonth}
                                />
                            </View>
                        )
                    }
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginLeft:'2%',
        marginRight:'3%',
        backgroundColor:'rgba(247, 250, 252, 1)',
        borderWidth:1,
        borderColor:'#CBD5E0',
        borderRadius:16,
        paddingTop:20,
        paddingBottom:20,
        paddingRight: 24,
        paddingLeft:24,
        height:780
    },

    dateContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom:25,
    },

    dateLabelContainer:{
        borderBottomColor: '#718096',
        borderBottomWidth: 1,
        paddingBottom:5,
        marginBottom: 10,
    },
    dateLabel:{
        fontWeight: 'bold',
        fontSize: 12,
    },

})
