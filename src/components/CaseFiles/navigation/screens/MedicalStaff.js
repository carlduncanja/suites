import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/MedicalStaff'
import { View, Text } from 'react-native';

const MedicalStaff = ({ item,selectedTab }) => {
    const [state] = useContext(SuitesContext)
    const name = selectedTab
    const details = item.caseFileDetails.medicalStaff
    return (
        name === 'Details' ?
            <Details tabDetails = {details}/>
            :
            <Details tabDetails = {details}/>        
    );
}
 
export default MedicalStaff;

