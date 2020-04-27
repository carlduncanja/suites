import React,{ useContext } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Physicians, Nurses } from '../../OverlayCardFrames';
import FramStaffIcon from '../../../../../assets/svg/frameMedicalStaff';


const Details = ({tabDetails}) => {
    const getData = (data) => {
        const newArray = []
        data.map((dataItem)=>{
            let name = `${dataItem.staff.firstName} ${dataItem.staff.lastName}`
            newArray.push(name)
        })
        return newArray
    }
    let physicians = tabDetails.filter(item => item.type === "Physician")
    let nurses =  tabDetails.filter(item => item.type === "Nurse")
    return (  
        <ScrollView>
            <Physicians 
                cardInformation = {getData(physicians)}
                icon = {FramStaffIcon}
            />
            <Nurses 
                cardInformation = {getData(nurses)}
                icon = {FramStaffIcon}
            />
        </ScrollView>
       
    );
}
 
export default Details;