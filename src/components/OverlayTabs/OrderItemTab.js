import React,{ useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Table from "../common/Table/Table";
import RoundedPaginator from '../common/Paginators/RoundedPaginator';

import { currencyFormatter } from "../../utils/formatter";
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';


const testData = [
    { 
        name : 'Agents',
        sku : 'QD3-187224',
        quanity : 5,
        unitPrice : 7724.81,
    },

    { 
        name : 'Atracurium',
        sku : 'QD3-187224',
        quanity : 2,
        unitPrice : 7724.81,
    },

    { 
        name : 'Fentanyl',
        sku : 'QD3-187224',
        quanity : 8,
        unitPrice : 7724.81,
    },

    { 
        name : 'Proptol',
        sku : 'QD3-187224',
        quanity : 10,
        unitPrice : 7724.81,
    },
]

const OrderItemTab = ({order}) =>{

    const { orders = [] } = order

    const recordsPerPage = 15;

    const headers = [
        {
            name : 'Item Name',
            alignment : 'flex-start',
            flex : 1,
        },
        {
            name : 'SKU',
            alignment : 'flex-start',
            flex : 1,
        },
        {
            name : 'Quantity',
            alignment : 'flex-start',
            flex : 1,
        },
        {
            name : 'Unit Price',
            alignment : 'flex-start',
            flex : 1,
        },
    ]

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    useEffect(() => {
        setTotalPages(Math.ceil(testData.length / recordsPerPage))
    }, []);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };


    const listItemFormat = (item) => {
        const { amount = 0, productId = {} } = item
        const { name = "", sku = "", unitCost = 0 } = productId
        
        return (
            <>
                <View style={{flexDirection:'row', marginLeft:7}}>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{name}</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>{sku}</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>{amount}</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.itemText}>$ {currencyFormatter(unitCost)}</Text>
                    </View>
                </View>

            </>
        )
    }

    let itemsToDisplay = [...orders];
    itemsToDisplay = itemsToDisplay.slice(currentPageListMin, currentPageListMax); 
    
    return (
        <View style={{flex:1}}>
            <Table
                data = {itemsToDisplay}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckbox = {false}
            />

            <View style={styles.footer}>
                <View style={{alignSelf: "center", marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>
            </View>
        </View>
    )
}

export default OrderItemTab

const styles = StyleSheet.create({
    item: {
        flex: 1,
        borderBottomColor : '#E3E8EF',
        borderBottomWidth : 1,
        paddingBottom:8,
        marginBottom:10
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
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
})