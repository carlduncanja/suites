import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScheduleList from './ScheduleList'
import ScheduleCard from './ScheduleCard';


export default DailyAppointmentCard = (props) => {
        return (
            <View style={[styles.dateContainer, {opacity:props.status === true? 1 :0.4}]}>
                <View style={styles.dateLabelContainer}>
                    <Text style={styles.dateLabel}>
                        {props.dailyText}
                    </Text>
                </View>
                <FlatList 
                    key={props.keyValue}
                    data={props.dailyAppointments}
                    renderItem={({ item }) => 
                        <ScheduleCard 
                            appointment={item} 
                            showScheduleDetails={props.showScheduleDetails}
                            animateSlide = {props.animateSlide}
                        />
                    }
                    keyExtractor={item => item.id}
                />
                {/* <ScheduleList
                    keyValue = {props.keyValue}
                    appointments = {props.dailyAppointments}
                    showScheduleDetails = {props.showScheduleDetails}
                    animateSlide = {props.animateSlide}
                /> */}
            </View>
        )
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
        paddingBottom:9,
        marginBottom: 0,
    },
    dateLabel:{
        fontWeight: 'bold',
        fontSize: 14,
    },
})
