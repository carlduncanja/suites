import React,{ useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item'; 
import { currencyFormatter } from "../../utils/formatter";
import SuppliersPurchaseOrder from '../Suppliers/SuppliersPurchaseOrder';
import { withModal } from 'react-native-modalfy';

const testData = [
    {
        _id : 'PO-0008918',
        name:'Fomalin',
        category:'Solutions',
        sku:'SL-0932',
        cost: 4567.89
    },
    {
        _id : 'PO-0008923',
        name:'Morphine',
        category:'Anesthetic',
        sku:'AN-0932',
        cost: 5056.79
    }
]

const SupplierProductsTab = ({modal}) => {

    const [checkBoxList, setCheckBoxList] = useState([])

    const headers = [
        {
            name :"Product",
            alignment : "flex-start"
        },
        {
            name :"Category",
            alignment : "flex-start"
        },
        {
            name :"SKU",
            alignment : "center"
        },
        {
            name :"Price",
            alignment : "flex-end"
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

    const openPurchaseOrder = (id) =>{
        console.log("Id: ", id)
        modal.openModal('OverlayInfoModal',{ 
            overlayContent : <SuppliersPurchaseOrder 
                details = {[]}  
                tabs = {[id]} 
            />,
        })
    }


    const listItemFormat = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-start'}]}>
            <Text style={styles.itemText}>{item.category}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item.sku}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.cost)}</Text>
        </View>
    </>;

    const renderListFn = (item) =>{ 
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={()=>openPurchaseOrder(item._id)}
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

SupplierProductsTab.propTypes = {};
SupplierProductsTab.defaultProps = {};

export default withModal(SupplierProductsTab);

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
})