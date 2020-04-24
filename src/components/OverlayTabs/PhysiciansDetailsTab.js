import React,{ useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import EmergencyContact from '../common/EmergencyContact';
import Contact from '../common/Contact';
import ColumnSectionsList from '../common/ColumnsSectionsList';
import Record from '../common/Information Record/Record';
import ColumnSection from "../common/ColumnSection";
import moment from "moment";
import { transformToSentence, formatDate } from '../../utils/formatter';
import ResponsiveRecord from "../common/Information Record/ResponsiveRecord";

const PhysiciansDetailsTab = ({physician}) => {
    const { 
        firstName, 
        middleName, 
        surname,
        dob, 
        gender,
        trn,
        emails,
        address,
        phones,
        emergencyContact
    } = physician

    const phoneObject = {}
    const emailObject = {}
    const addressObject = {}
    
    phones.map( phone => {
        if ( phone.type === 'cell'){
           Object.assign(phoneObject, {cell:phone.phone})
        }else if ( phone.type === 'work'){
            Object.assign(phoneObject, {work:phone.phone})
        }else if ( phone.type === 'home'){
            Object.assign(phoneObject, {home:phone.phone})
        }else {
            Object.assign(phoneObject, {})
        }

    })

    emails.map( email => {
        if ( email.type === 'primary'){
           Object.assign(emailObject, {primary:email.email})
        }else if ( email.type === 'work'){
            Object.assign(emailObject, {work:email.email})
        }else if ( email.type === 'alternate'){
            Object.assign(emailObject, {home:email.email})
        }else {
            Object.assign(emailObject, {})
        }

    })
    
    address.map( addressObj => {
        Object.assign(addressObject, {
            address1 : addressObj.line1,
            address2 : addressObj.line2 
        })
    })

    const calcAge = (dob) =>{
        return age
    }

    const demoData = [
        firstNameRecord = <Record
            recordTitle = "First Name"
            recordValue = {firstName}
        />,
        middleNameRecord = <Record
            recordTitle = {"Middle Name"}
            recordValue = {middleName}
        />,
        surnameRecord = <Record
            recordTitle = "Surname"
            recordValue = {surname}
        />,
        ageRecord = <Record
            recordTitle = "Age"
            recordValue = {20}
        />,
        genderRecord = <Record
            recordTitle = "Gender"
            recordValue = {transformToSentence(gender)}
        />,
        dobRecord = <Record
            recordTitle = "Date Of Birth"
            recordValue = {formatDate(dob,"DD/MM/YYYY") }
        />,
        trnRecord = <Record
            recordTitle = "TRN"
            recordValue = {trn}
        />
    ]

    const contactData = [
        <ResponsiveRecord
            recordTitle = "Cell"
            recordValue = {phoneObject.cell}
            handleRecordPress = {()=>{}}
        />,
        <ResponsiveRecord
            recordTitle = "Home Phone Number"
            recordValue = {phoneObject.home}
            handleRecordPress = {()=>{}}
        />,
        <ResponsiveRecord
            recordTitle = "Work Phone Number"
            recordValue = {phoneObject.work}
            handleRecordPress = {()=>{}}
        />,
        <ResponsiveRecord
            recordTitle = "Primary Email"
            recordValue = {emailObject.primary}
            handleRecordPress = {()=>{}}
        />,
        <ResponsiveRecord
            recordTitle = "Alternate Emial"
            recordValue = {emailObject.alternate}
            handleRecordPress = {()=>{}}
        />,
        <Record
            recordTitle = "Work Email"
            recordValue = {emailObject.work}
        />,
        <Record
            recordTitle = "Address 1"
            recordValue = {addressObject.address1}
        />,
        <Record
            recordTitle = "Address 2"
            recordValue = {addressObject.address2}
        />
    ]

    const emergencyContacts = emergencyContact.map((contact,index) => {
        return (
            <View key = {index}>
                <ColumnSection
                    data = {[
                        <Record
                            recordTitle = {`Emergency Name ${index + 1}`}
                            recordValue = {`${contact.name} (${contact.relation})`}
                        />,
                        <ResponsiveRecord
                            recordTitle = {`Emergency Number ${index + 1}`}
                            recordValue = {contact.phone}
                            handleRecordPress = {()=>{}}
                        />,
                        <ResponsiveRecord
                            recordTitle = {`Emergency Email ${index + 1}`}
                            recordValue = {contact.email}
                            handleRecordPress = {()=>{}}
                        />
                    ]}
                    numOfColumns = {3}
                />
            </View>
        
        )
    })

    // const contacts = [
    //     {
    //         phone : {
    //             ...phoneObject,
    //             handlePress :  () => {}
    //         },
    //         email : {
    //             ...emailObject,
    //             handlePress : () => {}
    //         },
    //         address : {
    //             ...addressObject
    //         }
    //     }
    // ]

    // const eContact = emergencyContact.map( contact => {
    //     return {
    //         name : `${contact.name} ${contact.relation}`,
    //         number : contact.phone,
    //         email : contact.email
    //     }
    // })

    // const emergencyContacts = [
        
    //     {
    //         name: "Donna Lee (Mother)",
    //         number : "876 728 8783",
    //         email : "donnalEE@gmail.com",
    //         handlePress : ()=>{}

    //     },
    //     {
    //         name: "Martin Lee (Father)",
    //         number : "876 137 9209",
    //         email : "lee_Martin@gmail.com",
    //         handlePress : () => {}
    //     }
    // ]

    const sections = [
        <ColumnSection
            data = {demoData}
            numOfColumns = {3}
        />,
        <ColumnSection
            data = {contactData}
            numOfColumns = {3}
        />,
        emergencyContacts
    ]
    return (
        <>
            <ColumnSectionsList
                sections = {sections}
            />
        </>
    )
}

export default PhysiciansDetailsTab