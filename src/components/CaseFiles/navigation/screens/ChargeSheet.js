import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Consumables, Equipment, Invoices, Quotation, Billing} from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard'
import {currencyFormatter} from '../../../../utils/formatter';
import CaseFiles from '../../../../../data/CaseFiles';

const invoiceTestData = CaseFiles[0].caseFileDetails.chargeSheet.invoices
const quotationTestData = CaseFiles[0].caseFileDetails.chargeSheet.quotation
const billingTestData = CaseFiles[0].caseFileDetails.chargeSheet.billing

//     billing:{
//         lastModified : new Date(2019,11,11),
//         total : 104002.25,
//         hasDiscount : true,
//         discount : 0.15,
//         procedures : [
//         {
//             procedure: {
//                 name : 'Coronary Bypass Graft',
//                 cost : 48000.00
//             },
//             physicians : [
//                 {
//                     name : 'Dr. Mansingh',
//                     cost : 64000.89
//                 },
//                 {
//                     name : 'Dr. Brown',
//                     cost : 50000.89
//                 }
//             ],
//             equipments : [
//                 {
//                     name : 'Blood Glasses',
//                     amount : 2,
//                     unitPrice : 16000.45
//                 },
//                 {
//                     name : 'Stethoscope 4',
//                     amount : 3,
//                     unitPrice : 15000.50
//                 }
//             ],
//             inventories : [
//                 {
//                     name : 'Agents',
//                     amount : 15,
//                     unitPrice : 5000.62
//                 },
//                 {
//                     name : 'Atracurium',
//                     amount : 5,
//                     unitPrice : 4128.45
//                 },
//                 {
//                     name : 'GU Tower',
//                     amount : 10,
//                     cost : 5055.00
//                 },
//                 {
//                     name : 'Gauze',
//                     amount : 20,
//                     cost : 500.00
//                 }
//             ]
//         },
//         {
//             procedure: {
//                 name : 'Coronary Artery Graft',
//                 cost : 32000.45
//             },
//             physicians : [
//                 {
//                     name : 'Dr. Abraham',
//                     cost : 100500.23
//                 }
//             ],
//             equipments : [
//                 {
//                     name : 'Glasses',
//                     amount : 1,
//                     unitPrice : 16000.45
//                 },
//                 {
//                     name : 'Stethoscope 3',
//                     amount : 1,
//                     unitPrice : 15000.50
//                 }
//             ],
//             inventories : [
//                 {
//                     name : 'Agents',
//                     amount : 8,
//                     unitPrice : 5000.62
//                 },
//                 {
//                     name : 'Atracurium',
//                     amount : 5,
//                     unitPrice : 4128.45
//                 },
//                 {
//                     name : 'GU Tower',
//                     amount : 5,
//                     cost : 5055.00
//                 },
//                 {
//                     name : 'Gauze',
//                     amount : 10,
//                     cost : 500.00
//                 }
//             ]
//         }
//     ]
//
// }


const ChargeSheet = ({chargeSheet = {}, selectedTab}) => {

    const LINE_ITEM_TYPES = {
        DISCOUNT: "discount",
        SERVICE: "service",
        PROCEDURES: "procedures",
        PHYSICIANS: "physician",
    }

    let {
        inventoryList = [],
        equipmentList = [],
        proceduresBillableItems = [],
        total
    } = chargeSheet

    inventoryList = inventoryList.map(item => {
        const {inventory} = item
        const {name = "", unitPrice = 0} = inventory
        return {
            ...item,
            name,
            unitPrice,
            type: 'Anaesthesia'
        }
    })
    equipmentList = equipmentList.map(item => {
        const {equipment} = item
        const {type = {}} = equipment
        const {name = "", unitPrice = 0} = equipment
        return {
            ...item,
            type: type.name || "",
            name,
            unitPrice: type.unitPrice || 0
        }
    })

    const headers = [
        {
            name: "Item Name",
            alignment: "flex-start"
        },
        {
            name: "Type",
            alignment: "center"
        },
        {
            name: "Quantity",
            alignment: "center"
        },
        {
            name: "Unit Price",
            alignment: "flex-end"
        }
    ]

    // preparing billing information
    const billing = {
        total,
        lastModified : new Date(2019,11,11),
        hasDiscount: true,
        discount: 0.15,
        procedures: []
    }
    for (const proceduresBillableItem of proceduresBillableItems) {
        const {lineItems = [], inventories, equipments} = proceduresBillableItem;



        const billingItem = {
            discounts: [],
            physicians: [],
            services: [],
            procedures: [],
            procedure: {
                name: proceduresBillableItem.caseProcedureId,
                cost: proceduresBillableItem.total
            },
        }

        for (const lineItem of lineItems) {
            switch (lineItem.type) {
                case LINE_ITEM_TYPES.PHYSICIANS:
                    billingItem.physicians.push(lineItem)
                    break
                case LINE_ITEM_TYPES.SERVICE:
                    billingItem.services.push(lineItem)
                    break
                case LINE_ITEM_TYPES.PROCEDURES:
                    billingItem.procedures.push(lineItem)
                    break
                case LINE_ITEM_TYPES.DISCOUNT:
                    billingItem.discounts.push(lineItem)
                    break
            }
        }

        billingItem.inventories = inventories.map(item => {
            return {
                amount: item.amount,
                name: item.inventory.name,
                cost: item.unitPrice,
            }
        })

        billingItem.equipments = equipments.map(item => {
            return {
                amount: item.amount,
                name: item.equipment.type.name,
                cost: item.equipment.type.unitPrice,
            }
        })

        billing.procedures.push(billingItem)
    }

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item.amount}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-end'}]}>
            <Text style={styles.itemText}>{`$ ${currencyFormatter(item.unitPrice)}`}</Text>
        </View>

    </>

    return (
        selectedTab === 'Consumables' ?
            <Consumables
                tabDetails={inventoryList}
                headers={headers}
                listItemFormat={listItem}
            />
            :
            selectedTab === 'Equipment' ?
                <Equipment
                    tabDetails={equipmentList}
                    headers={headers}
                    listItemFormat={listItem}
                />
                :
                selectedTab === 'Invoices' ?
                    <Invoices tabDetails={invoiceTestData}/>
                    :
                    selectedTab === 'Quotation' ?
                        <Quotation tabDetails={quotationTestData}/>
                        :
                        <BillingCaseCard tabDetails={billing}/>
        // <View/>
    );
}

export default ChargeSheet;

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
})

