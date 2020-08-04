import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameCheckboxItem from '../FrameItems/FrameCheckboxItem';
import moment from "moment";
import Button from '../../Buttons/Button';
import { withModal } from 'react-native-modalfy';
import { formatDate } from '../../../../utils/formatter';

const FrameProcedureContent = ({details,onOpenPickList}) => {
    // console.log("Details: ", details)
    const { appointment, procedure } = details
    const {hasRecovery} = procedure
    const recovery = {}

    const appointmentView = (appointment) => {
        const { location = {}, startTime = "", endTime = "" } = appointment
        const { name = "" } = location
        let duration = moment.duration(moment(endTime).diff(moment(startTime)))
        let hours = duration.asHours()
        if (isNaN(hours)) hours = "";

        return (
            <View>
                <FrameTableItem title = "Location" value={name}/>
                <View style={styles.dateContainer}>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "Date" value = {formatDate(appointment?.startTime,"MMM/D/YYYY")}/>
                    </View>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "" value = {formatDate(appointment?.startTime,"h:mm A")}/>
                    </View>
                    <View style={{flex:1}}>
                        <FrameTableItem title = "Duration" value = {hours}/>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <View style={{paddingBottom:10, borderBottomColor:"#CCD6E0", borderBottomWidth:1}}>
                {appointmentView(appointment)}
                <View style={styles.recovery}>
                    <FrameCheckboxItem title = "Recovery" status = {hasRecovery}/>
                </View>
                {hasRecovery && appointmentView(recovery)}
            </View>
            <View style={{alignItems:"flex-end", marginTop:10}}>
                <View style={{padding:8, borderRadius:8, backgroundColor:"#E3E8EF", height: 30}}>
                    <Button
                        backgroundColor = "#E3E8EF"
                        color = "#718096"
                        title = "View Picklist"
                        buttonPress = {()=>onOpenPickList(procedure)}
                    />
                </View>
            </View>

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
