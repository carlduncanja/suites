import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Consumables, Equipment, Invoices, Quotation, Billing} from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard'
import {currencyFormatter} from '../../../../utils/formatter';
import CaseFiles from '../../../../../data/CaseFiles';

const invoiceTestData = CaseFiles[0].caseFileDetails.chargeSheet.invoices
const quotationTestData = CaseFiles[0].caseFileDetails.chargeSheet.quotation
const billingTestData = CaseFiles[0].caseFileDetails.chargeSheet.billing

const ChargeSheet = ({chargeSheet = {}, selectedTab}) => {

    let {
        inventories = [],
        equipments = []
    } = chargeSheet

        inventories = inventories.map( item => {
            const { inventory } = item
            const { name = "", unitPrice = 0} = inventory
            return {
                ...item,
                name,
                unitPrice,
                type : 'Anaesthesia'
            }}
        )
        equipments = equipments.map( item => {
            const {equipment} = item
            const { type = {} } = equipment
            const { name = "", unitPrice = 0} = equipment
            return {
                ...item,
                type : type.name || "",
                name,
                unitPrice : type.unitPrice || 0
            }}
        )

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
                tabDetails={inventories}
                headers={headers}
                listItemFormat={listItem}
            />
            :
            selectedTab === 'Equipment' ?
                <Equipment
                    tabDetails={equipments}
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
                        <BillingCaseCard tabDetails={billingTestData}/>
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

