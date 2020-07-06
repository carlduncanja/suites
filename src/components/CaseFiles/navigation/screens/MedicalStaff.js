import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/MedicalStaff'
import { View, Text } from 'react-native';

const MedicalStaff = ({ staff, selectedTab }) => {
    
    return (
        selectedTab === 'Details' ?
            <Details tabDetails = {staff}/>
            :
            <Details tabDetails = {staff}/>        
    );
}
 
export default MedicalStaff;

