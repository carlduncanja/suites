import React,{useContext} from 'react';
import { SuitesContext } from '../../../../contexts/SuitesContext';
import { Consumables, Equipment, Invoices, Quotation, Billing } from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard'

const ChargeSheet = ({item, selectedTab}) => {
    const [state] = useContext(SuitesContext)
    const name = selectedTab

    const chargeSheet = item.caseFileDetails.chargeSheet
    const procedures = item.caseFileDetails.caseProcedures

    const consumables = []
    const equipments = []
    procedures.map(procedure => procedure.consumables.map(consumable => consumables.push(consumable)))
    procedures.map(procedure => procedure.equipments.map(equipment => equipments.push(equipment)))

    const quotation = chargeSheet.quotation
    const invoices = chargeSheet.invoices

    return (
        name === 'Consumables' ?
            <Consumables tabDetails = {consumables}/>
            :
            name === 'Equipment' ?
                <Equipment tabDetails = {equipments}/>
                :
                name === 'Invoices' ?
                    <Invoices tabDetails = {invoices}/>
                    :
                    name === 'Quotation' ?
                        <Quotation tabDetails = {quotation}/>
                        :
                        <BillingCaseCard tabDetails = {item.caseFileDetails}/>        
    );
}
 
export default ChargeSheet;

