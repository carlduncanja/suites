import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {PageContext} from '../../../../contexts/PageContext';
import PostEditView from '../../OverlayPages/ChargeSheet/PostEditView';
import moment from "moment";
import jwtDecode from 'jwt-decode'
import {ROLES} from "../../../../const";

const LINE_ITEM_TYPES = {
    DISCOUNT: 'discount',
    SERVICE: 'service',
    PROCEDURES: 'procedures',
    PHYSICIANS: 'physician',
};

export const CHARGE_SHEET_STATUSES = {
    /**
     * Initial State of charge sheet. In this state the change sheet can be edited.
     */
    OPEN: "open",

    /**
     * At this state the charge sheet can no longer be adjusted.
     */
    CLOSED: "closed",

    /**
     * Charge Sheet has changes that needs to be committed by an admin.
     */
    PENDING_CHANGES: "pending_changes"
}

const headers = [
    {
        name: 'Item Name',
        alignment: 'flex-start',
        hasSort: true

    },
    {
        name: 'Type',
        alignment: 'center',
        hasSort: true

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

const ChargeSheet = ({
                         auth = {},
                         chargeSheet = {},
                         selectedTab,
                         procedures,
                         quotations,
                         invoices,
                         onUpdateChargeSheet,
                         handleEditDone,
                         handleQuotes,
                         handleInvoices,
                         onSelectEquipments,
                         onSelectConsumables,
                         onSelectVariants,
                         onSelectEquipmenntsVariants,
                         variantsConsumables = [],
                         selectedConsumables = [],
                         selectedEquipments = [],
                        variantsEquipments = []
                     }) => {

    let {
        inventoryList = [],
        equipmentList = [],
        proceduresBillableItems = [],
        proceduresBillableItemsChanges = [],
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

    const {expoPushToken, userToken} = auth;
    let authInfo = {}
    try {
        authInfo = jwtDecode(userToken);
    } catch (e) {
        console.log("failed to decode token", e);
    }

    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    // preparing billing information
    const billing = configureBillableItems(chargeSheet.updatedAt, total, chargeSheet.updatedBy, procedures, proceduresBillableItems);

    // --------------------------- States

    const [caseProcedures, setCaseProcedure] = useState([]);
    const [isUpdated, setUpdated] = useState(false);


    // --------------------------- Life Cycle

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            onUpdateChargeSheet(caseProcedures);
            setUpdated(false);
        }
    }, [isEditMode]);

    useEffect(() => {
        // preparing billing information
        const billing = configureBillableItems(chargeSheet.updatedAt, total, chargeSheet.updatedBy, procedures, proceduresBillableItems);
        setCaseProcedure(billing.procedures)
    }, [chargeSheet])

    useEffect(() => {
        const isPending = chargeSheet.status === CHARGE_SHEET_STATUSES.PENDING_CHANGES;
        if (!isPending) return;

        const isAdmin = authInfo['role_name'] === ROLES.ADMIN
        const isOwner = chargeSheet.updatedBy?._id === authInfo['user_id'];

        const isReview = isAdmin;
        const locked = !isAdmin && !isOwner

        const pageState = {
            ...pageState,
            isReview,
            locked,
            editMsg: isReview ? "now in edit mode (please review changes)" : undefined
        };

        setPageState(pageState)

        return () => {
            setPageState({
                ...pageState,
                isReview: false,
                locked: false,
            })
        }
    }, [])

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
        const updatedCaseProcedures = [...caseProcedures];
        if (updatedCaseProcedures[index]) {
            updatedCaseProcedures[index].equipments = procedureEquipments;
            setCaseProcedure(updatedCaseProcedures);
            setUpdated(true);
        }
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

    switch (selectedTab) {
        case 'Consumables':
            const {status, updatedBy = {}, updatedAt} = chargeSheet;

            const isAdmin = authInfo['role_name'] === ROLES.ADMIN
            const isOwner = updatedBy?._id === authInfo['user_id'];

            if (status === CHARGE_SHEET_STATUSES.PENDING_CHANGES && (isAdmin || isOwner)) {

                const firstName = updatedBy['first_name'] || "";
                const lastName = updatedBy['last_name'];

                const bannerText = isAdmin ? `${firstName[0]}.${lastName} changes require your attention` : undefined

                const billingUpdates = configureBillableItems(null, 0, null, procedures, proceduresBillableItemsChanges);
                const caseProcedureChanges = calculateChangesProcedureChanges(caseProcedures, billingUpdates.procedures)

                return <PostEditView
                    headers={headers}
                    lastEdited={updatedAt}
                    allItems={inventoryList}
                    consumables={consumables}
                    caseProceduresFilters={consumableProcedures}
                    caseProcedures={caseProcedures}
                    caseProcedureChanges={caseProcedureChanges}
                    onConsumablesUpdate={handleConsumableUpdate}
                    isEditMode={isEditMode}
                    bannerText={bannerText}
                    handleEditDone={handleEditDone}
                />
            } else {
                return <Consumables
                    headers={headers}
                    allItems={equipmentList}
                    equipments={procedureEquipments}
                    caseProceduresFilters={consumableProcedures}
                    caseProcedures={caseProcedures}
                    onConsumablesUpdate={handleConsumableUpdate}
                    isEditMode={isEditMode}
                    handleEditDone={handleEditDone}
                    onSelectConsumables = {onSelectConsumables}
                    selectedConsumables = {selectedConsumables}
                    variantsConsumables = {variantsConsumables}
                    onSelectVariants = {onSelectVariants}
                />
                
            }

            return

        case 'Equipment':
            return <ChargesheetEquipment
                headers={headers}
                allItems={equipmentList}
                equipments={procedureEquipments}
                caseProcedures={caseProcedures}
                caseProceduresFilters={consumableProcedures}
                onEquipmentsUpdate={handleEquipmentUpdate}
                onSelectEquipments={onSelectEquipments}
                onSelectEquipmenntsVariants = {onSelectEquipmenntsVariants}
                // details={billing.procedures}
                isEditMode={isEditMode}
                handleEditDone={handleEditDone}
                selectedEquipments = {selectedEquipments}
                variantsEquipments = {variantsEquipments}
            />;
        case 'Invoices':
            return <Invoices
                tabDetails={invoices}
                reportDetails={billing}
                handleInvoices={handleInvoices}
            />;
        case 'Quotation':
            return <Quotation
                tabDetails={quotations}
                reportDetails={billing}
                handleQuotes={handleQuotes}
            />;
        case 'Billing':
            return <BillingCaseCard
                tabDetails={billing}
                caseProcedures={caseProcedures}
                isEditMode={isEditMode}
                caseId={caseId}
                onCaseProcedureBillablesChange={handleCaseProcedureUpdate}
                handleEditDone={handleEditDone}
            />;
        default:
            return null;

    }
};

