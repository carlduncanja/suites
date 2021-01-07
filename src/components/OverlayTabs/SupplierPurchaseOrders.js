import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withModal } from 'react-native-modalfy';
import { isEmpty, isError, result } from 'lodash';
import styled, {css} from '@emotion/native';
import axios from 'axios';
import {useTheme} from 'emotion-theming';
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import { formatDate } from '../../utils/formatter';
import ImageIcon from '../../../assets/svg/imageIcon';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import Footer from '../common/Page/Footer';

import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import DataItem from '../common/List/DataItem';
import TouchableDataItem from '../common/List/TouchableDataItem';
import DataItemWithIcon from '../common/List/DataItemWithIcon';
import { transformToSentence } from '../../hooks/useTextEditHook';
import ActionItem from '../common/ActionItem';
import ArchiveIcon from '../../../assets/svg/archiveIcon';
import AddIcon from '../../../assets/svg/addIcon';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import LongPressWithFeedback from '../common/LongPressWithFeedback';
import { LONG_PRESS_TIMER } from '../../const';
import WasteIcon from '../../../assets/svg/wasteIcon';
import ConfirmationComponent from '../ConfirmationComponent';
import { removePurchaseOrders, updatePurchaseOrderDetails, archivePurchaseOrders } from '../../api/network';
import DateInputField from '../common/Input Fields/DateInputField';
import { PageContext } from '../../contexts/PageContext';

const EditDateRecord = styled.View`
    flex: 1.2;
    border: ${({theme}) => `1px solid ${theme.colors['--color-gray-300']}` };
    border-radius: 6px;
    flex-direction: row;
    justify-content: space-between;
`;

const testData = [
    {
        order: 'PO-0000023',
        invoiceNumber: 'IN-00009675',
        status: 'Payment Due',
        orderDate: new Date(2019, 11, 12),
        deliveryDate: new Date(2019, 11, 16)
    },
    {
        order: 'PO-0000024',
        invoiceNumber: 'IN-00009685',
        status: 'Payment Due',
        orderDate: new Date(2019, 11, 12),
        deliveryDate: new Date(2019, 11, 16)
    },
    {
        order: 'PO-0000024',
        invoiceNumber: '',
        status: 'Request Sent',
        orderDate: new Date(2019, 11, 12),
        deliveryDate: new Date(2019, 11, 16)
    },

];

