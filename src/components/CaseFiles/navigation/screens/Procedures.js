import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/Procedures'

const Procedures = ({ item,selectedTab }) => {
    const [state] = useContext(SuitesContext)
    const name = selectedTab
    const selected = item.caseFileDetails.caseProcedures
   
    return (
        name === 'Details' ?
            <Details tabDetails = {selected}/>
            :
            <Details tabDetails = {selected}/>        
    );
}
 
export default Procedures;

