import React, { useState } from 'react';
import {View, StyleSheet, Text} from "react-native";
import PropTypes from 'prop-types';
import Table from "../common/Table/Table";
import {formatDate} from "../../utils/formatter";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Footer from '../common/Page/Footer';
import Item from '../common/Table/Item';
import DataItem from '../common/List/DataItem';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import {LONG_PRESS_TIMER} from '../../const';
import { useModal } from 'react-native-modalfy';
import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";
import ConfirmationComponent from '../ConfirmationComponent';
import { removeTransferItem, updateTransferState } from '../../api/network';
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import { forEach } from 'lodash';
import ContentDataItem from '../common/List/ContentDataItem';

 
const PendingTransferHeadings = [
    {
        name: 'Transfer',
        alignment: 'flex-start',
        flex : 1.5,
        
    },
    {
        name: 'Product',
        alignment: 'flex-start',
    },
    {
        name: 'Date',
        alignment: 'flex-start',
    },
    {
        name: 'Quantity',
        alignment: 'center',
    }
];

const CompletedTransferHeadings = [
    {
        name: 'Transfer',
        alignment: 'flex-start',
        flex:2,
    },
    {
        name: 'Date',
        alignment: 'flex-start',
    },
    {
        name: 'Product',
        alignment: 'flex-start',
    }
];

const SectionContainer = styled.View`
    display : flex;
    margin-bottom : ${ ({theme}) => theme.space['--space-40']};
`;

const SectionText = styled.Text( ({theme}) => ({
    ...theme.font['--text-xl-medium'],
    color : theme.colors['--color-gray-800'],
    marginBottom : 24,
}));  

const TRANSFER_STATE = {
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    ERROR: 'error'
};

