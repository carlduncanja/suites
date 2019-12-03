import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import ScheduleList from './ScheduleList';
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
    render() {
        
        let date = this.props.currentDate;
        let currentJSDate = date.toDate()

        let tomorrow = moment(new Date(currentJSDate.setDate(currentJSDate.getDate() + 1)));
        let second = moment(new Date(currentJSDate.setDate(currentJSDate.getDate() + 1)));
        let last = moment(new Date(currentJSDate.setDate(currentJSDate.getDate() + 1)));

        return (
            <ScrollView style={[styles.container]}>
                {this.props.displayTodayAppointment === true ?
                        <DailyAppointmentCard
                            dailyText = {`Today - ${this.props.currentDate.format("MMM D").toString()}`}
                            dailyAppointments = {getAppointments(this.props.currentDate.format("YYYY-MM-DD"))}
                            showScheduleDetails = {this.props.showScheduleDetails}
                        />

                    :

                    <View>
                        <DailyAppointmentCard
                            getDrawerRef = {this.props.getDrawerRef}
                            dailyText = {`Tommorrow - ${moment(tomorrow).format("MMM D").toString()}`}
                            dailyAppointments = {getAppointments(moment(tomorrow).format("YYYY-MM-DD"))}
                            showScheduleDetails = {this.props.showScheduleDetails}
                        />

                        <DailyAppointmentCard
                            getDrawerRef = {this.props.getDrawerRef}
                            dailyText = {`${moment(second).format("dddd").toString()} - ${moment(second).format("MMM D").toString()}`}
                            dailyAppointments = {getAppointments(moment(second).format("YYYY-MM-DD"))}
                            showScheduleDetails = {this.props.showScheduleDetails}
                        />

                        <DailyAppointmentCard
                            getDrawerRef = {this.props.getDrawerRef}
                            dailyText = {`${moment(last).format("dddd").toString()} - ${moment(last).format("MMM D").toString()}`}
                            dailyAppointments = {getAppointments(moment(last).format("YYYY-MM-DD"))}
                            showScheduleDetails = {this.props.showScheduleDetails}
                        />
                    </View>
                }
                {/* <View style={{position:'absolute', left:50, bottom:50 }}>
                            <ActionContainer actionTitle="More Details" content={<Text>Create New List</Text>}/>
                        </View> */}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        //justifyContent: 'flex-start',
        marginLeft:'2%',
        marginRight:'2%',
        backgroundColor:'#F7FAFC',
        borderTopLeftRadius: 16,
        borderTopRightRadius:16,
        padding: 24,
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
