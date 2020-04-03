import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Consumables, Equipment, Invoices, Quotation, Billing } from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard'

const ChargeSheet = () => {
    const [state] = useContext(SuitesContext)
    const name = state.overlayMenu.selectedMenuItemCurrentTab
    const selectedDetails = state.selectedListItem.selectedListObject.caseFileDetails
    const chargeSheet = selectedDetails.chargeSheet

    const consumables = chargeSheet.consumables
    const equipment = chargeSheet.equipment
    const quotation = chargeSheet.quotation
    const invoices = chargeSheet.invoices
    const inventory = chargeSheet.inventory

    return (
        name === 'Consumables' ?
            <Consumables tabDetails = {consumables}/>
            :
            name === 'Equipment' ?
                <Equipment tabDetails = {equipment}/>
                :
                name === 'Invoices' ?
                    <Invoices tabDetails = {invoices}/>
                    :
                    name === 'Quotation' ?
                        <Quotation tabDetails = {quotation}/>
                        :
                        <BillingCaseCard tabDetails = {selectedDetails}/>        
    );
}
 
export default ChargeSheet;

