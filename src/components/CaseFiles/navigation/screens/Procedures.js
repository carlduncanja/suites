import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Details } from '../../OverlayPages/Procedures'

const Procedures = ({ procedures ,selectedTab }) => { 
   
    return (
        selectedTab === 'Details' ?
            <Details tabDetails = {procedures}/>
            :
            <Details tabDetails = {procedures}/>        
    );
}
 
export default Procedures;

