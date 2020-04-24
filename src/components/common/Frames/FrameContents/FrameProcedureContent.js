import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameCheckboxItem from '../FrameItems/FrameCheckboxItem';
import moment from "moment";
import Button from '../../Buttons/Button';
import { withModal } from 'react-native-modalfy';
import { formatDate } from '../../../../utils/formatter';

const FrameProcedureContent = ({details,onOpenPickList}) => {

    const appointment = (appointment,location) => {
        return (
            <View>
                <FrameTableItem title = "Location" value={location.name}/>
                <View style={styles.dateContainer}>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "Date" value = {formatDate(appointment.startTime,"MMM/D/YYYY")}/>
                    </View>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "" value = {formatDate(appointment.startTime,"h:mm A")}/>
                    </View>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "Duration" value = {appointment.duration}/>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{paddingBottom:10, borderBottomColor:"#CCD6E0", borderBottomWidth:1}}>
                {appointment(details.appointment, details.location)}
                <View style={styles.recovery}>
                    <FrameCheckboxItem title = "Recovery" status = {details.hasRecovery}/>
                </View>
                {details.hasRecovery && appointment(details.recovery.appointment,details.recovery.location)}
            </View>
            <View style={{alignItems:"flex-end", marginTop:10}}>
                <View style={{padding:8, borderRadius:8, backgroundColor:"#E3E8EF"}}>
                    <Button
                        backgroundColor = "#E3E8EF"
                        color = "#718096"
                        title = "View Picklist"
                        buttonPress = {()=>onOpenPickList(details)}
                    />
                </View>
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
