import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScheduleList from './ScheduleList'

export default class DailyAppointmentCard extends Component {
    render(){
       
        return (
            <View style={styles.dateContainer}>
                <View style={styles.dateLabelContainer}>
                    <Text style={styles.dateLabel}>
                        {this.props.dailyText}
                    </Text>
                </View>
                <ScheduleList
                    getDrawerRef = {this.props.getDrawerRef}
                    appointments = {this.props.dailyAppointments}
                    showScheduleDetails = {this.props.showScheduleDetails}
                    
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dateContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom:44,
    },

    dateLabelContainer:{
        borderBottomColor: '#718096',
        borderBottomWidth: 1,
        paddingBottom:5,
        marginBottom: 0,
    },
    dateLabel:{
        fontWeight: 'bold',
        fontSize: 12,
    },
})
