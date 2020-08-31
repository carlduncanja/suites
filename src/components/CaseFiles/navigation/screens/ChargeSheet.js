import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {
    Consumables,
    Equipment,
    Invoices,
    Quotation,
    Billing,
    ChargesheetEquipment
} from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard';
import {currencyFormatter, formatDate} from '../../../../utils/formatter';
import CaseFiles from '../../../../../data/CaseFiles';
import IconButton from '../../../common/Buttons/IconButton';
import RightArrow from '../../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../../assets/svg/leftArrow';
import {PageContext} from '../../../../contexts/PageContext';
import PostEditView from '../../OverlayPages/ChargeSheet/PostEditView';

const invoiceTestData = CaseFiles[0].caseFileDetails.chargeSheet.invoices;
const quotationTestData = CaseFiles[0].caseFileDetails.chargeSheet.quotation;
const billingTestData = CaseFiles[0].caseFileDetails.chargeSheet.billing;

const LINE_ITEM_TYPES = {
    DISCOUNT: 'discount',
    SERVICE: 'service',
    PROCEDURES: 'procedures',
    PHYSICIANS: 'physician',
};

const headers = [
    {
        name: 'Item Name',
        alignment: 'flex-start',
        hasSort : true
        
    },
    {
        name: 'Type',
        alignment: 'center',
        hasSort : true

    },
    {
        name: 'Quantity',
        alignment: 'center',
    },
    {
        name: 'Unit Price',
        alignment: 'flex-end'
    }
];

