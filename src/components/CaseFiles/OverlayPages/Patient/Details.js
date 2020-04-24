import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import BMIConverter from '../../BMIConverter'; 
import moment from 'moment';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../../../../components/common/Information Record/RecordStyles';
import { withModal } from 'react-native-modalfy';
import PatientBMIChart from '../../PatientBMIChart';
import { formatDate } from '../../../../utils/formatter';

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

    const checkData = (data) => {
        return data ? data : "--"
    }

    const DemographicData = () =>{
        let nextVisit = tabDetails.nextVisit
        let pateintDetails = tabDetails.caseFileDetails.patient
        const demoObject = Object.assign({},pateintDetails)
        delete demoObject.contactInfo
        delete demoObject.insurance
        delete demoObject.emergencyContacts
        delete demoObject.addresses

        const getAge = (dateObject) =>{
            let today = new Date()
            let age = today.getFullYear() - dateObject.getFullYear()
            let month = today.getMonth() - dateObject.getMonth()
            if (month < 0 || (month === 0 && today.getDate() < dateObject.getDate())){
                age --
            }
            return age
        }

        let dateOfBirth = `${formatDate(demoObject.dob,"D/MM/YYYY")} (${getAge(demoObject.dob)})`

        return(
            <View style={{}}>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"First Name"}
                            recordValue={checkData(demoObject.firstName)}
                        />
                    </View>
                    <View style = {styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Middle Name"}
                            recordValue={checkData(demoObject.middleName)}
                        />
                    </View>
                    <View style = {styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Surname"}
                            recordValue={checkData(demoObject.lastName)}
                        />
                    </View>
                    
                    
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Height"}
                            recordValue={checkData(demoObject.height)}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Weight"}
                            recordValue={checkData(demoObject.weight)}
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.rowItem} 
                        activeOpactiy = {1}
                        onPress = {()=>handleBMIPress(demoObject.bmi)}
                    >
                        <BMIConverter
                            recordTitle={"BMI"}
                            bmiValue={demoObject.bmi}
                            bmiScale = {bmiScale}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Date of Birth"}
                            recordValue={checkData(dateOfBirth)}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"TRN"}
                            recordValue={checkData(seperateNumber(demoObject.trn))}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Gender"}
                            recordValue={checkData(demoObject.Gender)}
                        />
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowItem}>
                        <PersonalRecord
                            recordTitle={"Ethnicity"}
                            recordValue={checkData(demoObject.ethnicity)}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord 
                            recordTitle={"Blood Type"}
                            recordValue={checkData(demoObject.BloodType)}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <PersonalRecord 
                            recordTitle={"Next Visit"}
                            recordValue={checkData(nextVisit)}
                        />
                    </View>
                    
                </View>
            </View>
        )
    }

    const ContactData = () => {
        const contactInfo = tabDetails.caseFileDetails.patient.contactInfo
        const addressInfo = tabDetails.caseFileDetails.patient.addresses

        return(
            <View>
                {contactInfo.map((contact,index)=>{
                    return(
                    <View key={index}>
                        {contact.phones.map((phone,index)=>{
                            return (
                            <View style={styles.rowContainer} key={index}>
                                <View style={styles.rowItem}>
                                    <ContactRecord
                                        recordTitle = "Cell Phone"
                                        recordValue = {checkData(seperateNumber(phone.cellNumber))}
                                    />
                                </View>
                                <View style={styles.rowItem}>
                                    <ContactRecord
                                        recordTitle = "Home Phone Number"
                                        recordValue = {checkData(seperateNumber(phone.homeNumber))}
                                    />
                                </View>
                                <View style={styles.rowItem}>
                                    <ContactRecord
                                        recordTitle = "Work Phone"
                                        recordValue = {checkData(seperateNumber(phone.workNumber))}
                                    />
                                </View>
                            </View>
                        )})}
                        {contact.emails.map((email,index)=>{
                            return (
                            <View style={styles.rowContainer} key={index}>
                                <View style={styles.rowItem}>
                                    <ContactRecord
                                        recordTitle = "Primary Email"
                                        recordValue = {checkData(email.primary)}
                                    />
                                </View>
                                <View style={styles.rowItem}>
                                    <ContactRecord
                                        recordTitle = "Alternate Email"
                                        recordValue = {checkData(email.alternate)}
                                    />
                                </View>
                                <View style={styles.rowItem}>
                                    <ContactRecord
                                        recordTitle = "Work Email"
                                        recordValue = {checkData(email.work)}
                                    />
                                </View>
                            </View>
                        )})}
                    </View>

                )})}
                
                {addressInfo.map((address,index)=>{
                    return (
                        <View style={styles.rowContainer} key={index}>
                            <View style={{flex:1,}}>
                                <ContactRecord
                                    recordTitle = "Address 1"
                                    recordValue = {checkData(address.addressLine1)}
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <PersonalRecord
                                    recordTitle = "Address 2"
                                    recordValue = {checkData(address.addressLine2)}
                                />
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    const EmergencyData = () => {
        const emergencyInfo = tabDetails.caseFileDetails.patient.emergencyContacts
        const contactName = (name, relationship) =>{
            return `${name} (${relationship})`
        }
        return(
            <View>
                {emergencyInfo.map((contact,index)=>{
                    return (
                        <View style={styles.rowContainer} key={index}>
                            <View style={styles.rowItem}>
                                <PersonalRecord
                                    recordTitle = "Emergency Contact Name"
                                    recordValue = {checkData(contactName(contact.name, contact.relationship))}
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <ContactRecord
                                    recordTitle = "Emergency Contact Phone"
                                    recordValue = {checkData(seperateNumber(contact.phone))}
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <ContactRecord
                                    recordTitle = "Emergency Contact Email"
                                    recordValue = {checkData(contact.emails)}
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