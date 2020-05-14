import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import BMIConverter from '../../BMIConverter'; 
import moment from 'moment';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../../../../components/common/Information Record/RecordStyles';
import ResponsiveRecord from '../../../common/Information Record/ResponsiveRecord'
import { withModal } from 'react-native-modalfy';
import PatientBMIChart from '../../PatientBMIChart';
import { formatDate, calcAge } from '../../../../utils/formatter';

let itemWidth = `${100/3}%`
const Details = ({tabDetails, modal}) => {
    const [state] = useContext(SuitesContext)

    const bmiScale = [ 
        {
            "color":"#4299E1",
            "startValue":0,
            "endValue":18.4
        },
        {
            "color":"#48BB78",
            "startValue":18.5,
            "endValue":24.9
        },
        {
            "color":"#ED8936",
            "startValue":25,
            "endValue":29.9
        },
        {
            "color":"#E53E3E",
            "startValue":30,
            "endValue":34.9
        },
        {
            "color":"#805AD5",
            "startValue":35,
            "endValue":100
        }
    ]

    const Divider = () =>{
        return(
            <View
                style = {{
                    backgroundColor:"#CCD6E0",
                    height:1,
                    borderRadius:2,
                    width:'100%',
                    marginTop:20,
                    marginBottom:20
                }}
            />
        )
    }

    const handleBMIPress = (value) => {
        modal.openModal('OverlayInfoModal',{
            overlayContent : <PatientBMIChart
                value = {value}
                bmiScale = {bmiScale}
            />
        })
    }

    const seperateNumber = (number) =>{
        return number.toString().match(/\d{1,3}/g).join(" ") 
    }

    const DemographicData = () =>{
        const {
            firstName = "",
            middleName = "",
            surName = "",
            height = 0,
            weight = 0,
            dob = "",
            trn = "",
            gender = "",
            ethnicity = "",
            bloodType = '',
            nextVisit = formatDate(new Date()) 
        } = tabDetails

        let age = calcAge(dob)
        let dateOfBirth = `${formatDate(dob,"D/MM/YYYY")} (${age})`
        let kmWeight = weight/2.205 || 0
        let metreHeight = Math.pow((height/3.281),2) || 0
        let bmi = Math.ceil(kmWeight/metreHeight) || 0

        return(
            <View style={{}}>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"First Name"}
                            recordValue={firstName}
                        />
                    </View>
                    <View style = {styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Middle Name"}
                            recordValue={middleName}
                        />
                    </View>
                    <View style = {styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Surname"}
                            recordValue={surName}
                        />
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Height"}
                            recordValue={height}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Weight"}
                            recordValue={weight}
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.rowItem} 
                        activeOpactiy = {1}
                        onPress = {()=>handleBMIPress(bmi)}
                    >
                        <BMIConverter
                            recordTitle={"BMI"}
                            bmiValue={bmi}
                            bmiScale = {bmiScale}
                        />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.rowContainer}>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Date of Birth"}
                            recordValue={dateOfBirth}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"TRN"}
                            recordValue={trn}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Gender"}
                            recordValue={gender}
                        />
                    </View>
                </View>
                
                <View style={styles.rowContainer}>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Ethnicity"}
                            recordValue={ethnicity}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord 
                            recordTitle={"Blood Type"}
                            recordValue={bloodType}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord 
                            recordTitle={"Next Visit"}
                            recordValue={nextVisit}
                        />
                    </View>
                    
                </View>
            </View>
        )
    }

    const ContactData = () => {
        const { contactInfo = {}, address=[] } = tabDetails
        const { phones = [], emails = []} = contactInfo
        const emailTypes = ['primary', 'other', 'work']
        const phoneTypes = ['cell', 'home', 'work']

        return(
            <View>

                <View style={styles.rowContainer}>
                    {
                        phoneTypes.map((item,index)=>{
                            const phoneArray = phones.filter( phone => phone.type === item)
                            phoneArray.length === 0 ? phone = "" : phone = phoneArray[0].phone

                            item === 'cell' ? title = "Cell Phone Number" :
                            item === 'home' ? title = "Home Phone Number" :
                            item === 'work' ? title = "Work Phone Number" :
                            title = "Other Phone Number"

                            return (
                                <View style={styles.rowItem} key = {index}>
                                    <ResponsiveRecord
                                        recordTitle = {title}
                                        recordValue = {phone}
                                        handleRecordPress = {()=>{}}
                                    />
                                </View>
                            )
                        })
                    }
                </View>

                <View style={styles.rowContainer}>
                    {
                        emailTypes.map((item,index)=>{
                            const emailArray = emails.filter( email => email.type === item)
                            emailArray.length === 0 ? email = "" : email = emailArray[0].email

                            item === 'primary' ? title = "Primary Email" :
                            item === 'other' ? title = "Alternate Email" :
                            item === 'work' ? title = "Work Email" :
                            title = "Other"

                            return (
                                <View style={styles.rowItem} key = {index}>
                                    <ResponsiveRecord
                                        recordTitle = {title}
                                        recordValue = {email}
                                        handleRecordPress = {()=>{}}
                                    />
                                </View>
                            )
                        })
                    }

                </View>
                
                {address.map((item,index)=>{
                    return (
                        <View style={styles.rowContainer} key={index}>
                            <View style={{flex:1,}}>
                                <ResponsiveRecord
                                    recordTitle = "Address 1"
                                    recordValue = {item.line1}
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <PersonalRecord
                                    recordTitle = "Address 2"
                                    recordValue = {item.line2}
                                />
                            </View>
                        </View>
                    )
                })}

            </View>
    
        )
    }

    const EmergencyData = () => {
        const { contactInfo = {} } = tabDetails
        const { emergencyContact = []} = contactInfo
        return(
            <View>
                {emergencyContact.map((contact,index)=>{
                    const { relation = "", email = "", phone = "", name = "Coleen Brown"} = contact
                    return (
                        <View style={styles.rowContainer} key={index}>
                            <View style={styles.rowItem}>
                                <PersonalRecord
                                    recordTitle = "Emergency Contact Name"
                                    recordValue = {`${name} (${relation})`}
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <ContactRecord
                                    recordTitle = "Emergency Contact Phone"
                                    recordValue = {phone}
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <ContactRecord
                                    recordTitle = "Emergency Contact Email"
                                    recordValue = {email}
                                />
                            </View>
                        </View>
                    )})}
            </View>
        )

    }

    return ( 
        <ScrollView>
            {DemographicData()}
            {Divider()}
            {ContactData()}
            {Divider()}
            {EmergencyData()} 
        </ScrollView>
    );
}
 
export default withModal(Details) ;

const styles= StyleSheet.create({
    separator:{
        height:1,
        backgroundColor:'#CCD6E0',
        borderRadius:2,
        marginTop:10,
        //marginBottom:10
    },
    rowContainer:{
        flex:1, 
        flexDirection:'row', 
        // backgroundColor:'green',
        marginLeft:10,
        marginRight:10, 
        marginBottom:20,
        // alignItems:'flex-start', 
        justifyContent:"space-between"
    },
    rowItem:{
        width:itemWidth
    }
})