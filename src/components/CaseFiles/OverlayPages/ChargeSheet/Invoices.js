import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import {useModal, withModal} from 'react-native-modalfy';
import moment from 'moment';
import Table from '../../../common/Table/Table';
import SvgIcon from '../../../../../assets/SvgIcon';
import Checkbox from '../../../common/Checkbox/Checkbox';
import { useCheckBox, formatAmount, calcBillingValues } from '../../../../helpers/caseFilesHelpers';
import { CheckedBox, PartialCheckbox} from '../../../common/Checkbox/Checkboxes';
import { caseActions } from '../../../../redux/reducers/caseFilesReducer';
import { CaseFileContext } from '../../../../contexts/CaseFileContext';
import ReportPreview from '../../Reports/ReportPreview';
import Item from '../../../common/Table/Item';

import { formatDate, currencyFormatter, transformToSentence } from '../../../../utils/formatter';
import ListItem from '../../../common/List/ListItem';

const reportTestData = {
    billing: {
        billedTo: {
            name: 'Julie Melissa Brown',
            address: {
                line1: '23 Bedford Avenue',
                line2: 'Kingston 8',
                line3: 'JMKN08'
            }
        },
        billedFor: 'Medical Services',
        date: new Date(2019, 11, 12),
        charges: {
            subTotal: 178167.21,
            discount: 30002.25,
            tax: 0.2
        }
    },

    billedItems: {
        physicians: [
            {
                name: 'Dr. Mansingh',
                cost: 64000.45
            }
        ],
        procedures: [
            {
                name: 'Coronary Bypass Graft',
                cost: 48000.00
            },
            {
                name: 'Coronary Artery Graft',
                cost: 48000.00
            }
        ],
        equipments: [
            {
                name: 'Blood Glasses',
                amount: 2,
                unitPrice: 16000.45
            },
            {
                name: 'Stethoscope 4',
                amount: 3,
                unitPrice: 15000.50
            }
        ],
        inventories: [
            {
                name: 'Agents',
                amount: 15,
                unitPrice: 5000.62
            },
            {
                name: 'Atracurium',
                amount: 5,
                unitPrice: 4128.45
            },
            {
                name: 'GU Tower',
                amount: 10,
                unitPrice: 5055.20
            },
            {
                name: 'Gauze',
                amount: 20,
                unitPrice: 500.00
            }
        ]
    }
};
const Invoices = ({tabDetails = [], reportDetails, handleInvoices}) => {
    const modal = useModal();

    console.log('Invoices: ', tabDetails);
    const [checkBoxList, setCheckBoxList] = useState([]);

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
        }
    ];

    const openModal = item => () => {
        // const report = tabDetails[0] || {};
        // const { billing = {}, customer = {} } = report;
        // const { subTotal = 0 } = billing;
        // const details = {
        //     amountDue: subTotal,
        //     billingDetails: customer,
        //     ...report
        // };
        modal.openModal('ReportPreviewModal', {
            content: <ReportPreview
                type="Invoice"
                details={item}
                reportDetails={reportDetails}
            />
        });
    };

    const listItem = item => {
        const { invoiceNumber = '', status = '', billingDetails = {}, createdAt = '' } = item;
        const { subTotal = 0 } = billingDetails;

        return (
            <>
                {/* <TouchableOpacity style={{marginRight:20}} onPress={()=>toggleCheckbox(item)}>
                    { checkBoxList.includes(item) ? <CheckedBox/> : <Checkbox/> }
                </TouchableOpacity> */}
                {/* <View style={styles.dataContainer}> */}
                <View style={styles.item}>
                    <Text style={[styles.itemText, {color: '#3182CE'}]}>{invoiceNumber}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center'}]}>
                    <Text style={[styles.itemText, {color: item.status === 'Complete' ? '#319795' : '#DD6B20'}]}>{transformToSentence(status)}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center'}]}>
                    <Text style={styles.itemText}>{formatDate(createdAt, 'DD/MM/YYYY') }</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center'}]}>
                    <Text style={styles.itemText}>{`$ ${currencyFormatter(subTotal)}`}</Text>
                </View>
                {/* </View> */}
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
