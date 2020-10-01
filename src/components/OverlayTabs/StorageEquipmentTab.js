import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Equipment from '../CaseFiles/OverlayPages/ChargeSheet/Equipment';
import Table from "../common/Table/Table";
import Footer from "../common/Page/Footer";
import { currencyFormatter } from '../../utils/formatter';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import {LONG_PRESS_TIMER} from '../../const';
import { useModal } from 'react-native-modalfy';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import WasteIcon from "../../../assets/svg/wasteIcon";
import TransferIcon from "../../../assets/svg/transferIcon";
import Item from '../common/Table/Item';
import DataItem from '../common/List/DataItem';
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';



const StorageEquipmentTab = ({equipments = []}) => {
    const theme = useTheme();
    const modal = useModal();

    const headers = [
        {
            name :"Item Name",
            alignment: "flex-start"
        },
        {
            name :"Category",
            alignment: "center"
        },
        {
            name :"On-Hand",
            alignment: "center"
        },
        {
            name :"Unit Price",
            alignment: "flex-end"
        }
    ]

    const [checkedItems, setCheckedItems] = useState([]);
    const [isFloatingDisabled, setFloatingAction] = useState(false);

    const listItem = (item) =>
        <>
            <DataItem flex = {2} color = "--color-blue-600" fontStyle = "--text-base-medium" text = {item?.name}/>
            <DataItem align = "center" color = "--color-gray-600" fontStyle = "--text-base-regular" text = {item?.type}/>
            <DataItem align = "center" color = "--color-gray-600" fontStyle = "--text-base-regular" text = {item?.amount}/>
            <DataItem align = "flex-end" color = "--color-gray-600" fontStyle = "--text-base-regular" text = {item.unitPrice}/>

        </>;

    const renderListItem = (item) => {
        <Item
            itemView = {listItem(item)}
            hasCheckBox = {true}
            isChecked = {checkedItems.includes(_id)}
            onCheckBoxPress = {()=>onItemCheck(item)}
            onItemPress = {()=>{}}
        />
    }

    const handleHeaderCheckbox = () =>{
        let updatedItemsList = selectAll(consumables, checkedItems);
        setCheckedItems(updatedItemsList)
    }

    const onItemCheck = (item) =>{
        const { _id } = item;
        let updatedItems = checkboxItemPress(_id, checkedItems);
        setCheckedItems(updatedItems)

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

    const floatingActions = () =>{
        let isDisabled = checkedItems.length === 0 ? true : false;
        let isDisabledColor = checkedItems.length === 0 ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']
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
                icon={<TransferIcon strokeColor = {isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-orange-700']}/>}
                onPress={() => handleTransferItems()}
                disabled = {isDisabled}
                touchable={!isDisabled}
            />

        return <ActionContainer
            floatingActions={[
                itemTransfer
            ]}
            title={"SUPPLIER ACTIONS"}
        />
    }

    const handleTransferItems = () => {}

    return (
        <>
            <Table
                data = {equipments}
                listItemFormat = {renderListItem}
                headers = {headers}
                isCheckbox = {true}
                toggleHeaderCheckbox = {handleHeaderCheckbox}
                itemSelected = {checkedItems}
            />

            <Footer
                toggleActionButton = {toggleActionButton}
            />
        </>
        // <Equipment
        //     tabDetails = {data}
        //     headers = {headers}
        //     listItemFormat = {listItem}
        //     toggleActionButton = {toggleActionButton}
        // />
    )
}

export default StorageEquipmentTab

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
})
