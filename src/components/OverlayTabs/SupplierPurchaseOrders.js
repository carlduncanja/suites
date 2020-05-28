import React,{ useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item'; 
import { formatDate } from "../../utils/formatter";
import ImageIcon from '../../../assets/svg/imageIcon';

const testData = [
    {
        order:'PO-0000023',
        invoiceNumber:'IN-00009675',
        status:'Payment Due',
        orderDate: new Date(2019, 11, 12),
        deliveryDate : new Date(2019, 11, 16)
    },
    {
        order:'PO-0000024',
        invoiceNumber:'IN-00009685',
        status:'Payment Due',
        orderDate: new Date(2019, 11, 12),
        deliveryDate : new Date(2019, 11, 16)
    },
    {
        order:'PO-0000024',
        invoiceNumber:'',
        status:'Request Sent',
        orderDate: new Date(2019, 11, 12),
        deliveryDate : new Date(2019, 11, 16)
    },
    
]

const SupplierPurchaseOrders = () => {
    const [checkBoxList, setCheckBoxList] = useState([])

    const headers = [
        {
            name :"Purchase Orders",
            alignment : "flex-start"
        },
        {
            name :"Invoice No.",
            alignment : "flex-start"
        },
        {
            name :"Status",
            alignment : "flex-start"
        },
        {
            name :"Order Date",
            alignment : "flex-start"
        },
        {
            name :"Delivery Date",
            alignment : "flex-start"
        }     
    ]

    const toggleCheckbox = (item) => () => {
        let updatedCases = [...checkBoxList];

        if (updatedCases.includes(item)) {
            updatedCases = updatedCases.filter(caseItem => caseItem !== item)
        } else {
            updatedCases.push(item);
        }
        setCheckBoxList(updatedCases);
    }
    
    const toggleHeaderCheckbox = () =>{
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== tabDetails.length;
        
        if (indeterminate) {
            const selectedAllIds = [...tabDetails.map( item => item )]
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

        const {invoiceNumber, order, status, orderDate, deliveryDate} = item
        let invoice = invoiceNumber === '' ? 'n/a' : invoiceNumber
        let statusColor = status === 'Payment Due' ? '#C53030' : '#319795'
        return (
            <>
                <View style={styles.item}>
                    <Text style={[styles.itemText, {color: "#3182CE"}]}>{order}</Text>
                </View>
                <View style={[styles.item, {flexDirection:'row',alignItems: 'flex-start'}]}>
                    { invoiceNumber !== "" && <View style={{marginRight:4,alignSelf:'center'}}><ImageIcon/></View>}
                    <Text style={[styles.itemText,{color: "#3182CE"}]}>{invoice}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'flex-start'}]}>
                    <Text style={[styles.itemText,{color : statusColor}]}>{status}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'flex-start'}]}>
                    <Text style={styles.itemText}>{formatDate(orderDate,'DD/MM/YYYY')}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'flex-start'}]}>
                    <Text style={styles.itemText}>{formatDate(deliveryDate,'DD/MM/YYYY')}</Text>
                </View>
            </>
        )
        
    };

    const renderListFn = (item) =>{ 
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={() => {}}
            itemView={listItemFormat(item)}
        />
    }

    return(
        <View>
            <Table
                data = {testData}
                listItemFormat = {renderListFn}
                headers = {headers}
                isCheckbox = {true}
                toggleHeaderCheckbox = {toggleHeaderCheckbox}
                itemSelected = {checkBoxList}
            />
        </View>
    )
}

SupplierPurchaseOrders.propTypes = {};
SupplierPurchaseOrders.defaultProps = {};

export default SupplierPurchaseOrders;

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
})