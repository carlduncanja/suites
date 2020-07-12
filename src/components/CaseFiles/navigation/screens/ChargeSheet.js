import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {
    Consumables,
    Equipment,
    Invoices,
    Quotation,
    Billing,
    ChargesheetEquipment
} from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard'
import {currencyFormatter, formatDate} from '../../../../utils/formatter';
import CaseFiles from '../../../../../data/CaseFiles';
import IconButton from '../../../common/Buttons/IconButton';
import RightArrow from '../../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../../assets/svg/leftArrow';


const invoiceTestData = CaseFiles[0].caseFileDetails.chargeSheet.invoices
const quotationTestData = CaseFiles[0].caseFileDetails.chargeSheet.quotation
const billingTestData = CaseFiles[0].caseFileDetails.chargeSheet.billing

const LINE_ITEM_TYPES = {
    DISCOUNT: "discount",
    SERVICE: "service",
    PROCEDURES: "procedures",
    PHYSICIANS: "physician",
}


const ChargeSheet = ({chargeSheet = {}, selectedTab, procedures, quotations, invoices, isEditMode, onUpdateChargeSheet, handleEditDone, handleQuotes}) => {


    let {
        inventoryList = [],
        equipmentList = [],
        proceduresBillableItems = [],
        total,
        caseId
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
        const {name = "", unitPrice = 0, type = ""} = equipment
        return {
            ...item,
            type,
            name,
            unitPrice
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
        lastModified: new Date(2019, 11, 11),
        hasDiscount: true,
        discount: 0.15,
        procedures: []
    }

    for (const proceduresBillableItem of proceduresBillableItems) {
        const {lineItems = [], inventories, equipments, caseProcedureId} = proceduresBillableItem;

        const caseProcedure = procedures.find(item => item._id === proceduresBillableItem.caseProcedureId) || {}
        const caseAppointment = caseProcedure.appointment

        const name = `${caseAppointment.title} (${formatDate(caseAppointment.startTime, "MMM D - h:mm a")})`


        const billingItem = {
            caseProcedureId,
            discounts: [],
            physicians: [],
            services: [],
            procedures: [],
            procedure: {
                name: name || proceduresBillableItem.caseProcedureId,
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
                _id: item._id,
                inventory: item?.inventory?._id,
                amount: item?.amount,
                name: item?.inventory?.name,
                cost: item?.inventory?.unitPrice,
            }
        })

        billingItem.equipments = equipments.map(item => {
            return {
                _id: item?._id,
                equipment: item.equipment?._id,
                amount: item.amount,
                name: item.equipment?.name,
                cost: item.equipment?.unitPrice || 3,
            }
        })

        billing.procedures.push(billingItem)
    }

    // --------------------------- Life Cycle

    useEffect(() => {

        // [HOT FIX] TODO FIND A BETTER WAY TO IMPLEMENT UPDATES
        if (isUpdated && !isEditMode) {
            onUpdateChargeSheet(caseProcedures)
            setUpdated(false);
        }

    }, [isEditMode])


    // --------------------------- States

    const [caseProcedures, setCaseProcedure] = useState(billing.procedures);
    const [isUpdated, setUpdated] = useState(false);
    //const [allConsumables, setAllConsumables] = useState([])


    // --------------------------- Helper Methods

    const handleConsumableUpdate = (index, procedureInventories) => {

        console.log("onConsumablesUpdate", index, procedureInventories);
        const updatedCaseProcedures = [...caseProcedures];

        //
        // if (updatedCaseProcedures[index]) {
        updatedCaseProcedures[index].inventories = procedureInventories
        // }

        setCaseProcedure(updatedCaseProcedures);
        setUpdated(true)
    }

    const handleEquipmentUpdate = (index, procedureEquipments) => {

        // console.log("onConsumablesUpdate", index, procedureInventories);
        const updatedCaseProcedures = [...caseProcedures];

        //
        // if (updatedCaseProcedures[index]) {
        updatedCaseProcedures[index].equipments = procedureEquipments
        // }

        setCaseProcedure(updatedCaseProcedures);
        setUpdated(true)
    }


    const handleLineItemsUpdate = (procedureIndex, procedureLineItem) => {
        const updatedCaseProcedures = [...caseProcedures];

        if (updatedCaseProcedures[index]) {
            updatedCaseProcedures[index].lineItems = procedureLineItem
        }

        setCaseProcedure(updatedCaseProcedures);
        setUpdated(true)
    }

    const handleCaseProcedureUpdate = (caseProcedures) => {
        setCaseProcedure(caseProcedures)
        setUpdated(true)
    }


    const groupedInventories = inventoryList.map(item => {
        return {...item, cost: item.unitPrice}
    })

    const groupedEquipments = equipmentList.map(item => {
        return {...item, cost: item.unitPrice}
    })

    let inventories = caseProcedures.map(({inventories}) => inventories.map(item => {
        return {
            ...item,
            unitPrice: item.cost
        }
    }))

    let equipments = caseProcedures.map(({equipments}) => equipments.map(item => {
        return {
            ...item,
            unitPrice: item.cost
        }
    }))

    const consumables = [groupedInventories, ...inventories];
    const procedureEquipments = [groupedEquipments, ...equipments]
    const consumableProcedures = ['All', ...caseProcedures.map(item => item.procedure.name)]

    return (
        selectedTab === 'Consumables'
            ? <Consumables
                headers={headers}
                allItems={inventoryList}
                consumables={consumables}
                caseProceduresFilters={consumableProcedures}
                onConsumablesUpdate={handleConsumableUpdate}
                isEditMode={isEditMode}
                handleEditDone={handleEditDone}
            />
            : selectedTab === 'Equipment' ?
            <ChargesheetEquipment
                headers={headers}
                allItems = {equipmentList}
                equipments = {procedureEquipments}
                caseProceduresFilters = {consumableProcedures}
                onEquipmentsUpdate = {handleEquipmentUpdate}
                // details={billing.procedures}
                isEditMode={isEditMode}
                handleEditDone={handleEditDone}
            />
            :
            selectedTab === 'Invoices' ?
                <Invoices
                    tabDetails={invoices}
                    reportDetails={billing}
                />
                :
                selectedTab === 'Quotation' ?
                    <Quotation
                        tabDetails={quotations}
                        reportDetails={billing}
                        handleQuotes={handleQuotes}
                    />
                    :
                    <BillingCaseCard
                        tabDetails={billing}
                        caseProcedures={caseProcedures}
                        isEditMode={isEditMode}
                        caseId={caseId}
                        onCaseProcedureBillablesChange={handleCaseProcedureUpdate}
                        handleEditDone={handleEditDone}
                    />
        // <View/>
    );
}

export default ChargeSheet;

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    editItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    editTextBox: {
        backgroundColor: '#F8FAFB',
        borderColor: '#CCD6E0',
        borderWidth: 1,
        borderRadius: 4,
        padding: 6,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: 10,
        marginRight: 10
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
})

