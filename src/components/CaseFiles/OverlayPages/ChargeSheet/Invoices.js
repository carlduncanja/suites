import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useModal, withModal} from 'react-native-modalfy';
import moment from 'moment';
import Table from '../../../common/Table/Table';
import SvgIcon from '../../../../../assets/SvgIcon';
import Checkbox from '../../../common/Checkbox/Checkbox';
import {useCheckBox, formatAmount, calcBillingValues} from '../../../../helpers/caseFilesHelpers';
import {CheckedBox, PartialCheckbox} from '../../../common/Checkbox/Checkboxes';
import {caseActions} from '../../../../redux/reducers/caseFilesReducer';
import {CaseFileContext} from '../../../../contexts/CaseFileContext';
import ReportPreview from '../../Reports/ReportPreview';
import Item from '../../../common/Table/Item';

import {formatDate, currencyFormatter, transformToSentence} from '../../../../utils/formatter';
import ListItem from '../../../common/List/ListItem';

const Invoices = ({
    tabDetails = [],
    reportDetails,
    handleInvoices
}) => {
    const modal = useModal();

    console.log('Invoices: ', tabDetails);
    const [checkBoxList, setCheckBoxList] = useState([]);

    useEffect(() => {
        setCheckBoxList([])
    }, [tabDetails])

    const headers = [
        {
            name: 'Invoice Number',
            alignment: 'flex-start'
        },
        {
            name: 'Status',
            alignment: 'center'
        },
        {
            name: 'Date',
            alignment: 'center'
        },
        {
            name: 'Value',
            alignment: 'center'
        },
        {
            name: 'Balance',
            alignment: 'center'
        }
    ];

    const openModal = item => () => {
        console.log('Report Item: ', item);
        modal.openModal('ReportPreviewModal', {
            content: <ReportPreview
                type="Invoice"
                details={item}
                reportDetails={reportDetails}
            />
        });
    };

    const listItem = item => {
        const {
            invoiceNumber = '',
            status = '',
            billingDetails = {},
            createdAt = '',
            amountDue = 0,
            total,
            amountPaid
        } = item;
        const balance = total - amountPaid;
        const balanceColor = balance <= 0 ? '#319795' : '#DD6B20';

        return (
            <>
                <View style={styles.item}>
                    <Text style={[styles.itemText, {color: '#3182CE'}]}>{invoiceNumber}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center'}]}>
                    <Text
                        style={[styles.itemText, {color: item.status === 'Complete' ? '#319795' : '#DD6B20'}]}
                    >{transformToSentence(status)}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center'}]}>
                    <Text style={styles.itemText}>{formatDate(createdAt, 'DD/MM/YYYY')}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center'}]}>
                    <Text style={styles.itemText}>{`$ ${currencyFormatter(total)}`}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center'}]}>
                    <Text style={[styles.itemText, {color: balanceColor}]}>{`$ ${currencyFormatter(balance)}`}</Text>
                </View>
            </>
        );
    };

    const toggleCheckbox = item => () => {
        let updatedInvoices = [...checkBoxList];

        if (updatedInvoices.includes(item)) {
            updatedInvoices = updatedInvoices.filter(invoice => invoice !== item);
        } else {
            updatedInvoices.push(item);
        }

        handleInvoices(updatedInvoices);
        setCheckBoxList(updatedInvoices);
    };

    const toggleHeaderCheckbox = () => {
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== tabDetails.length;
        if (indeterminate) {
            const selectedAllIds = [...tabDetails.map(item => item)];
            setCheckBoxList(selectedAllIds);
        } else {
            setCheckBoxList([]);
        }
    };

    const renderListFn = item => (
        <ListItem
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={openModal(item)}
            itemView={listItem(item)}
        />
    );

    return (
        <ScrollView>
            <Table
                isCheckbox={true}
                data={tabDetails}
                listItemFormat={renderListFn}
                headers={headers}
                toggleHeaderCheckbox={toggleHeaderCheckbox}
                itemSelected={checkBoxList}
            />
        </ScrollView>
    );
};

export default Invoices;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginBottom: 10
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    item: {
        flex: 1
        // alignItems:"flex-start",
        // justifyContent:'center',
    },
    itemText: {
        fontSize: 16,
        color: '#4A5568',
    },
    headersContainer: {
        //flex:1,
        marginLeft: 10,
        flexDirection: 'row',
        //width:'100%'
    },
    headerItem: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 12,
        color: '#718096'
    }
});
