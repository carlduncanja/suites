import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Consumables, Equipment, Invoices, Quotation, Billing } from '../../OverlayPages/ChargeSheet'

const MedicalStaff = () => {
    const suitesState = useContext(SuitesContext).state
    return (
        suitesState.overlaySelectedMenuTab === 'Consumables' ?
            <Consumables/>
            :
            suitesState.overlaySelectedMenuTab === 'Equipment' ?
                <Equipment/>
                :
                suitesState.overlaySelectedMenuTab === 'Invoices' ?
                    <Invoices/>
                    :
                    suitesState.overlaySelectedMenuTab === 'Quotation' ?
                        <Quotation/>
                        :
                        <Billing/>        
    );
}
 
export default MedicalStaff;

