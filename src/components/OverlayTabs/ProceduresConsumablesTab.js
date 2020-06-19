import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';

import { currencyFormatter } from '../../utils/formatter'
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import NumberChangeField from "../common/Input Fields/NumberChangeField";

const ProceduresConsumablesTab = ({consumablesData, isEditMode}) => {

    const recordsPerPage = 10
    const [consumables, setConsumbales] = useState(consumablesData)
    const [checkBoxList, setCheckboxList] = useState([])

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    useEffect(()=>{
        setTotalPages(Math.ceil(consumables.length / recordsPerPage))
    },[])

    const onDecreasePress = () => {

    }
    const onIncreasePress = () => {

    }

    const headers = [
        {
            name :"Item Name",
            alignment: "flex-start"
        },
        {
            name :"Type",
            alignment: "center"
        },
        {
            name :"Quantity",
            alignment: "center"
        },
        {
            name :"Unit Price",
            alignment: "flex-end"
        }
    ]

    // ###### EVENT HANDLERS

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

    const handleOnSelectAll = () => {
        let updatedList = selectAll(consumables, checkBoxList)
        setCheckboxList(updatedList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const {_id} = item;
        let updatedProcedures = checkboxItemPress(item, _id, checkBoxList)
        setCheckboxList(updatedProcedures)
    }
 
    const listItem = (item) => {
        const { inventory = {}, amount = 0 } = item
        const { name = "", unitPrice = 0, type = "Test_Type" } = inventory
        return (
            <>
                <View style={styles.item}>
                    <Text style={[styles.itemText,{color:"#3182CE"}]}>{name}</Text>
                </View>
                <View style={[styles.item,{alignItems:'center'}]}>
                    <Text style={styles.itemText}>{type}</Text>
                </View>
                { isEditMode ?
                    <View style={[styles.item,{alignItems:'center'}]}>
                        <NumberChangeField 
                            number={amount} 
                            onDecreasePress = {onDecreasePress(item)}
                            onIncreasePress = {onIncreasePress(item)}
                        />
                    </View>
                    :
                    <View style={[styles.item,{alignItems:'center'}]}>
                        <Text style={styles.itemText}>{amount}</Text>
                    </View>
                
                }
            
                <View style={[styles.item,{alignItems:'flex-end'}]}>
                    <Text style={styles.itemText}>$ {currencyFormatter(unitPrice)}</Text>
                </View>
                
            </>
        )
        
    }
 
    const renderProcedureFn = (item) => {
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => {}}
            itemView={listItem(item)}
        />
    }

    let dataToDisplay = [...consumables];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            <Table
                isCheckbox = {true}
                data = {dataToDisplay}
                listItemFormat = {renderProcedureFn}
                headers = {headers}
                toggleHeaderCheckbox = {handleOnSelectAll} 
                itemSelected = {checkBoxList}
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
        </>

    )
}

export default ProceduresConsumablesTab

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
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