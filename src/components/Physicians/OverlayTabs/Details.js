import React,{ useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import EmergencyContact from '../../common/EmergencyContact';
import Contact from '../../common/Contact';
import ColumnSectionsList from '../../common/ColumnsSectionsList';
import Record from '../../common/Information Record/Record';
import ColumnSection from "../../common/ColumnSection";
import moment from "moment";

const Details = ({physician}) => {
    console.log("Details:", physician)
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
    } = physician

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
            recordValue = {gender}
        />,
        dobRecord = <Record
            recordTitle = "Date Of Birth"
            recordValue = {moment(dob).format("DD/MM/YYYY") }
        />,
        trnRecord = <Record
            recordTitle = "TRN"
            recordValue = {trn}
        />
    ]

    const contacts = [
        {
            phone : {
                cell : phones.cell,
                home : "876 343 3876",
                work : "876 876 7577",
                handlePress :  () => {}
            },
            email : {
                primary : emails.primary,
                alternate : "theDoctor@gmail.com",
                work : "medicalDoctors@gmail.com",
                handlePress : () => {}
            },
            address : {
                address1 : "29 Barbican Road, Kingston",
                address2 : "Apartment 10" 
            }
        }
    ]

    const emergencyContacts = [
        {
            name: "Donna Lee (Mother)",
            number : "876 728 8783",
            email : "donnalEE@gmail.com",
            handlePress : ()=>{}

        },
        {
            name: "Martin Lee (Father)",
            number : "876 137 9209",
            email : "lee_Martin@gmail.com",
            handlePress : () => {}
        }
    ]

    const sections = [
        <ColumnSection
            data = {demoData}
            numOfColumns = {3}
        />,
        <Contact contacts = {contacts}/>,
        <EmergencyContact contacts = {emergencyContacts}/>
    ]
    return (
        <View>
            <ColumnSectionsList
                sections = {sections}
            />
        </View>
    )
}

export default Details