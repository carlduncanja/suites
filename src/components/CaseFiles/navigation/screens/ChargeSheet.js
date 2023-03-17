import React, {useContext, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {ChargesheetEquipment, Consumables, Invoices, Quotation} from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard';
import {formatDate} from '../../../../utils/formatter';
import {PageContext} from '../../../../contexts/PageContext';
import PostEditView, {POST_EDIT_MODE} from '../../OverlayPages/ChargeSheet/PostEditView';
import moment from "moment";
import jwtDecode from 'jwt-decode'
import {LONG_PRESS_TIMER, ROLES} from "../../../../const";
import ActionItem from "../../../common/ActionItem";
import WasteIcon from "../../../../../assets/svg/wasteIcon";
import AcceptIcon from "../../../../../assets/svg/acceptIcon";
import LongPressWithFeedback from "../../../common/LongPressWithFeedback";
import AddIcon from "../../../../../assets/svg/addIcon";
import ConfirmationComponent from "../../../ConfirmationComponent";
import {useNavigation} from '@react-navigation/native'
import {useTheme} from "emotion-theming";
import {useModal} from "react-native-modalfy";
import {removeEquipment} from "../../../../api/network";
import EmptyChargeSheetComponent from "../../EmptyChargeSheetComponent";
import {FlatList, ScrollView} from "react-native";

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
    PENDING_CHANGES: "pending_changes",

    /**
     * billed
     */
    BILLED: "billed"
}

