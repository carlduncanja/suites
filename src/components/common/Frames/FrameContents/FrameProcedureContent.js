import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameCheckboxItem from '../FrameItems/FrameCheckboxItem';
import moment from "moment";

const FrameProcedureContent = (props) => {

    const appointment = (appointment,location) => {
        return (
            <View>
                <FrameTableItem title = "Location" value={location.name}/>
                <View style={styles.dateContainer}>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "Date" value = {moment(appointment.startTime).format("MMM/D/YYYY")}/>
                    </View>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "" value = {moment(appointment.startTime).format("h:mm A")}/>
                    </View>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "Duration" value = {appointment.duration}/>
                    </View>
                </View>
            </View>
        )
    }
    console.log("Information", props.details)
    return ( 
        <View style={styles.container}>
            <View>
                {appointment(props.details.appointment, props.details.location)}
                <View style={styles.recovery}>
                    <FrameCheckboxItem title = "Recovery" status = {props.details.hasRecovery}/>
                </View>
                {props.details.hasRecovery && appointment(props.details.recovery.appointment,props.details.recovery.location)}

            </View>
            {/* {Object.keys(props.details).map((key, index) =>{
                return(
                    <View key={index}> 
                        {
                            key === 'recovery' &&
                            <View style={styles.recovery}>
                                <FrameCheckboxItem title = "Recovery" status = {props.details.recovery.status}/>
                            </View>
                        }
                        <View>
                            <FrameTableItem title = "Location" value={props.details[key].location.name}/>
                            <View style={styles.dateContainer}>
                                <View style={{flex:1}}>
                                    <FrameTableItem title = "Date" value = {moment(props.details[key].appointment.startTime).format("MMM/D/YYYY")}/>
                                </View>
                                <View style={{flex:1}}>
                                    <FrameTableItem title = "" value = {moment(props.details[key].appointment.startTime).format("h:mm A")}/>
                                </View>
                                <View style={{flex:1}}>
                                    <FrameTableItem title = "Duration" value = {props.details[key].duration}/>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })} */}

            
             
        </View>
    );
}
 
export default FrameProcedureContent;

const styles = StyleSheet.create({
    container:{
        padding:16,
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderTopWidth:0,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    dateContainer:{
        flexDirection:'row'
    },
    
})