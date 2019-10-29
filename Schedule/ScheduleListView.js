import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ScheduleList from './ScheduleList';
import moment from 'moment';


const APPS = require('../assets/db.json').appointments;
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
        // console.log("Current Day: ",new Date().toISOString());
        let current = new Date();
        let next = current.getDate() + 1;
        console.log("Current: ", current);
        console.log("Next: ", new Date(current.setDate(next)));

        let tomorrowDay = parseInt(this.props.currentDate.format("DD")) + 1;
        let secondDay = parseInt(this.props.currentDate.format("DD")) + 2;
        let lastDay = parseInt(this.props.currentDate.format("DD")) + 3;
        // console.log("Last day: ", lastDay);

        let tomorrow = `${this.props.currentDate.format('YYYY-MM')}-${tomorrowDay}`;
        let second = `${this.props.currentDate.format('YYYY-MM')}-${secondDay}`;
        let last = `${this.props.currentDate.format('YYYY-MM')}-${lastDay}`;
       
        return (
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>Tommorrow - {moment(tomorrow).format("MMM D").toString()}</Text>
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom:5,
        marginBottom: 10,
    },
    dateLabel:{
        fontWeight: 'bold',
        fontSize: 12,
    },
  
})
