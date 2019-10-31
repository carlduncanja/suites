import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ScheduleList from './ScheduleList';
import moment from 'moment';


const APPS = require('../assets/db.json').appointments;
//console.log("JSON: ", APPS);
// const margin = 10

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
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>
                            Tommorrow - {moment(tomorrow).format("MMM D").toString()}
                        </Text>
                    </View>
                    <ScheduleList 
                        appointments={getAppointments(moment(tomorrow).format("YYYY-MM-DD"))} 
                        showScheduleDetails= {this.props.showScheduleDetails}
                    />                    
                </View>

                <View style={styles.dateContainer}>
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>{moment(second).format("dddd").toString()} - {moment(second).format("MMM D").toString()}</Text>
                    </View>
                    <ScheduleList 
                        appointments={getAppointments(moment(second).format("YYYY-MM-DD"))} 
                        showScheduleDetails = {this.props.showScheduleDetails}
                    />
                </View>

                <View style={styles.dateContainer}>
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>{moment(last).format("dddd").toString()} - {moment(last).format("MMM D").toString()}</Text>
                    </View>
                    <ScheduleList 
                        appointments={getAppointments(moment(last).format("YYYY-MM-DD"))} 
                        showScheduleDetails = {this.props.showScheduleDetails}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        //flex:1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        marginLeft:'2%',
        marginRight:'2%',
        backgroundColor:'#F7FAFC',
        //backgroundColor:'red',
        borderTopLeftRadius: 16,
        borderTopRightRadius:16,
        padding: 20,
        //height:'100%',
        // height:screenHeight
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
