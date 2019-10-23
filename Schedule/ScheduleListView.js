import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ScheduleList from './ScheduleList';


const APPS = require('../assets/db.json').appointments;
const margin = 10

const getAppointments = (date) =>{
    const dateAppointments = [];
    {APPS.map((app)=>{ 
        app.startTime.substring(0,10) === date ? dateAppointments.push(app) : null}
    )}
    return dateAppointments
}

export default class ScheduleListView extends Component {
    render() {
        console.log("Rendered")
        return (
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>Tommorrow - {this.props.currentDate.add(1,'days').format("MMM D").toString()}</Text>
                    </View>
                    <ScheduleList appointments={getAppointments(this.props.currentDate.format("YYYY-MM-DD"))}/>                    
                </View>

                <View style={styles.dateContainer}>
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>{this.props.currentDate.add(1,'days').format("dddd").toString()} - {this.props.currentDate.format("MMM D").toString()}</Text>
                    </View>
                    <ScheduleList appointments={getAppointments(this.props.currentDate.format("YYYY-MM-DD"))}/>
                </View>

                <View style={styles.dateContainer}>
                    <View style={styles.dateLabelContainer}>
                        <Text style={styles.dateLabel}>{this.props.currentDate.add(1,'days').format("dddd").toString()} - {this.props.currentDate.format("MMM D").toString()}</Text>
                    </View>
                    <ScheduleList appointments={getAppointments(this.props.currentDate.format("YYYY-MM-DD"))}/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        margin: margin,
        backgroundColor:'#F7FAFC',
        borderTopLeftRadius: 16,
        borderTopRightRadius:16,
        padding: 20,
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
