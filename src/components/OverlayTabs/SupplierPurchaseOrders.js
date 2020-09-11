import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import { formatDate } from "../../utils/formatter";
import ImageIcon from '../../../assets/svg/imageIcon';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import Footer from "../common/Page/Footer";

import { withModal } from 'react-native-modalfy';
import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import DataItem from "../common/List/DataItem";
import TouchableDataItem from "../common/List/TouchableDataItem";
import DataItemWithIcon from "../common/List/DataItemWithIcon";
import { transformToSentence } from "../../hooks/useTextEditHook";


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

]

const SupplierPurchaseOrders = ({ modal, floatingActions, isArchive = false, data = [] }) => {
    
    const [checkBoxList, setCheckBoxList] = useState([])
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)
    const [hasActionButton, setHasActionButton] = useState(!isArchive);
    const recordsPerPage = 15;
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const headers = [
        {
            name: "Purchase Orders",
            alignment: "flex-start",
            flex: 1
        },
        {
            name: "Invoice No.",
            alignment: "flex-start",
            flex: 1.2
        },
        {
            name: "Status",
            alignment: "flex-start",
            flex: 1

        },
        {
            name: "Order Date",
            alignment: "flex-start",
            flex: 1

        },
        {
            name: "Delivery Date",
            alignment: "flex-start",
            flex: 1

        }
    ]

    useEffect(() => {
        // if (!suppliers.length) fetchSuppliersData()
        setTotalPages(Math.ceil(data.length / recordsPerPage))
    }, []);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: floatingActions(),
                title: "SUPPLIER ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }

    const toggleCheckbox = (item) => () => {
        let updatedCases = [...checkBoxList];

        if (updatedCases.includes(item)) {
            updatedCases = updatedCases.filter(caseItem => caseItem !== item)
        } else {
            updatedCases.push(item);
        }
        setCheckBoxList(updatedCases);
    }

    const toggleHeaderCheckbox = () => {
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== tabDetails.length;

        if (indeterminate) {
            const selectedAllIds = [...tabDetails.map(item => item)]
            setCheckBoxList(selectedAllIds)
        } else {
            setCheckBoxList([])
        }
        // checkBoxList.length > 0 ?
        //     setCheckBoxList([])
        //     :
        //     setCheckBoxList(tabDetails)
    }


    const listItemFormat = (item) => {

        const { invoiceNumber = "", purchaseOrderNumber = "", status = "", nextOrderDate = "", deliveryDate = "" } = item
        let invoice = invoiceNumber === '' ? 'n/a' : invoiceNumber
        let invoiceColor = invoiceNumber === '' ? '--color-gray-500' : '--color-blue-600';
        let statusColor = status === 'Request Sent' ? '--color-teal-600' : '--color-red-700'
        return (
            <>
                <TouchableDataItem
                    text={purchaseOrderNumber}
                    onPress={() => { }}
                    fontStyle="--text-base-medium"
                />
                <DataItemWithIcon
                    text={invoice}
                    onPress={() => { }}
                    fontStyle="--text-base-medium"
                    icon={invoiceNumber !== "" ? <ImageIcon /> : null}
                    color={invoiceColor}
                    flex={1.2}
                />
                <DataItem
                    text={transformToSentence(status)}
                    color={statusColor}
                    fontStyle="--text-sm-medium"
                />
                <DataItem text={formatDate(nextOrderDate, 'DD/MM/YYYY')} />
                <DataItem text={formatDate(deliveryDate, 'DD/MM/YYYY')} />

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
        )

    };

    const renderListFn = (item) => {
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={() => { }}
            itemView={listItemFormat(item)}
        />
    }

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
    )
} 

SupplierPurchaseOrders.propTypes = {};
SupplierPurchaseOrders.defaultProps = {};

export default withModal(SupplierPurchaseOrders);

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
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
})