import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import Section from '../../../common/SlideOverlay/Section'
import BMIConverter from '../../BMIConverter'; 
import moment from 'moment';
import {transformToSentence} from '../../../../hooks/useTextEditHook';
import {PersonalRecord, ContactRecord, MissingValueRecord} from '../../../../components/common/Information Record/RecordStyles';

const Details = ({tabDetails}) => {
    const [state] = useContext(SuitesContext)

    const DemographicData = () =>{
        const demoObject = Object.assign({},tabDetails)
        delete demoObject.contactInfo
        delete demoObject.insurance
        delete demoObject.emergencyContacts
        delete demoObject.addresses
        let data = demoObject

        return(
            <View>
                <View style={styles.rowContainer}>
                    <PersonalRecord
                        recordTitle={"First Name"}
                        recordValue={demoObject.firstName}
                    />
                    <PersonalRecord
                        recordTitle={"Middle Name"}
                        recordValue={demoObject.middleName}
                    />
                    <PersonalRecord
                        recordTitle={"Surname"}
                        recordValue={demoObject.lastName}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <PersonalRecord
                        recordTitle={"Height"}
                        recordValue={demoObject.height}
                    />
                    <PersonalRecord
                        recordTitle={"Weight"}
                        recordValue={demoObject.weight}
                    />
                    <BMIConverter
                        recordTitle={"BMI"}
                        bmiValue={demoObject.bmi}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <PersonalRecord
                        recordTitle={"Date of Birth"}
                        recordValue={moment(demoObject.dob).format("D/MM/YYYY")}
                    />
                    <PersonalRecord
                        recordTitle={"TRN"}
                        recordValue={demoObject.trn}
                    />
                    <PersonalRecord
                        recordTitle={"Gender"}
                        recordValue={demoObject.Gender}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <PersonalRecord
                        recordTitle={"Ethnicity"}
                        recordValue={demoObject.ethnicity}
                    />
                    <PersonalRecord 
                        recordTitle={"BloodType"}
                        recordValue={demoObject.BloodType}
                    />
                </View>
            </View>
        )
    }

    // const sections = [] 
    // Object.keys(state.slideOverlay.slideOverlayTabInfo).forEach(key=>{
    //     sections.push(state.slideOverlay.slideOverlayTabInfo[key])
    // })    

    return ( 
        <View>
            {DemographicData()}
            {/* {
                sections.map((section,index)=>{
                    return(index === sections.length-1 ?
                        <View key={index}>
                            <Section data={section}/>
                        </View>
                        :
                        <View key={index}>
                            <Section data={section}/>
                            <View style={styles.separator}/>
                        </View>
                        
                    )
                })
            } */}

        </View>
    );
}
 
export default Details;

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
        // alignItems:'flex-start', 
        justifyContent:"space-between"
    }
})