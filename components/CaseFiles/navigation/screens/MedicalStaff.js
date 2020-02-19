import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/MedicalStaff'
import { View, Text } from 'react-native';

const MedicalStaff = () => {
    const suitesState = useContext(SuitesContext).state
    return (
        suitesState.overlaySelectedMenuTab === 'Details' ?
            <Details/>
            :
            <Details/>        
    );
}
 
export default MedicalStaff;

