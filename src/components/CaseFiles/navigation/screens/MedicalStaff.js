import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/MedicalStaff'
import { View, Text } from 'react-native';

const MedicalStaff = () => {
    const [state] = useContext(SuitesContext)
    const name = state.overlayMenu.selectedMenuItemCurrentTab
    const selected = state.selectedListItem.selectedListObject.caseFileDetails
    const details = selected.medicalStaff
    return (
        name === 'Details' ?
            <Details tabDetails = {details}/>
            :
            <Details tabDetails = {details}/>        
    );
}
 
export default MedicalStaff;

