import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Consumables, Equipment, Invoices, Quotation, Billing } from '../../OverlayPages/ChargeSheet'

const ChargeSheet = () => {
    const [state] = useContext(SuitesContext)
    const name = state.overlayMenu.selectedMenuItemTabs[state.overlayMenu.selectedMenuItemCurrentTab]
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

