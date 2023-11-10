import React,{  } from "react";
import { View, Text } from 'react-native';
import ColumnSection from './ColumnSection';
import Record from './Information Record/Record';
import TouchableRecord from './Information Record/TouchableRecord';

const EmergencyContact = ({contacts}) => {
    const emergencyContacts = []
    contacts.map( contact =>{
        const name = <Record
            recordTitle = "Emergency Contact Name"
            recordValue = {contact.name}
        />
        const number = <TouchableRecord
            recordTitle = "Emergency Contact Number"
            recordValue = {contact.number}
            handleRecordPress = {contact.handlePress}
        />
        const email = <TouchableRecord
            recordTitle = "Emergency Contact Email"
            recordValue = {contact.number}
            handleRecordPress = {contact.handlePress}
        />

       emergencyContacts.push([name, number, email])
        
    })

    return (
        emergencyContacts.map( contact => {
            return (
                <ColumnSection
                    data = {contact}
                    numOfColumns = {3}
                />
            )
        })
    )

}

export default EmergencyContact