const headers = [
    {
        name: 'Item Name',
        alignment: 'flex-start',
        hasSort: true

    },
    {
        name: 'Category',
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

const ChargeSheet = React.forwardRef(({
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
                                          chargeSheetApproval,
                                          onWithdrawChanges


                                          // onSelectEquipments,
                                          // onSelectEquipmenntsVariants,
                                          //selectedConsumableCaseProcedureIds = [],
                                          //onConsumableCaseProcedureSelected = emptyFn,

                                          // variantsConsumables = [],
                                          // selectedConsumables = [],
                                          // selectedEquipments = [],
                                          // variantsEquipments = []
                                      }, ref) => {

    let {
        inventoryList = [],
        equipmentList = [],
        proceduresBillableItems = [],
        proceduresBillableItemsChanges = [],
        total = 0,
        state,
        caseId,
        status, updatedBy = {}, updatedAt
    } = chargeSheet;

    const isPending = status === CHARGE_SHEET_STATUSES.PENDING_CHANGES;


    const theme = useTheme();
    const navigation = useNavigation();
    const modal = useModal();

    const baseStateRef = useRef();

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
    const {isEditMode = false} = pageState;

    // preparing billing information
    const billing = configureBillableItems(chargeSheet.updatedAt, total, chargeSheet.updatedBy, procedures, proceduresBillableItems);

    // region--------------------------- States

    const [caseProcedures, setCaseProcedure] = useState([]);
    const [chargeSheetStatus, setChargeSheetStatus] = useState(chargeSheet.status);
    const [caseProcedureChanges, setCaseProcedureChanges] = useState([]);
    const [isUpdated, setUpdated] = useState(false);
    const [selectedCaseProcedureIds, setSelectedCaseProcedureIds] = useState([]);

    const [selectedConsumables, setSelectedConsumables] = useState([]);
    const [variantsConsumables, setVariantsConsumables] = useState([]);

    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [variantsEquipments, setVariantsEquipments] = useState([]);


    // endregion

    // --------------------------- Life Cycle

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            const isPendingState = (status === CHARGE_SHEET_STATUSES.PENDING_CHANGES)
            const update = isPendingState ? caseProcedureChanges : caseProcedures
            onUpdateChargeSheet(update);
            setUpdated(false);
        }
    }, [isEditMode]);

    useEffect(() => {
        // preparing billing information
        console.log("charge sheet prop updated", chargeSheet);

        const billing = configureBillableItems(chargeSheet.updatedAt, total, chargeSheet.updatedBy, procedures, proceduresBillableItems);
        setCaseProcedure(billing.procedures)

        const billingUpdates = configureBillableItems(null, 0, null, procedures, proceduresBillableItemsChanges);
        setCaseProcedureChanges(billingUpdates.procedures)

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

    useImperativeHandle(ref,
        () => ({
            getActions: () => {
                switch (selectedTab) {
                    case 'Consumables' :
                        return getConsumablesActions();
                    case 'Equipment' :
                        return getEquipmentActions();
                    default:
                        return [[], ''];
                }
            }
        })
    );

    // region Event Handlers

    const handleConsumableUpdate = (index, procedureInventories) => {
        const updatedCaseProcedures = [...caseProcedures];
        if (updatedCaseProcedures[index]) {
            updatedCaseProcedures[index].inventories = procedureInventories;
            setCaseProcedure(updatedCaseProcedures);
            setUpdated(true);
        }
    };

    const handlePostEditConsumableUpdate = (updatedObj, caseProcedureId) => {
        console.log('onConsumablesUpdate', updatedObj, caseProcedureId);
        const updatedCaseProcedures = [...caseProcedures];
        if (updatedCaseProcedures[index]) {
            updatedCaseProcedures[index].inventories = procedureInventories;
            setCaseProcedure(updatedCaseProcedures);
            setUpdated(true);
        }
    };

    const handleCaseProcedureChangeUpdate = (updatedItem, caseProcedureId, viewMode) => {

        const updatedBillablesItems = [...caseProcedureChanges]

        for (const index in updatedBillablesItems) {

            const isProcedureForUpdate = updatedBillablesItems[index]['caseProcedureId'] === caseProcedureId
            if (!isProcedureForUpdate) continue;

            if (POST_EDIT_MODE.CONSUMABLES === viewMode) {
                updatedBillablesItems[index].inventories = updatedBillablesItems[index].inventories.map(item => {
                    return item._id === updatedItem._id
                        ? {...item, amount: updatedItem.amount}
                        : {...item};
                });
            } else {
                updatedBillablesItems[index].equipments = updatedBillablesItems[index].equipments.map(item => {
                    return item.equipment === updatedItem.equipment
                        ? {...item, amount: updatedItem.amount}
                        : {...item};
                });
            }

            break;
        }

        setUpdated(true)
        setCaseProcedureChanges(updatedBillablesItems)
    }

    const handleEquipmentUpdate = (index, procedureEquipments) => {
        const updatedCaseProcedures = [...caseProcedures];
        if (updatedCaseProcedures[index]) {
            updatedCaseProcedures[index].equipments = procedureEquipments;
            setCaseProcedure(updatedCaseProcedures);
            setUpdated(true);
        }
    };

    const handleOnEquipmentSelected = (selectedEquipment) => {
        setSelectedEquipments(selectedEquipment)
    }

    const selectEquipmentVariants = (selectedEquipmentVariants) => {
        setVariantsEquipments(selectedEquipmentVariants)
    }

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

    const handleRevertChargeSheetChanges = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        chargeSheetApproval({approve: false});
                    }}
                    message="Are you sure you want to revert changes submitted?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    const handleAcceptChargeSheetChange = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        chargeSheetApproval({approve: true});
                    }}
                    message="Do you want to accept changes submitted?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    const handleWithdrawChargeSheetChanges = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        onWithdrawChanges();
                    }}
                    message="Are you sure you want to withdraw changes submitted?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    const onConsumableCaseProcedureSelected = (caseProcedureIds) => {
        setSelectedCaseProcedureIds(caseProcedureIds);
    }

    const openAddItem = itemToAdd => {
        const proceduresToUpdate = [...caseProcedures];
        const checkedList = itemToAdd === 'Consumables' ? selectedCaseProcedureIds : selectedEquipments;
        const filerObj = proceduresToUpdate.filter(item => item?.caseProcedureId === checkedList[0] || '')[0] || {};

        modal.closeModals('ActionContainerModal');
        navigation.navigate('AddChargeSheetItem', {
            type: itemToAdd,
            onAddItem: onAddItem(itemToAdd),
            selectedObj: filerObj
        });
    };

    const onAddItem = itemToAdd => data => {

        const isPending = status === CHARGE_SHEET_STATUSES.PENDING_CHANGES;

        const dataToAdd = data.map(item => ({
            _id: item._id,
            amount: item.amount,
            inventory: item.inventory?._id,
            equipment: item.equipment?._id,
            name: item.name,
            cost: itemToAdd === 'Consumables' ? item.unitCost : item.equipment?.unitPrice,
            type: item.inventory?.inventoryGroup?.name || ""
        }))

        const proceduresToUpdate = !isPending ? [...caseProcedures] : [...caseProcedureChanges];

        const selectedProcedureIds = itemToAdd === 'Consumables' ? selectedCaseProcedureIds : selectedEquipments;

        let procedureToUpdate = proceduresToUpdate.find(item => item?.caseProcedureId === selectedProcedureIds[0] || '');

        const updatedObj = itemToAdd === 'Consumables' ?
            {
                ...procedureToUpdate,
                inventories: [...procedureToUpdate?.inventories, ...dataToAdd]
            } :
            {
                ...procedureToUpdate,
                equipments: [...procedureToUpdate?.equipments, ...dataToAdd]
            };

        procedureToUpdate = proceduresToUpdate.map(procedure => (procedure?.caseProcedureId === selectedProcedureIds[0] ?
            {...procedure, ...updatedObj} :
            {...procedure}));


        if (itemToAdd === 'Consumables') {
            setSelectedCaseProcedureIds([])
            setSelectedConsumables([])
        } else {
            setSelectedEquipments([]);
            setVariantsEquipments([]);
        }

        if (isPending) {
            setCaseProcedureChanges(procedureToUpdate)
        } else {
            setCaseProcedure(procedureToUpdate)
        }
        setUpdated(true);
    };

    const handleRemoveConsumableItems = () => {
        const updatedCaseProcedures = [...caseProcedures];

        for (const variantsConsumable of selectedConsumables) {
            const {_parentId, variants} = variantsConsumable;

            // find the procedure
            for (const i in updatedCaseProcedures) {

                const isSelectedParent = updatedCaseProcedures[i].caseProcedureId === _parentId
                if (isSelectedParent) {
                    // find and remove the variants
                    const caseProcedureToUpdate = {...updatedCaseProcedures[i]}

                    let inventories = [...caseProcedureToUpdate.inventories]
                    inventories = inventories.filter(item => !variants.includes(item.inventory))

                    caseProcedureToUpdate.inventories = inventories;
                    updatedCaseProcedures[i] = caseProcedureToUpdate;
                }
            }
        }

        onUpdateChargeSheet(updatedCaseProcedures)
    };

    const handleRemovePendingConsumableItems = () => {
        const updatedCaseProcedures = [...caseProcedureChanges];

        for (const variantsConsumable of selectedConsumables) {
            const {_parentId, variants} = variantsConsumable;

            // find the procedure
            for (const i in updatedCaseProcedures) {

                const isSelectedParent = updatedCaseProcedures[i].caseProcedureId === _parentId
                if (isSelectedParent) {
                    // find and remove the variants
                    const caseProcedureToUpdate = {...updatedCaseProcedures[i]}

                    let inventories = [...caseProcedureToUpdate.inventories]
                    inventories = inventories.filter(item => !variants.includes(item._id))

                    caseProcedureToUpdate.inventories = inventories;
                    updatedCaseProcedures[i] = caseProcedureToUpdate;
                }
            }
        }
        onUpdateChargeSheet(updatedCaseProcedures)
    };

    const handleRemovePendingEquipmentItems = () => {
        const updatedCaseProcedures = [...caseProcedureChanges];

        for (const variantsEquipment of variantsEquipments) {
            const {_parentId, variants} = variantsEquipment;

            // find the procedure
            for (const i in updatedCaseProcedures) {

                const isSelectedParent = updatedCaseProcedures[i].caseProcedureId === _parentId
                if (isSelectedParent) {
                    // find and remove the variants
                    const caseProcedureToUpdate = {...updatedCaseProcedures[i]}

                    let equipments = [...caseProcedureToUpdate.equipments]
                    equipments = equipments.filter(item => !variants.includes(item.equipment))

                    caseProcedureToUpdate.equipments = equipments;
                    updatedCaseProcedures[i] = caseProcedureToUpdate;
                }
            }
        }
        onUpdateChargeSheet(updatedCaseProcedures)
    };


    const handleRemoveEquipmentItems = () => {
        const updatedCaseProcedures = [...caseProcedures];

        for (const variantEquipment of variantsEquipments) {
            const {_parentId, variants} = variantEquipment;

            // find the procedure
            for (const i in updatedCaseProcedures) {

                const isSelectedParent = updatedCaseProcedures[i].caseProcedureId === _parentId
                if (isSelectedParent) {
                    // find and remove the variants
                    const caseProcedureToUpdate = {...updatedCaseProcedures[i]}

                    let equipments = [...caseProcedureToUpdate.equipments]
                    equipments = equipments.filter(item => !variants.includes(item.equipment))

                    caseProcedureToUpdate.equipments = equipments;
                    updatedCaseProcedures[i] = caseProcedureToUpdate;
                }
            }
        }
        // setCaseProcedure(updatedCaseProcedures)
        onUpdateChargeSheet(updatedCaseProcedures)
    };

    // endregion

    // --------------------------- Helper Methods

    const getConsumablesActions = () => {
        const floatingAction = [];
        let title = 'CONSUMABLE\'S ACTIONS';

        const {status} = chargeSheet;
        const isPending = status === CHARGE_SHEET_STATUSES.PENDING_CHANGES;

        if (isPending) {
            const isAdmin = authInfo.role_name === ROLES.ADMIN;
            const isOwner = chargeSheet.updatedBy?._id === authInfo.user_id;

            if (isAdmin) {
                const RevertChanges = (
                    <ActionItem
                        title="Revert Changes"
                        icon={<WasteIcon/>}
                        onPress={handleRevertChargeSheetChanges}
                    />
                );

                const AcceptChanges = (
                    <ActionItem
                        title="Accept Changes"
                        icon={<AcceptIcon/>}
                        onPress={handleAcceptChargeSheetChange}
                    />
                );
                floatingAction.push(RevertChanges, AcceptChanges);
            }

            if (isOwner) {
                const WithdrawChanges = (
                    <LongPressWithFeedback
                        pressTimer={LONG_PRESS_TIMER.MEDIUM}
                        onLongPress={handleWithdrawChargeSheetChanges}
                    >
                        <ActionItem
                            title="Hold to Withdraw"
                            icon={<WasteIcon/>}
                            onPress={() => {
                            }}
                            touchable={false}
                        />
                    </LongPressWithFeedback>
                );
                floatingAction.push(WithdrawChanges);
            }

            if (isOwner || isAdmin) {
                const isDisabled = !(selectedCaseProcedureIds.length === 1 && isEditMode)
                const addNewItem = (
                    <ActionItem
                        title="Add Consumable"
                        icon={(
                            <AddIcon
                                strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-700']}
                            />
                        )}
                        disabled={isDisabled}
                        touchable={!isDisabled}
                        onPress={() => openAddItem('Consumables')}
                    />
                );

                const isDisabledConsumables = selectedConsumables.length === 0;
                const removeLineItemAction = (
                    <LongPressWithFeedback
                        pressTimer={LONG_PRESS_TIMER.MEDIUM}
                        onLongPress={handleRemovePendingConsumableItems}
                        isDisabled={isDisabledConsumables}
                    >
                        <ActionItem
                            title="Hold to Delete"
                            icon={(
                                <WasteIcon
                                    strokeColor={isDisabledConsumables ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                                />
                            )}
                            touchable={false}
                            disabled={isDisabledConsumables}
                        />

                    </LongPressWithFeedback>
                );

                floatingAction.push(removeLineItemAction, addNewItem);

            }

        } else {
            const isDisabled = !(selectedCaseProcedureIds.length === 1 && isEditMode)

            const addNewItem = (
                <ActionItem
                    title="Add Consumables"
                    icon={(
                        <AddIcon
                            strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-700']}
                        />
                    )}
                    disabled={isDisabled}
                    touchable={!isDisabled}
                    onPress={() => openAddItem('Consumables')}
                />
            );

            const isDisabledConsumables = selectedConsumables.length === 0;
            const removeLineItemAction = (
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    onLongPress={handleRemoveConsumableItems}
                    isDisabled={isDisabledConsumables}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={(
                            <WasteIcon
                                strokeColor={isDisabledConsumables ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        touchable={false}
                        disabled={isDisabledConsumables}
                    />

                </LongPressWithFeedback>
            );
            floatingAction.push(/*addNewLineItemAction,*/ removeLineItemAction, addNewItem);
        }

        return [floatingAction, title]
    }

    const getEquipmentActions = () => {

        let title;
        let floatingAction = [];

        if (isPending) {


            if (isAdmin) {
                const RevertChanges = (
                    <ActionItem
                        title="Revert Changes"
                        icon={<WasteIcon/>}
                        onPress={handleRevertChargeSheetChanges}
                    />
                );

                const AcceptChanges = (
                    <ActionItem
                        title="Accept Changes"
                        icon={<AcceptIcon/>}
                        onPress={handleAcceptChargeSheetChange}
                    />
                );
                floatingAction.push(RevertChanges, AcceptChanges);
            }

            if (isOwner) {
                const WithdrawChanges = (
                    <LongPressWithFeedback
                        pressTimer={LONG_PRESS_TIMER.MEDIUM}
                        onLongPress={handleWithdrawChargeSheetChanges}
                    >
                        <ActionItem
                            title="Hold to Withdraw"
                            icon={<WasteIcon/>}
                            onPress={() => {
                            }}
                            touchable={false}
                        />
                    </LongPressWithFeedback>
                );
                floatingAction.push(WithdrawChanges);
            }

            if (isOwner || isAdmin) {

                const isDisabled = selectedEquipments.length !== 1;
                const addNewLineItemAction = (
                    <ActionItem
                        title="Add Equipment"
                        icon={(
                            <AddIcon
                                strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-700']}
                            />
                        )}
                        disabled={isDisabled}
                        touchable={!isDisabled}
                        onPress={() => openAddItem('Equipment')}
                    />
                );

                const isRemoveEquipmentsDisabled = !variantsEquipments.length
                const removeLineItemAction = (
                    <LongPressWithFeedback
                        pressTimer={LONG_PRESS_TIMER.MEDIUM}
                        onLongPress={handleRemovePendingEquipmentItems}
                        isDisabled={isRemoveEquipmentsDisabled}
                    >
                        <ActionItem
                            title="Hold to Delete"
                            icon={(
                                <WasteIcon
                                    strokeColor={isRemoveEquipmentsDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                                />
                            )}
                            onPress={() => {
                            }}
                            touchable={false}
                            disabled={isRemoveEquipmentsDisabled}
                        />

                    </LongPressWithFeedback>
                );
                floatingAction.push(removeLineItemAction, addNewLineItemAction);
            }
        } else {
            const isDisabled = selectedEquipments.length !== 1;
            const addNewLineItemAction = (
                <ActionItem
                    title="Add Equipment"
                    icon={(
                        <AddIcon
                            strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-700']}
                        />
                    )}
                    disabled={isDisabled}
                    touchable={!isDisabled}
                    onPress={() => openAddItem('Equipment')}
                />
            );

            const isRemoveEquipmentsDisabled = !variantsEquipments.length
            const removeLineItemAction = (
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    onLongPress={handleRemoveEquipmentItems}
                    isDisabled={isRemoveEquipmentsDisabled}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={(
                            <WasteIcon
                                strokeColor={isRemoveEquipmentsDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        onPress={() => {
                        }}
                        touchable={false}
                        disabled={isRemoveEquipmentsDisabled}
                    />

                </LongPressWithFeedback>
            );

            floatingAction.push(removeLineItemAction, addNewLineItemAction);
        }


        title = 'EQUIPMENTS ACTIONS';

        return [floatingAction, title]
    }

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
    const consumableProcedures = ['All', ...caseProcedures.map(item => item?.procedure?.name)];


    const isAdmin = authInfo['role_name'] === ROLES.ADMIN
    const isOwner = updatedBy?._id === authInfo['user_id'];
    const isClosed = status === CHARGE_SHEET_STATUSES.CLOSED;

    switch (selectedTab) {
        case 'Consumables':
            if (isClosed) return <EmptyChargeSheetComponent/>
            if (status === CHARGE_SHEET_STATUSES.PENDING_CHANGES && (isAdmin || isOwner)) {

                const firstName = updatedBy['first_name'] || "";
                const lastName = updatedBy['last_name'];

                const bannerText = isAdmin ? `${firstName[0]}.${lastName} changes require your attention` : undefined

                const procedureChangeList = calculateChangesProcedureChanges(caseProcedures, caseProcedureChanges, isEditMode)

                return<PostEditView
                    headers={headers}
                    lastEdited={updatedAt}
                    allItems={inventoryList}
                    consumables={consumables}
                    caseProceduresFilters={consumableProcedures}
                    caseProcedures={caseProcedures}
                    caseProcedureChanges={procedureChangeList}
                    selectedCaseProcedureIds={selectedCaseProcedureIds}
                    onSelectCaseProcedureId={procedureIds => {
                        setSelectedCaseProcedureIds(procedureIds)
                    }}
                    selectedLineItems={selectedConsumables}
                    onLineItemSelected={lineItems => {
                        setSelectedConsumables(lineItems);
                    }}
                    onConsumablesUpdate={handleConsumableUpdate}
                    onCaseProcedureItemUpdated={handleCaseProcedureChangeUpdate}
                    mode={POST_EDIT_MODE.CONSUMABLES}
                    isEditMode={isEditMode && (isOwner || isAdmin)}
                    bannerText={bannerText}
                    handleEditDone={handleEditDone}
                />
            } else {
                return<Consumables
                    headers={headers}
                    allItems={equipmentList}
                    equipments={procedureEquipments}
                    caseProceduresFilters={consumableProcedures}
                    caseProcedures={caseProcedures}
                    onConsumablesUpdate={handleConsumableUpdate}
                    isEditMode={isEditMode}
                    handleEditDone={handleEditDone}
                    onSelectConsumables={consumables => {
                        setSelectedConsumables(consumables);
                    }}
                    selectedConsumables={selectedConsumables}
                    selectedCaseProcedureIds={selectedCaseProcedureIds}
                    onCaseProcedureSelected={onConsumableCaseProcedureSelected}
                />
            }
        case 'Equipment':
            if (isClosed) return <EmptyChargeSheetComponent/>
            if (status === CHARGE_SHEET_STATUSES.PENDING_CHANGES && (isAdmin || isOwner)) {

                const firstName = updatedBy['first_name'] || "";
                const lastName = updatedBy['last_name'];

                const bannerText = isAdmin ? `${firstName[0]}.${lastName} changes require your attention` : undefined
                const procedureChangeList = calculateChangesProcedureChanges(caseProcedures, caseProcedureChanges, isEditMode)

                return<PostEditView
                    headers={headers}
                    lastEdited={updatedAt}
                    allItems={equipmentList}
                    consumables={procedureEquipments}
                    caseProceduresFilters={consumableProcedures}
                    caseProcedures={caseProcedures}
                    caseProcedureChanges={procedureChangeList}
                    onConsumablesUpdate={handleConsumableUpdate}
                    selectedCaseProcedureIds={selectedEquipments}
                    onSelectCaseProcedureId={procedureIds => {
                        setSelectedEquipments(procedureIds)
                    }}
                    selectedLineItems={variantsEquipments}
                    onLineItemSelected={lineItems => {
                        setVariantsEquipments(lineItems);
                    }}
                    isEditMode={isEditMode && (isOwner || isAdmin)}
                    mode={POST_EDIT_MODE.EQUIPMENTS}
                    bannerText={bannerText}
                    handleEditDone={handleEditDone}
                    onCaseProcedureItemUpdated={handleCaseProcedureChangeUpdate}
                />

            } else {
                return <ChargesheetEquipment
                    headers={headers}
                    allItems={equipmentList}
                    equipments={procedureEquipments}
                    caseProcedures={caseProcedures}
                    caseProceduresFilters={consumableProcedures}
                    onEquipmentsUpdate={handleEquipmentUpdate}
                    onSelectEquipments={handleOnEquipmentSelected}
                    onSelectEquipmenntsVariants={selectEquipmentVariants}
                    isEditMode={isEditMode}
                    handleEditDone={handleEditDone}
                    selectedEquipments={selectedEquipments}
                    variantsEquipments={variantsEquipments}
                />;

            }
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
            const { amountPaid=0, total=0, lineItems=[], amountDue } = chargeSheet;
            const paymentDetails = { amountPaid, total, lineItems, amountDue };

            if (isClosed) return <EmptyChargeSheetComponent/>;
            return <BillingCaseCard
                tabDetails={billing}
                caseProcedures={caseProcedures}
                isEditMode={isEditMode}
                caseId={caseId}
                paymentDetails={paymentDetails}
                onCaseProcedureBillablesChange={handleCaseProcedureUpdate}
                handleEditDone={handleEditDone}
            />;
        default:
            return null;
    }


});

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null, null, {forwardRef: true})(ChargeSheet);

//
const configureBillableItems = (lastModified, total, updatedBy = {}, procedures = [], proceduresBillableItems = []) => {

    const billing = {
        total,
        lastModified: new moment(lastModified).toDate(),
        hasDiscount: false,
        discount: 0,
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

        billingItem.lineItems = lineItems;

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

const calculateChangesProcedureChanges = (prvProcedures = [], newProcedures = [], isEditMode = false) => {
    const updatedProcedures = [];

    // console.log('calculateChangesProcedureChanges: prv ', prvProcedures);
    // console.log('calculateChangesProcedureChanges: new ', newProcedures);

    for (const newBillableItems of newProcedures) {
        const inventoryChanges = []
        const equipmentChanges = []
        const hasChange = false;
        const updatedBillableItems = {...newBillableItems};

        const {lineItems: newlineItems = [], inventories: newInventories = [], equipments: newEquipments = [], caseProcedureId} = newBillableItems;
        const prvBillableItems = prvProcedures.find(item => item.caseProcedureId === caseProcedureId) || {};
        const {inventories: prvInventories = [], equipments: prvEquipments = []} = prvBillableItems;

        for (const newInventoryItem of newInventories) {
            const prvItem = prvInventories.find(item => item.inventory === newInventoryItem.inventory)
            let initialAmount = prvItem?.amount || 0;

            if (initialAmount === newInventoryItem?.amount && !isEditMode) continue;

            const update = {
                ...newInventoryItem,
                initialAmount
            };

            inventoryChanges.push(update);
        }

        for (const newEquipment of newEquipments) {
            const prvItem = prvEquipments.find(item => item.equipment === newEquipment.equipment)
            let initialAmount = prvItem?.amount || 0;

            if (initialAmount === newEquipment?.amount && !isEditMode) continue;

            const update = {
                ...newEquipment,
                initialAmount
            };

            equipmentChanges.push(update);
        }

        if (!inventoryChanges.length && !equipmentChanges.length) continue

        updatedBillableItems.inventories = inventoryChanges;
        updatedBillableItems.equipments = equipmentChanges;
        updatedBillableItems.lineItems = newlineItems

        updatedProcedures.push(updatedBillableItems)
    }


    // console.log('calculateChangesProcedureChanges: updates ', updatedProcedures);

    return updatedProcedures;
}
