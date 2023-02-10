import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import Table from "../common/Table/Table";
import { formatDate } from "../../utils/formatter";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Footer from '../common/Page/Footer';
import Item from '../common/Table/Item';
import DataItem from '../common/List/DataItem';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import { LONG_PRESS_TIMER } from '../../const';
import { useModal } from 'react-native-modalfy';
import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";
import ConfirmationComponent from '../ConfirmationComponent';
import { removeTransferItem, updateTransferState } from '../../api/network';
import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import { forEach } from 'lodash';
import ContentDataItem from '../common/List/ContentDataItem';


const PendingTransferHeadings = [
    {
        name: 'Transfer',
        alignment: 'flex-start',
        flex: 1.5,

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
        flex: 2,
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
    margin-bottom : ${({ theme }) => theme.space['--space-40']};
`;

const SectionText = styled.Text(({ theme }) => ({
    ...theme.font['--text-xl-medium'],
    color: theme.colors['--color-gray-800'],
    marginBottom: 24,
}));

const CompletedTransferContent = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ArrowContainer = styled.View`
    padding-right: ${({theme}) => theme.space['--space-20']};
`;

const ContentText = styled.Text(({theme}) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-blue-600'],
    flex: 1,
}));


const TRANSFER_STATE = {
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    ERROR: 'error'
};

function TransfersOverlayTab({ transferItems = [], transferObj, groupId, variantId, onUpdateItem, actionsTitle = 'SUPPLIERS ACTIONS' }) {

    const theme = useTheme();
    const modal = useModal();

    const [pendingCheckedItems, setPendingCheckedItems] = useState([]);
    const [isFloatingDisabled, setFloatingAction] = useState(false);

    // Filter transfer items based on status and from attributes.
    const pendingItems = transferItems.filter(item => item?.state === 'pending' && item.from);
    const completedItems = transferItems.filter(item => item?.state === 'completed' && item.from);

    const getInventoryIds = () => {
        const inventoryObj = pendingItems.filter(item => item._id === pendingCheckedItems[0])[0] || {};
        const inventoryId = inventoryObj?.inventoryVariantId || '';

        const locations = transferObj?.inventoryLocations || [];
        const filterLocation = locations.filter(location => location.inventory._id === inventoryId)[0] || {};
        const groupId = filterLocation.inventory.inventoryGroup._id || '';

        return { inventoryId, groupId };
    }

    const onItemCheckbox = item => {
        const { _id } = item;
        const updatedCheckedList = checkboxItemPress(_id, pendingCheckedItems);
        setPendingCheckedItems(updatedCheckedList);
    };

    const toggleHeaderCheckbox = () => {
        const updatedCheckedList = selectAll(transferItems, pendingCheckedItems);
        setPendingCheckedItems(updatedCheckedList);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);

        modal.openModal('ActionContainerModal',
            {
                actions: floatingActions(),
                title: { actionsTitle },
                onClose: () => {
                    setFloatingAction(false);
                },
            });
    };

    const floatingActions = () => {
        const isDisabled = pendingCheckedItems.length === 0 ? true : false;
        const isDisabledColor = pendingCheckedItems.length === 0 ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700'];

        const acceptTransfer = (
            <ActionItem
                title="Accept Transfer"
                icon={<AddIcon
                    strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-600']} />}
                onPress={handleAcceptTransfer}
                disabled={isDisabled}
                touchable={true}
            />
        );
        const deleteItem = (
            <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={onCancelItems}
                isDisabled={isDisabled}
            >
                <ActionItem
                    title="Hold to Cancel"
                    icon={<WasteIcon strokeColor={isDisabledColor} />}
                    onPress={() => {
                    }}
                    disabled={isDisabled}
                    touchable={false}
                />
            </LongPressWithFeedback>
        );

        return <ActionContainer
            floatingActions={[
                deleteItem,
                acceptTransfer
            ]}
            title={actionsTitle}
        />;
    };

    const updateTransferStatus = (transferId, inventoryId = variantId, inventoryGroupId = groupId) => {
        console.log("Variant id: ", inventoryId);
        console.log("Group id: ", inventoryGroupId);
        console.log("Transfer id: ", transferId);
        const newState = { state: 'completed' };
        updateTransferState(inventoryGroupId, inventoryId, transferId, newState)
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
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
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
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="There was an issue performing this action"
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .finally(_ => onUpdateItem());
    };

    const handleAcceptTransfer = () => {
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
                            if (transferObj) {
                                updateTransferStatus(pendingCheckedItems[0], getInventoryIds().inventoryId, getInventoryIds().groupId);
                            } else {
                                updateTransferStatus(pendingCheckedItems[0]);
                            }
                        }}
                        message="Do you want to save your changes ?"
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                });
            }, 200);
        }
    };

    const removeItems = (transferId, inventoryId = variantId, inventoryGroupId = groupId) => {
        removeTransferItem(inventoryGroupId, inventoryId, transferId)
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
                                onUpdateItem();
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
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
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="There was an issue performing this action"
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .finally(_ => {
                // onUpdateItem();
            });
    };

    const onCancelItems = () => {
        if (pendingCheckedItems.length === 1) {
            modal.closeAllModals();
            modal.openModal('ConfirmationModal', {

                content: <ConfirmationComponent
                    isEditUpdate={true}
                    isError={false}
                    onCancel={() => modal.closeAllModals()}
                    onAction={() => {
                        modal.closeAllModals();
                        if (transferObj) {
                            removeItems(pendingCheckedItems[0], getInventoryIds().inventoryId, getInventoryIds().groupId);
                        } else {
                            removeItems(pendingCheckedItems[0]);
                        }
                    }}
                    message="Do you wish to delete these item(s)?"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            });
        }
        // console.log("Checked items: ", pendingCheckedItems);
    };

    const completedTransferListItem = ({ from = {}, to = {}, product, amount, dateCompleted = '', updatedAt = '' }) => {
        return (from !== null || to !== null ?
            <>
                <ContentDataItem
                    flex={2}
                    content={(
                        <CompletedTransferContent>
                            <ContentText numberOfLines={1}>{from?.locationName || 'n/a'}</ContentText>
                            <ArrowContainer theme={theme}>
                                <ArrowRightIcon />
                            </ArrowContainer>
                            <ContentText numberOfLines={1}>{to?.locationName || 'n/a'}</ContentText>
                        </CompletedTransferContent>
                        // <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        //     <View style={[styles.highlighted, { paddingRight: 50, width: 150, }]}>
                        //         <Text style={[styles.itemText, styles.linkText]} numberOfLines={1}>{from?.locationName}</Text>
                        //     </View>
                        //     <ArrowRightIcon />
                        //     <View style={[styles.highlighted, { paddingLeft: 20, }]}>
                        //         <Text style={[styles.itemText, styles.linkText]}>{to?.locationName}</Text>
                        //     </View>
                        // </View>
                    )}
                />

                <DataItem fontStyle="--text-base-regular" color="--color-gray-800"
                    text={formatDate(updatedAt, 'DD/MM/YYYY')} />
                <DataItem fontStyle="--text-base-regular" color="--color-gray-800"
                    text={`${from?.inventoryName} (${amount})`} />
            </> : <View />
        );
    };

    const pendingTransferListItem = ({ from = {}, to = {}, product, amount, dateGenerated, inventoryLocation }) => {

        return (from !== null && to !== null &&
            <>
                <DataItem flex={1.5} fontStyle="--text-base-medium" color="--color-blue-600" text={to?.locationName} />
                <DataItem fontStyle="--text-base-regular" color="--color-gray-800" text={from?.inventoryName} />
                <DataItem flex={1.34}fontStyle="--text-base-regular" color="--color-gray-800"
                    text={formatDate(dateGenerated, 'DD/MM/YYYY')} />
                <DataItem flex={0.6} align="center" fontStyle="--text-base-medium" color="--color-green-600" text={`+ ${amount}`} />
            </>
        );
    };

    const renderCompleteItem = item => {
        return <Item
            itemView={completedTransferListItem(item)}
            hasCheckBox={false}
            onItemPress={() => {
            }}
        />;
    };

    const renderPendingItem = item => {
        const { _id = '' } = item;
        return <Item
            itemView={pendingTransferListItem(item)}
            hasCheckBox={item?.to === null || item?.from === null ? false : true}
            isChecked={pendingCheckedItems.includes(_id)}
            onCheckBoxPress={() => onItemCheckbox(item)}
            onItemPress={() => {
            }}
        />;
    };

    console.log('COMPLETED TRANSFER: ', completedItems);
    
    return (
        <>
            <ScrollView>
                <SectionContainer>
                    <SectionText>Pending</SectionText>
                    <Table
                        data={pendingItems}
                        listItemFormat={renderPendingItem}
                        headers={PendingTransferHeadings}
                        isCheckbox={true}
                        toggleHeaderCheckbox={toggleHeaderCheckbox}
                        itemSelected={pendingCheckedItems}
                    />
                </SectionContainer>

                <SectionContainer
                    style={css`margin-bottom : 0;`}
                >
                    <SectionText>Completed</SectionText>
                    <Table
                        data={completedItems}
                        listItemFormat={renderCompleteItem}
                        headers={CompletedTransferHeadings}
                        isCheckbox={false}
                    />
                </SectionContainer>

            </ScrollView>

            <Footer
                hasPaginator={false}
                hasActionButton={true}
                hasActions={true}
                toggleActionButton={toggleActionButton}
            />
        </>
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
