import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/Procedures'

const Procedures = () => {
    const [state] = useContext(SuitesContext)
    const name = state.overlayMenu.selectedMenuItemCurrentTab
    const selected = state.selectedListItem.selectedListObject.caseProcedures
   
    return (
        name === 'Details' ?
            <Details tabDetails = {selected}/>
            :
            <Details tabDetails = {selected}/>        
    );
}
 
export default Procedures;

