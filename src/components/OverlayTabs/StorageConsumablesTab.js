import React, {useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import Consumables from '../CaseFiles/OverlayPages/ChargeSheet/Consumables';
import {currencyFormatter} from '../../utils/formatter';
import Table from "../common/Table/Table";
import Footer from "../common/Page/Footer";
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import {LONG_PRESS_TIMER} from '../../const';
import {useModal} from 'react-native-modalfy';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import WasteIcon from "../../../assets/svg/wasteIcon";
import TransferIcon from "../../../assets/svg/transferIcon";
import Item from '../common/Table/Item';
import DataItem from '../common/List/DataItem';
import TransferItemDialog from '../Inventory/TransferItemDialog';
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';


const headers = [
    {
        name: "Item Name",
        alignment: "flex-start",
        flex: 2,
    },
    {
        name: "Type",
        alignment: "flex-start",
        flex:2
    },
    {
        name: "On-Hand",
        alignment: "flex-start",
        flex:2
    },
    {
        name: "Unit Price",
        alignment: "flex-start"
    }
];


const StorageConsumablesTab = ({consumables = [], storageLocation, onUpdateItem, updateStorage}) => {

    const theme = useTheme();
    const modal = useModal();

    const amountPerPage = 10;
    // const [totalPages, setTotalPage] = useState(0)

    const [currentPage, setCurrentPage] = useState(0)
    const [checkedItems, setCheckedItems] = useState([]);
    const [isFloatingDisabled, setFloatingAction] = useState(false);


    const listItem = (item = {}) => {
        // console.log("Item: ", item);
        const {stock = 0, inventory = {}, inventoryName} = item;
        const {inventoryGroup = "", name = "", unitCost = 0} = inventory
        return (
            <>
                <DataItem flex={2} color="--color-blue-600" fontStyle="--text-base-medium" text={inventoryName}/>
                <DataItem flex={2} align="center" color="--color-gray-600" fontStyle="--text-base-regular"
                          text={inventoryGroup?.name}/>
                <DataItem flex={2} align="center" color="--color-gray-600" fontStyle="--text-base-regular" text={stock}/>
                <DataItem align="flex-end" color="--color-gray-600" fontStyle="--text-base-regular"
                          text={`$ ${currencyFormatter(unitCost)}`}/>

            </>
        )
    }


    const renderListItem = (item) => {
        const {_id} = item;
        return <Item
            itemView={listItem(item)}
            hasCheckBox={true}
            isChecked={checkedItems.includes(_id)}
            onCheckBoxPress={() => onItemCheck(item)}
            onItemPress={() => {
            }}
        />
    }


    const handleHeaderCheckbox = () => {
        let updatedItemsList = selectAll(consumables, checkedItems);
        setCheckedItems(updatedItemsList)
    }

    const onItemCheck = (item) => {
        const {_id} = item;
        let updatedItems = checkboxItemPress(_id, checkedItems);
        setCheckedItems(updatedItems);

    }

    const toggleActionButton = () => {
        setFloatingAction(true)

        modal.openModal("ActionContainerModal",
            {
                actions: floatingActions(),
                title: "SUPPLIER ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                },
            })
    }

    const floatingActions = () => {
        let isDisabled = checkedItems.length !== 1 ? true : false;
        let isDisabledColor = checkedItems.length !== 1 ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']
        // const deleteItem =
        //     <LongPressWithFeedback
        //         pressTimer={LONG_PRESS_TIMER.MEDIUM}
        //         onLongPress={onDeleteItems}
        //         isDisabled = {isDisabled}
        //     >
        //         <ActionItem
        //             title={"Hold to Delete"}
        //             icon={<WasteIcon strokeColor = {isDisabledColor}/>}
        //             onPress={()=>{}}
        //             disabled = {isDisabled}
        //             touchable={false}
        //         />
        //     </LongPressWithFeedback>;

        const itemTransfer =
            <ActionItem
                title={"Item Transfer"}
                icon={<TransferIcon
                    strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-orange-700']}/>}
                onPress={() => handleTransferItems()}
                disabled={isDisabled}
                touchable={!isDisabled}
            />

        return <ActionContainer
            floatingActions={[
                itemTransfer
            ]}
            title={"SUPPLIER ACTIONS"}
        />
    }

    const handleTransferItems = () => {
        const {_id = ""} = storageLocation;
        const filterVariant = consumables.filter(item => item?._id === checkedItems[0])[0] || {};

        // console.log("Storage location (Selected Location):", storageLocation, storageLocation._id);
        // console.log("Checked Items (Variant):", filterVariant);

        const variant = {
            _id: filterVariant?.inventory?._id || '',
            name: filterVariant?.inventoryName || '',
            groupId: filterVariant?.inventory?.inventoryGroup?._id,
        };

        const fromLocation = {
            location: filterVariant?.location || '',
            levels: filterVariant?.levels || {},
            locationName: filterVariant?.locationName || '',
            stock: filterVariant?.stock || 0
        };

        console.log("Variant: ", variant);
        console.log("Current location: ", fromLocation);

        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal(
                'OverlayModal',
                {
                    content: <TransferItemDialog
                        // onCreated={(item) => onItemPress(item)()}
                        variant={variant}
                        selectedLocation={fromLocation}
                        // groupId = {groupId}
                        onCreated={() => {
                            setFloatingAction(false);
                            onUpdateItem();
                            setCheckedItems([]);
                        }}
                        onCancel={() => setFloatingAction(false)}
                    />,
                    onClose: () => setFloatingAction(false)
                }
            );
        }, 200);
    }

    const onNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const onPreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const paginatedData = consumables.slice( (currentPage * amountPerPage), (currentPage * amountPerPage + amountPerPage) );
    const totalPages = Math.ceil(consumables.length / amountPerPage)


    return (
        <>
            <Table
                data={paginatedData}
                listItemFormat={renderListItem}
                headers={headers}
                isCheckbox={true}
                toggleHeaderCheckbox={handleHeaderCheckbox}
                itemSelected={checkedItems}
            />

            <Footer
                totalPages={totalPages}
                isNextDisabled={currentPage === (totalPages-1)}
                isPreviousDisabled={currentPage === 0}
                currentPage={currentPage + 1}
                goToNextPage={onNextPage}
                goToPreviousPage={onPreviousPage}
                hasActionButton = {updateStorage}
                toggleActionButton={toggleActionButton}
            />
        </>

    )
}

export default StorageConsumablesTab

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
});