function ChargeSheet ({chargeSheet = {}, selectedTab, procedures, quotations, invoices, onUpdateChargeSheet, handleEditDone, handleQuotes, handleInvoices}) {
    let {
        inventoryList = [],
        equipmentList = [],
        proceduresBillableItems = [],
        total = 0,
        caseId
    } = chargeSheet;

    inventoryList = inventoryList.map(item => {
        const {inventory} = item;
        const {name = '', unitCost = 1} = inventory;
        return {
            ...item,
            name,
            unitPrice: unitCost,
            type: 'Anaesthesia'
        };
    });
    equipmentList = equipmentList.map(item => {
        const {equipment} = item;
        const {name = '', unitPrice = 0, type = ''} = equipment;
        return {
            ...item,
            type,
            name,
            unitPrice
        };
    });

    const {pageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    // preparing billing information
    const billing = {
        total,
        lastModified: new Date(2019, 11, 11),
        hasDiscount: true,
        discount: 0.15,
        procedures: []
    };

    // --------------------------- States

    const [caseProcedures, setCaseProcedure] = useState(billing.procedures);
    const [isUpdated, setUpdated] = useState(false);

    for (const proceduresBillableItem of proceduresBillableItems) {
        const {lineItems = [], inventories, equipments, caseProcedureId} = proceduresBillableItem;

        const caseProcedure = procedures.find(item => item._id === proceduresBillableItem.caseProcedureId) || {};
        const caseAppointment = caseProcedure.appointment || {};

        const title = caseAppointment.title ? caseAppointment.title : '';

        const name = `${title} (${formatDate(caseAppointment.startTime, 'MMM D - h:mm a')})`;

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
        };

        for (const lineItem of lineItems) {
            switch (lineItem.type) {
            case LINE_ITEM_TYPES.PHYSICIANS:
                billingItem.physicians.push(lineItem);
                break;
            case LINE_ITEM_TYPES.SERVICE:
                billingItem.services.push(lineItem);
                break;
            case LINE_ITEM_TYPES.PROCEDURES:
                billingItem.procedures.push(lineItem);
                break;
            case LINE_ITEM_TYPES.DISCOUNT:
                billingItem.discounts.push(lineItem);
                break;
            }
        }


        billingItem.inventories = inventories.map(item => ({
            _id: item._id,
            inventory: item?.inventory?._id,
            type: item.inventory?.inventoryGroup?.name || "",
            amount: item.amount,
            name: item.inventory?.name,
            cost: item.inventory?.unitCost || 0,
        }));

        billingItem.equipments = equipments.map(item => ({
            _id: item?._id,
            equipment: item.equipment?._id,
            amount: item.amount,
            name: item.equipment?.name,
            cost: item.equipment?.unitPrice || 0,
        }));

        billing.procedures.push(billingItem);
    }

    // --------------------------- Life Cycle

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            onUpdateChargeSheet(caseProcedures);
            setUpdated(false);
        }
    }, [isEditMode]);

    // --------------------------- Helper Methods

    const handleConsumableUpdate = (index, procedureInventories) => {
        console.log('onConsumablesUpdate', index, procedureInventories);
        const updatedCaseProcedures = [...caseProcedures];
        if (updatedCaseProcedures[index]) {
            updatedCaseProcedures[index].inventories = procedureInventories;
            setCaseProcedure(updatedCaseProcedures);
            setUpdated(true);
        }
    };

    const handleEquipmentUpdate = (index, procedureEquipments) => {
        // console.log("onConsumablesUpdate", index, procedureInventories);
        const updatedCaseProcedures = [...caseProcedures];

        //
        // if (updatedCaseProcedures[index]) {
        updatedCaseProcedures[index].equipments = procedureEquipments;
        // }

        setCaseProcedure(updatedCaseProcedures);
        setUpdated(true);
    };

    const handleLineItemsUpdate = (procedureIndex, procedureLineItem) => {
        const updatedCaseProcedures = [...caseProcedures];

        if (updatedCaseProcedures[index]) {
            updatedCaseProcedures[index].lineItems = procedureLineItem;
        }

        setCaseProcedure(updatedCaseProcedures);
        setUpdated(true);
    };

    const handleCaseProcedureUpdate = caseProcedures => {
        console.log('Procedure update: ', caseProcedures);
        setCaseProcedure(caseProcedures);
        setUpdated(true);
    };

    const groupedInventories = inventoryList.map(item => ({...item, cost: item.unitPrice}));

    const groupedEquipments = equipmentList.map(item => ({...item, cost: item.unitPrice}));

    const inventories = caseProcedures.map(({inventories}) => inventories.map(item => ({
        ...item,
        unitPrice: item.unitCost
    })));

    const equipments = caseProcedures.map(({equipments}) => equipments.map(item => ({
        ...item,
        unitPrice: item.cost
    })));

    const consumables = [groupedInventories, ...inventories];
    const procedureEquipments = [groupedEquipments, ...equipments];
    const consumableProcedures = ['All', ...caseProcedures.map(item => item.procedure.name)];

    return (
        selectedTab === 'Consumables' ? (

            <Consumables
                headers={headers}
                allItems={inventoryList}
                consumables={consumables}
                caseProceduresFilters={consumableProcedures}
                caseProcedures={caseProcedures}
                onConsumablesUpdate={handleConsumableUpdate}
                isEditMode={isEditMode}
                handleEditDone={handleEditDone}
            />

        ) :
            selectedTab === 'Equipment' ? (
                <ChargesheetEquipment
                    headers={headers}
                    allItems={equipmentList}
                    equipments={procedureEquipments}
                    caseProceduresFilters={consumableProcedures}
                    caseProcedures = {caseProcedures}
                    onEquipmentsUpdate={handleEquipmentUpdate}
                    // details={billing.procedures}
                    isEditMode={isEditMode}
                    handleEditDone={handleEditDone}
                />
            ) :
                selectedTab === 'Invoices' ? (
                    <Invoices
                        tabDetails={invoices}
                        reportDetails={billing}
                        handleInvoices={handleInvoices}
                    />
                ) :
                    selectedTab === 'Quotation' ? (
                        <Quotation
                            tabDetails={quotations}
                            reportDetails={billing}
                            handleQuotes={handleQuotes}
                        />
                    ) : (
                        <BillingCaseCard
                            tabDetails={billing}
                            caseProcedures={caseProcedures}
                            isEditMode={isEditMode}
                            caseId={caseId}
                            onCaseProcedureBillablesChange={handleCaseProcedureUpdate}
                            handleEditDone={handleEditDone}
                        />
                    )
    // <View/>
    );
};

const mapStateToProps = state => ({isEditMode: state.casePage?.isEdit});

export default connect(mapStateToProps)(ChargeSheet);

const styles = StyleSheet.create({
    item: {flex: 1, },
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
        color: '#4A5568',
    },
});
