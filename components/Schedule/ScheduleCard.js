import React, { Component } from 'react'
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';

export default function ScheduleCard({appointment, showScheduleDetails}){    
    const getTime = (appointment) => {
        let timePeriod;
        let time;
        let hour = appointment.substring(11,13);
        let minutes = appointment.substring(14,16);
        if (parseInt(hour) > 11){
            timePeriod = "pm";
            if (parseInt(hour) === 12){
                time = `${hour}:${minutes}`
            }else{
                time = `${(parseInt(hour) - 12).toString()}:${minutes}`
            }
         
        }else{
            timePeriod = "am"
            time = `${(parseInt(hour)).toString()}:${minutes}`
        }
        return (`${time} ${timePeriod}`)
        
    }

    return(
        <View style = {styles.card}>
            <View 
                style = {{
                    alignSelf:'center',
                    backgroundColor:statusColor(appointment.level),
                    height:10,
                    width: 10,
                    borderRadius: 10/2,
                }}
            />

            <ScrollView horizontal={true} contentContainerStyle={{flex:1, alignItems: 'center'}}>
                <TouchableOpacity 
                    style={styles.infoContainer} 
                    onPress = {app => showScheduleDetails(appointment)}
                >
                    <Text style={styles.title}>{appointment.title} - {appointment.responseEntity}</Text>
                    <Text style={styles.time}>{getTime(appointment.startTime)} - {getTime(appointment.endTime)}</Text>
                </TouchableOpacity>          
            </ScrollView>
            
        </View>
    )
}

const statusColor = (status) =>{
    status === 1 ? color = '#E53E3E':
        status === 2 ? color = "#ECC94B":
            status === 3 ? color = "#4299E1": color ="#48BB78"
    
    return color
}

const styles=StyleSheet.create({
    card:{
        flex:1,
        flexDirection:'row',
        borderBottomColor: '#CBD5E0',
        borderBottomWidth: 1,
        justifyContent:'flex-start',
        alignSelf:'center',
        marginTop: 16,
        paddingBottom: 16,
        overflow:'scroll',
    },
    infoContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        marginLeft: 8,
        paddingRight:0,
    },
    title:{
        fontSize: 14,
        marginRight:40,
    },
    time:{
        fontSize:12,
        color: 'gray'
    }
   
})