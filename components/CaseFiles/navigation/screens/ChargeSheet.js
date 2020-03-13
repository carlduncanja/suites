import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Consumables, Equipment, Invoices, Quotation, Billing } from '../../OverlayPages/ChargeSheet'

const ChargeSheet = () => {
    const suitesState = useContext(SuitesContext).state
    const name = suitesState.overlayMenu.selectedMenuItemTabs[suitesState.overlayMenu.selectedMenuItemCurrentTab]
    return (
        name === 'Consumables' ?
            <Consumables/>
            :
            name === 'Equipment' ?
                <Equipment/>
                :
                name === 'Invoices' ?
                    <Invoices/>
                    :
                    name === 'Quotation' ?
                        <Quotation/>
                        :
                        <Billing/>        
    );
}
 
export default ChargeSheet;

