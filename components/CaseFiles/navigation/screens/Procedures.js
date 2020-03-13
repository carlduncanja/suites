import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/Procedures'

const Procedures = () => {
    const suitesState = useContext(SuitesContext).state
    const name = suitesState.overlayMenu.selectedMenuItemTabs[suitesState.overlayMenu.selectedMenuItemCurrentTab]
    return (
        name === 'Details' ?
            <Details/>
            :
            <Details/>        
    );
}
 
export default Procedures;

