import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/Procedures'

const Procedures = () => {
    const suitesState = useContext(SuitesContext).state
    return (
        suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Details' ?
            <Details/>
            :
            <Details/>        
    );
}
 
export default Procedures;