const SupplierPurchaseOrders = ({
    modal,
    isArchive = false,
    data = [],
    onRefresh = () => {},
    onUpdatePurchaseOrders = () => {},
    // isEditMode
}) => {
    const [purchaseOrdersData, setPurchaseOrdersData] = useState(data);
    const [checkBoxList, setCheckBoxList] = useState([]);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [hasActionButton, setHasActionButton] = useState(!isArchive);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [tabDetails, setTabDetails] = useState([]);

    const { pageState, setPageState } = useContext(PageContext);
    const [isUpdated, setUpdated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const { isEditMode } = pageState;

    const recordsPerPage = 15;

    const headers = [
        {
            name: 'Purchase Orders',
            alignment: 'flex-start',
            flex: 1.2
        },
        {
            name: 'Invoice No.',
            alignment: 'flex-start',
            flex: 1.2
        },
        {
            name: 'Status',
            alignment: 'flex-start',
            flex: 1

        },
        {
            name: 'Order Date',
            alignment: 'flex-start',
            flex: 1

        },
        {
            name: 'Delivery Date',
            alignment: 'flex-start',
            flex: 1.2

        }
    ];

    useEffect(() => {
        // if (!Suppliers.length) fetchSuppliersData()
        setTotalPages(Math.ceil(data.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={false}
                        isEditUpdate={true}
                        onCancel={() => {
                            // resetState()
                            setPageState({ ...pageState, isEditMode: true });
                            modal.closeAllModals();
                        }}
                        onAction={() => {
                            modal.closeAllModals();
                            handlePromise();
                            // handlePOCall();
                            setUpdated(!isUpdated);
                        }}
                        message="Do you want to save these changes?"
                        action="Yes"
                    />
                ),
                onClose: () => {
                    console.log('Modal closed');
                },
            });
        }
    }, [isEditMode]);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const getFabActions = () => {
        const isDisabled = checkBoxList.length === 0 ? true : false;

        console.log('disabled is?', isDisabled);
        const archiveAction = (
            <ActionItem
                title="Archive Purchase Order"
                icon={<ArchiveIcon />}
                onPress={archiveSupplierPurchaseOrders}
                touchable={isDisabled}
                disabled={isDisabled}
            />
        );

        const deleteAction = (
            <View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeSupplierPurchaseOrders}
                    isDisabled={isDisabled}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={<WasteIcon />}
                        onPress={() => {
                        }}
                        disabled={isDisabled}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        return <ActionContainer
            floatingActions={[
                deleteAction,
                archiveAction
            ]}
            title="SUPPLIER PURCHASE ORDER ACTIONS"
        />;
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'SUPPLIER PURCHASE ORDER ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                }
            });
    };

    const removeSupplierPurchaseOrders = () => {
        // Done with one or more ids selected
        const selectedIds = checkBoxList.map(item => item._id);

        if (checkBoxList.length > 0) openDeletionConfirm({ ids: [...selectedIds] });
        else openErrorConfirmation();
    };

    const archiveSupplierPurchaseOrders = () => {
        // Done with one or more ids selected
        const selectedIds = checkBoxList.map(item => item._id);

        if (checkBoxList.length > 0) openDeletionConfirm({ ids: [...selectedIds] }, true);
        else openErrorConfirmation();
    };

    const openDeletionConfirm = (data, archive = false) => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        removeSupplierPurchaseOrdersCall(data);
                    }}
                    // onAction = { () => confirmAction()}
                    message={`Do you want to ${archive ? 'archive' : 'delete'} these item(s)?`}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const openErrorConfirmation = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const removeSupplierPurchaseOrdersCall = data => {
        removePurchaseOrders(data)
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onAction={() => {
                                modal.closeModals('ConfirmationModal');
                                setTimeout(() => {
                                    modal.closeModals('ActionContainerModal');
                                    onRefresh();
                                }, 200);
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );

                setCheckBoxList([]);
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200);
                console.log('Failed to remove group: ', error);
            })
            .finally(_ => {
                setFloatingAction(false);
            });
    };

    const toggleCheckbox = item => () => {
        let updatedCases = [...checkBoxList];

        if (updatedCases.includes(item)) {
            updatedCases = updatedCases.filter(caseItem => caseItem !== item);
        } else {
            updatedCases.push(item);
        }
        setCheckBoxList(updatedCases);

    };

    const toggleHeaderCheckbox = () => {
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== tabDetails.length;

        if (indeterminate) {
            const selectedAllIds = [...tabDetails.map(item => item)];
            setCheckBoxList(selectedAllIds);
        } else {
            setCheckBoxList([]);
        }
        // checkBoxList.length > 0 ?
        //     setCheckBoxList([])
        //     :
        //     setCheckBoxList(tabDetails)
    };

    const handlePromise = async () => {
        console.log('HANDLE PROMISE');
        const promises = [];
        let hasError = false;
        purchaseOrdersData.forEach(item => {
            const newPromise = new Promise((resolve, reject) => {
                updatePurchaseOrderDetails(item._id, { ...item })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(err => {
                        resolve(err);
                        hasError = true;
                        // reject(err);
                    });
            });
            promises.push(newPromise);
        });
        // const requests = purchaseOrdersData.map(item => {
        //     return new Promise((resolve, reject) => {
        //         updatePurchaseOrderDetails(item._id, { ...item, deliveryDate: item.deliveryDate})
        //             .then(data => {
        //                 resolve(data);
        //             })
        //             .catch(err => {
        //                 reject(err);
        //             });
        //     });
        // });

        Promise.all(promises)
            .then(result => {
                
                //this gets called when all the promises have resolved/rejected.
                result.forEach(res => console.log('Response: ', res));
                if (hasError) {
                    // show error state of confirmation screen
                    // to convey either one or more responses have failed
                    modal.openModal('ConfirmationModal',
                        {
                            content: <ConfirmationComponent
                                isError={true}
                                isEditUpdate={false}
                                onAction={() => { modal.closeModals('ConfirmationModal'); }}
                                onCancel={() => { modal.closeModals('ConfirmationModal'); }}
                                message="One or more of the dates were not updated"
                            />,
                            onClose: () => { modal.closeModals('ConfirmationModal'); }
                        });
                } else {
                    // show success state of confirmation screen
                    modal.openModal('ConfirmationModal',
                        {
                            content: <ConfirmationComponent
                                isError={false}
                                isEditUpdate={false}
                                onAction={() => { modal.closeModals('ConfirmationModal'); }}
                                onCancel={() => { modal.closeModals('ConfirmationModal'); }}
                            />,
                            onClose: () => { modal.closeModals('ConfirmationModal'); }
                        });
                }
            })
            .catch(err => {
                console.log('Error reject:', err);
            })
            .finally(_ => onRefresh());
    };

    // const handlePOCall = () => {
    //     purchaseOrdersData.map(item => (
    //         updatePurchaseOrderDetails(item._id, { ...item, deliveryDate: item.deliveryDate })
    //             .then(_ => {
    //                 console.log('Here');
    //                 modal.openModal('ConfirmationModal',
    //                     {
    //                         content: <ConfirmationComponent
    //                             isError={false}
    //                             isEditUpdate={false}
    //                             onAction={() => { modal.closeModals('ConfirmationModal'); }}
    //                             onCancel={() => { modal.closeModals('ConfirmationModal'); }}
    //                         />,
    //                         onClose: () => { modal.closeModals('ConfirmationModal'); }
    //                     });
    //             })
    //             .catch(error => {
    //                 console.log(' API Error: ', error, item._id);
    //                 modal.openModal('ConfirmationModal',
    //                     {
    //                         content: <ConfirmationComponent
    //                             isError={true}
    //                             isEditUpdate={false}
    //                             onAction={() => { modal.closeModals('ConfirmationModal'); }}
    //                             onCancel={() => { modal.closeModals('ConfirmationModal'); }}
    //                         />,
    //                         onClose: () => { modal.closeModals('ConfirmationModal'); }
    //                     });
    //             })
    //             .finally(_ => onRefresh())
    //     ));
    // };
    
    const onUpdateDate = value => dataItem => {
        // update value for specific item
        setUpdated(true);
        console.log('Value:', value);
        const updateItemId = dataItem?._id;
        const newDataObj = {...dataItem, deliveryDate: value || dataItem.deliveryDate };

        const updatedPOData = purchaseOrdersData.map(item => (item._id === dataItem._id ?
            {...newDataObj} :
            {...item}));
        
        setPurchaseOrdersData([...updatedPOData]);
        onUpdatePurchaseOrders([...updatedPOData]);
    };

    const listItemFormat = item => {
        const { invoiceNumber = '', purchaseOrderNumber = '', status = '', nextOrderDate = '', deliveryDate = '' } = item;
        const invoice = invoiceNumber === '' ? 'n/a' : invoiceNumber;
        const invoiceColor = invoiceNumber === '' ? '--color-gray-500' : '--color-blue-600';
        const statusColor = status === 'Request Sent' ? '--color-teal-600' : '--color-red-700';
        return (
            <>
                <TouchableDataItem
                    text={purchaseOrderNumber}
                    onPress={() => {
                    }}
                    fontStyle="--text-base-medium"
                    flex={1.2}
                />
                <DataItemWithIcon
                    text={invoice}
                    onPress={() => {
                    }}
                    fontStyle="--text-base-medium"
                    icon={invoiceNumber !== '' ? <ImageIcon /> : null}
                    color={invoiceColor}
                    flex={1.2}
                />
                <DataItem
                    text={transformToSentence(status)}
                    color={statusColor}
                    fontStyle="--text-sm-medium"
                />
                <DataItem text={formatDate(nextOrderDate, 'DD/MM/YYYY') || 'n/a'}/>
                {
                    isEditMode ? (
                        <EditDateRecord>
                            <DateInputField
                                onDateChange={value => onUpdateDate(value)(item)}
                                value={deliveryDate}
                                onClear={onUpdateDate}
                                placeholder="DD/MM/YYYY"
                                mode="date"
                                format="YYYY-MM-DD"
                                minDate={new Date()}
                            />
                        </EditDateRecord>
                    ) :
                        <DataItem text={formatDate(deliveryDate, 'DD/MM/YYYY')} flex={1.2}/>
                }
                
                {/* <View style={[styles.item,{flex:1}]}>
                    <Text style={[styles.itemText, {color: "#3182CE"}]}>{order}</Text>
                </View>
                <View style={[styles.item, {flexDirection:'row',alignItems: 'flex-start', flex:1, marginRight:15}]}>
                    { invoiceNumber !== "" && <View style={{marginRight:4,alignSelf:'center'}}><ImageIcon/></View>}
                    <Text style={[styles.itemText,{color: "#3182CE"}]}>{invoice}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'flex-start', flex:1}]}>
                    <Text style={[styles.itemText,{color : statusColor, fontSize:16}]}>{status}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'flex-start', flex:1}]}>
                    <Text style={styles.itemText}>{formatDate(orderDate,'DD/MM/YYYY')}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'flex-start',flex:1}]}>
                    <Text style={styles.itemText}>{formatDate(deliveryDate,'DD/MM/YYYY')}</Text>
                </View> */}
            </>
        );
    };

    const renderListFn = item => (
        <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={() => {
            }}
            itemView={listItemFormat(item)}
        />
    );

    return (
        <>
            <Table
                data={data}
                listItemFormat={renderListFn}
                headers={headers}
                isCheckbox={true}
                toggleHeaderCheckbox={toggleHeaderCheckbox}
                itemSelected={checkBoxList}
            />

            <Footer
                hasActionButton={hasActionButton}
                hasPaginator={false}
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
            />
            {/* <View style={styles.footer}>
                <View style={{alignSelf: "center", marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>

                <FloatingActionButton
                    isDisabled={isFloatingActionDisabled}
                    toggleActionButton={toggleActionButton}
                />
            </View>  */}
        </>
    );
};

SupplierPurchaseOrders.propTypes = {};
SupplierPurchaseOrders.defaultProps = {};

export default withModal(SupplierPurchaseOrders);

const styles = StyleSheet.create({
    item: { flex: 1 },
    itemText: {
        fontSize: 16,
        color: '#4A5568',
    },
    footer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        // marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
});
