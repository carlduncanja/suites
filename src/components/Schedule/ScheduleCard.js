import React, { Component } from 'react'
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';

export default ScheduleCard = (props) => {
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
                        backgroundColor:statusColor(props.appointment.level),
                        height:11,
                        width: 11,
                        borderRadius: 10/2,
                    }}
                />

                <View  style={{flex:1}}>
                    <TouchableOpacity
                        style={styles.infoContainer}
                        onPress = {() => {props.animateSlide(props.displayFullCalendar);props.showScheduleDetails(props.appointment)}}
                    >
                        <Text style={styles.title}>{props.appointment.title} - {props.appointment.responseEntity}</Text>
                        <Text style={styles.time}>{getTime(props.appointment?.startTime)} - {getTime(props.appointment.endTime)}</Text>
                    </TouchableOpacity>
                </View>

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
        marginTop: 12,
        paddingBottom: 12,
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
        fontSize: 16,
        marginRight:40,
    },
    time:{
        fontSize:12,
        color: 'gray'
    }

})
