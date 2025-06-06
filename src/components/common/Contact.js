import React,{  } from "react";
import { View, Text } from 'react-native';
import ColumnSection from './ColumnSection';
import Record from './Information Record/Record';
import TouchableRecord from './Information Record/TouchableRecord';

const Contact = ({contacts}) => {
    const personContacts = []
    contacts.map( contact =>{
        const cell = <TouchableRecord
            recordTitle = "Cell Phone"
            recordValue = {contact.phone.cell}
            handleRecordPress = {contact.phone.handlePress}
        />
        const home = <TouchableRecord
            recordTitle = "Home Phone Number"
            recordValue = {contact.phone.home}
            handleRecordPress = {contact.phone.handlePress}
        />
        const work = <TouchableRecord
            recordTitle = "Work Phone Number"
            recordValue = {contact.phone.work}
            handleRecordPress = {contact.phone.handlePress}
        />
        const primaryEmail = <TouchableRecord
            recordTitle = "Primary Email"
            recordValue = {contact.email.primary}
            handleRecordPress = {contact.email.handlePress}
        />
        const alternateEmail = <Record
            recordTitle = "Alternate Email"
            recordValue = {contact.email.alternate}
        />
        const workEmail = <TouchableRecord
            recordTitle = "Work Email"
            recordValue = {contact.email.work}
            handleRecordPress = {contact.email.handlePress}
        />
        const address1 = <Record
            recordTitle = "Address Line 1"
            recordValue = {contact.address.address1}
        />
        const address2= <Record
            recordTitle = "Address Line 2"
            recordValue = {contact.address.address2}
        />

        personContacts.push([
           cell,
           home,
           work,
           primaryEmail,
           alternateEmail,
           workEmail,
           address1,
           address2
        ])
        
    })

    return (
        personContacts.map( contact => {
            return (
                <ColumnSection
                    data = {contact}
                    numOfColumns = {3}
                />
            )
        })
    )

}

export default Contact