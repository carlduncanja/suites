import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Consumables, Equipment, Invoices, Quotation, Billing } from '../../OverlayPages/ChargeSheet'

const MedicalStaff = () => {
    const suitesState = useContext(SuitesContext).state
    return (
        suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Consumables' ?
            <Consumables/>
            :
            suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Equipment' ?
                <Equipment/>
                :
                suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Invoices' ?
                    <Invoices/>
                    :
                    suitesState.overlayMenu.selectedMenuItemCurrentTab === 'Quotation' ?
                        <Quotation/>
                        :
                        <Billing/>        
    );
}
 
export default MedicalStaff;