function TransfersOverlayTab({transferItems = [], groupId, variantId, onUpdateItem, actionsTitle = 'SUPPLIERS ACTIONS'}) {

    const theme = useTheme();
    const modal = useModal();

    const [pendingCheckedItems, setPendingCheckedItems] = useState([]);
    const [isFloatingDisabled, setFloatingAction] = useState(false);

    const pendingItems = transferItems.filter(item => item?.state === 'pending');
    const completedItems = transferItems.filter( item => item?.state === 'completed');

    const onItemCheckbox = (item) => {
        const {_id} = item;
        const updatedCheckedList = checkboxItemPress(_id,pendingCheckedItems);
        setPendingCheckedItems(updatedCheckedList);
    }

    const toggleHeaderCheckbox = () =>{
        let updatedCheckedList = selectAll(transferItems, pendingCheckedItems);
        setPendingCheckedItems(updatedCheckedList);
    }

    const toggleActionButton = () => {
        setFloatingAction(true)

        modal.openModal("ActionContainerModal",
            {
                actions: floatingActions(),
                title: {actionsTitle},
                onClose: () => {
                    setFloatingAction(false)
                },
            })
    }

    const floatingActions = () =>{
        let isDisabled = pendingCheckedItems.length === 0 ? true : false;
        let isDisabledColor = pendingCheckedItems.length === 0 ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']
        
        const acceptTransfer = 
            <ActionItem
                title={"Accept Transfer"}
                icon={<AddIcon strokeColor = {isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-600'] } />}
                onPress={handleAcceptTransfer}
                disabled = {isDisabled}
                touchable = {true}
            />

        const deleteItem =
            <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={onCancelItems}
                isDisabled = {isDisabled}
            >
                <ActionItem
                    title={"Hold to Cancel"}
                    icon={<WasteIcon strokeColor = {isDisabledColor}/>}
                    onPress={()=>{}}
                    disabled = {isDisabled}
                    touchable={false}
                />
            </LongPressWithFeedback>;

        return <ActionContainer
            floatingActions={[
                deleteItem,
                acceptTransfer
            ]}
            title={actionsTitle}
        />
    }

    const updateTransferStatus = transferId => {
        const newState = { state: 'completed'};
        updateTransferState(groupId, variantId, transferId, newState)
            .then(_ => {
                modal.closeAllModals();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                                setPendingCheckedItems([]);
                            }}
                        />,
                        onClose: () => { modal.closeModals('ConfirmationModal'); }
                    }
                );
            })
            .catch(_ => {
                modal.closeAllModals();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={true}
                            onCancel={() => { modal.closeAllModals(); }}
                            onAction={() => { modal.closeAllModals(); }}
                            message="There was an issue performing this action"
                        />,
                        onClose: () => { modal.closeModals('ConfirmationModal'); }
                    }
                );
            })
            .finally(_ => onUpdateItem());
    };

    const handleAcceptTransfer = () =>{
        if (pendingCheckedItems.length === 1) {
            // console.log("Hello");
            modal.closeAllModals();
            setTimeout(() => {
                modal.openModal('ConfirmationModal', {

                    content: <ConfirmationComponent
                        isEditUpdate={true}
                        isError={false}
                        onCancel={() => modal.closeAllModals()}
                        onAction={() => {
                            modal.closeAllModals();
                            updateTransferStatus(pendingCheckedItems[0]);
                        }}
                        message="Do you want to save your changes ?"
                    />,
                    onClose: () => { modal.closeModals('ConfirmationModal'); } 
                });
            }, 200);
        }
    };

    const onCancelItems = () =>{
        if(pendingCheckedItems.length === 1){
            modal.closeAllModals();
            modal.openModal('ConfirmationModal',{

                content: <ConfirmationComponent
                    isEditUpdate = {true}
                    isError = {false}
                    onCancel = {()=> modal.closeAllModals()}
                    onAction = {()=> {
                        modal.closeAllModals();
                        removeItems(pendingCheckedItems[0])
                    }}
                    message = "Do you wish to delete these item(s)?"
                />
                ,
                onClose: () => {modal.closeModals('ConfirmationModal')} 
            })
        }
        // console.log("Checked items: ", pendingCheckedItems);
    }

    const removeItems = (transferId) => {
        console.log("Transfer id: ", transferId);
        console.log("Group id: ", groupId);
        console.log("Variant:", variantId);
        removeTransferItem(groupId, variantId, transferId)
            .then(_=>{
                modal.closeAllModals();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {false}
                            isError = {false}
                            onCancel = {()=> modal.closeAllModals()}
                            onAction = {()=> {
                                modal.closeAllModals();
                                setPendingCheckedItems([]);
                            }}
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })
            })
            .catch(_=>{
                modal.closeAllModals();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {false}
                            isError = {true}
                            onCancel = {()=> {modal.closeAllModals(); }}
                            onAction = {()=> {modal.closeAllModals(); }}
                            message = "There was an issue performing this action"
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })
            })
            .finally(_=>{
                onUpdateItem()
            })
    }

    const completedTransferListItem = ({from, to, product, amount, dateCompleted = "", updatedAt = ""}) => {
        const { inventoryName = "", locationName = "" } = from;
        return (
        <>
            <ContentDataItem
                flex = {2}
                content = {
                    <View style={{flexDirection : 'row', justifyContent: 'space-between',}}>
                        <View style={[styles.highlighted,{paddingRight:50, width : 150, }]}><Text style={[styles.itemText, styles.linkText]} numberOfLines={1}>{locationName}</Text></View>
                        <ArrowRightIcon/>
                        <View style={[styles.highlighted,{paddingLeft:20, }]}><Text style={[styles.itemText, styles.linkText]}>{to?.locationName}</Text></View>
                    </View>
                }
            />

            <DataItem  fontStyle = "--text-base-regular" color = "--color-gray-800" text = {formatDate(updatedAt, "DD/MM/YYYY")}/>
            <DataItem  fontStyle = "--text-base-regular" color = "--color-gray-800" text = {`${inventoryName} (${amount})`}/>
        </>)
    };

    const pendingTransferListItem = ({from, to, product, amount, dateGenerated, inventoryLocation}) => {
        const { inventoryName = "", locationName = "" } = from;
        return (
        <>
            <DataItem  flex = {1.5} fontStyle = "--text-base-medium" color = "--color-blue-600" text = {to?.locationName}/>
            <DataItem  fontStyle = "--text-base-regular" color = "--color-gray-800" text = {inventoryName}/>
            <DataItem  fontStyle = "--text-base-regular" color = "--color-gray-800" text = {formatDate(dateGenerated, "DD/MM/YYYY")}/>
            <DataItem align = "center" fontStyle = "--text-base-medium" color = "--color-green-600" text = {`+ ${amount}`}/>
        </>)
    };

    const renderCompleteItem = (item) => {
        return <Item
            itemView = {completedTransferListItem(item)}
            hasCheckBox = {false}
            onItemPress = {()=>{}}
        />
        
    };

    const renderPendingItem = (item) => {
        const { _id = "" } = item;
        console.log("Transfer pending: ", item, groupId, variantId);
        return <Item
            itemView = {pendingTransferListItem(item)}
            hasCheckBox = {true}
            isChecked = {pendingCheckedItems.includes(_id)}
            onCheckBoxPress = {()=>onItemCheckbox(item)}
            onItemPress = {()=>{}}
        />
        
    };


    return (
        <>
            <SectionContainer>
                <SectionText>Pending</SectionText>
                <Table
                    data={pendingItems}
                    listItemFormat={renderPendingItem}
                    headers={PendingTransferHeadings}
                    isCheckbox={true}      
                    toggleHeaderCheckbox = {toggleHeaderCheckbox}   
                    itemSelected = {pendingCheckedItems}           
                />
            </SectionContainer>

            <SectionContainer
                style = {css`margin-bottom : 0;`}
            >
                <SectionText>Completed</SectionText>
                <Table
                    data={completedItems}
                    listItemFormat={renderCompleteItem}
                    headers={CompletedTransferHeadings}
                    isCheckbox={false}
                />
            </SectionContainer>

            <Footer
                hasPaginator = {false}
                hasActionButton = {true}
                hasActions = {true}
                toggleActionButton = {toggleActionButton}
            />
        </>

        // <View style={styles.container}>
        //     {/*PENDING*/}
        //     <View style={styles.sectionContainer}>
        //         <Text style={styles.sectionHeading}>Pending</Text>

        //         <Table
        //             data={transferItems}
        //             listItemFormat={renderPendingItem}
        //             headers={PendingTransferHeadings}
        //             isCheckbox={false}
        //         />

        //     </View>

        //     {/*COMPLETED*/}
        //     <View style={styles.sectionContainer}>
        //         <Text style={styles.sectionHeading}>Completed</Text>

        //         <Table
        //             data={transferItems}
        //             listItemFormat={renderCompleteItem}
        //             headers={CompletedTransferHeadings}
        //             isCheckbox={false}
        //         />

        //     </View>

        // </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 32
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 16,
        color: "#4E5664",
    },
    linkText: {
        color: "#3182CE",
    },
    sectionHeading: {
        color: '#323843',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 24,
    },
    sectionContainer: {
        marginBottom: 40
    }

});

TransfersOverlayTab.propTypes = {};
TransfersOverlayTab.defaultProps = {};

export default TransfersOverlayTab;
