import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/MedicalStaff'
import { View, Text } from 'react-native';

const MedicalStaff = () => {
    const [state] = useContext(SuitesContext)
    return (
        state.overlayMenu.selectedMenuItemCurrentTab === 'Details' ?
            <Details/>
            :
            <Details/>        
    );
}
 
export default MedicalStaff;

