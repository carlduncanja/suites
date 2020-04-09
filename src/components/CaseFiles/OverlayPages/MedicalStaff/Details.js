import React,{ useContext } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Physicians, Nurses } from '../../OverlayCardFrames';

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
            <Physicians cardInformation = {getData(physicians)}/>
            <Nurses cardInformation = {getData(nurses)}/>
        </ScrollView>
       
    );
}
 
export default Details;