const mapStateToProps = state => ({ 
    isEditMode: state.casePage?.isEdit,
    pageState: state.casePage,
    auth: state.auth
});

export default connect(mapStateToProps)(ChargeSheet);

//
const configureBillableItems = (lastModified, total, updatedBy = {}, procedures, proceduresBillableItems) => {

    const billing = {
        total,
        lastModified: new moment(lastModified).toDate(),
        hasDiscount: true,
        discount: 0.15,
        updatedBy,
        procedures: []
    };


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

    return billing;
}

const calculateChangesProcedureChanges = (prvProcedures = [], newProcedures = []) => {
    const updatedProcedures = [];

    console.log('calculateChangesProcedureChanges: prv ', prvProcedures);
    console.log('calculateChangesProcedureChanges: new ', newProcedures);

    for (const newBillableItems of newProcedures) {
        const inventoryChanges = []
        const equipmentChanges = []
        const hasChange = false;
        const updatedBillableItems = {...newBillableItems};

        const {lineItems: newlineItems = [], inventories: newInventories = [], equipments: newEquipments = [], caseProcedureId} = newBillableItems;
        const prvBillableItems = prvProcedures.find(item => item.caseProcedureId === caseProcedureId) || {};
        const {inventories: prvInventories = [], equipments: prvEquipments = []} = prvBillableItems;

        // TODO check if prv and new amount diff
        // TODO only insert procedures that has changes.
        for (const newInventoryItem of newInventories) {
            const prvItem = prvInventories.find(item => item.inventory === newInventoryItem.inventory)
            let initialAmount = prvItem?.amount || 0;

            if (initialAmount === newInventoryItem?.amount) continue;

            const update = {
                ...newInventoryItem,
                initialAmount
            };

            inventoryChanges.push(update);
        }

        for (const newEquipment of newEquipments) {
            const prvItem = prvEquipments.find(item => item.equipment === newEquipment.equipment)
            let initialAmount = prvItem?.amount || 0;

            if (initialAmount === newEquipment?.amount) continue;

            const update = {
                ...newEquipment,
                initialAmount
            };

            equipmentChanges.push(update);
        }

        if (!inventoryChanges.length && !equipmentChanges.length) continue

        updatedBillableItems.inventories = inventoryChanges;
        updatedBillableItems.equipments = equipmentChanges;


        updatedProcedures.push(updatedBillableItems)
    }


    console.log('calculateChangesProcedureChanges: updates ', updatedProcedures);

    return updatedProcedures;
}
