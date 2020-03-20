import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/Procedures'

const Procedures = () => {
    const [state] = useContext(SuitesContext)
    const name = state.overlayMenu.selectedMenuItemTabs[state.overlayMenu.selectedMenuItemCurrentTab]
    return (
        name === 'Details' ?
            <Details/>
            :
            <Details/>        
    );
}
 
export default Procedures;

