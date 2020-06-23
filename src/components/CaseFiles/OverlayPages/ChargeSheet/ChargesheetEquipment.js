import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Table from '../../../common/Table/Table'; 
import Item from '../../../common/Table/Item';  
import Search from '../../../common/Search';
import NumberChangeField from '../../../common/Input Fields/NumberChangeField';
import DropdownInputField from '../../../common/Input Fields/DropdownInputField';
import { currencyFormatter } from '../../../../utils/formatter';

const ChargesheetEquipment = ({tabDetails, headers, details = [], handleEditDone = () => {}, isEditMode = false, listItemFormat}) => {

    const [checkBoxList, setCheckBoxList] = useState([])
    const [searchText, setSearchText] = useState('')

    const procedureNames = details.map( item => item.procedure.name) 
    const data = []
    let allEquipments = details.map( item => item.equipments)
    allEquipments.forEach(item => item.map( obj => data.push(obj)))
    let initialOption = isEditMode ? procedureNames[0] : 'All'
     
    const [selectedOption, setSelectedOption] = useState(initialOption)
    const [selectedData, setSelectedData] = useState(data)

    console.log("Selected data: ", selectedData)

    const onSearchInputChange = (input) =>{
        setSearchText(input)
    }

    const toggleCheckbox = (item) => () => {
        let updateEquipment = [...checkBoxList];

        if (updateEquipment.includes(item)) {
            updateEquipment = updateEquipment.filter(caseItem => caseItem !== item)
        } else {
            updateEquipment.push(item);
        }
        setCheckBoxList(updateEquipment);
    }
    
    const toggleHeaderCheckbox = () =>{
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== selectedData.length;
        
        if (indeterminate) {
            const selectedAllIds = [...selectedData.map( item => item )]
            setCheckBoxList(selectedAllIds)
        } else {
            setCheckBoxList([])
        }
    }

    const onSelectChange = (index) => {
        if(isEditMode){
            let data = details[index].equipments.map(item => {return {
                ...item,
                unitPrice : item.cost
            }})
            setSelectedData( data|| [])
            setSelectedOption(procedureNames[index])
        }else{
            if(index === 0){
                setSelectedOption('All')
                setSelectedData(data)
            }else{
                let data = details[index-1].equipments.map(item => {return {
                    ...item,
                    unitPrice : item.cost
                }})
                setSelectedData( data|| [])
                setSelectedOption(procedureNames[index-1])
                // console.log("Index: ", )
            }
        }
        
    }

    const getProcedureId = (data) => {
        if(selectedOption !== 'All'){
            const filterItem = details.filter( obj => obj.procedure.name === selectedOption) || []
            const { caseProcedureId, services, inventories } = filterItem[0]
            let updatedData = [
                {
                    caseProcedureId,
                    inventories : inventories,
                    equipments : data,
                    lineItems : services
                }
            ]
            handleEditDone(updatedData)
            // console.log("Id: ", caseProcedureId)
            // console.log("Servies: ", services)
            // console.log("Equip: ", equipments)
        }
    }

    const onQuantityChangePress = (item) => (action) =>{
       
        const findIndex = selectedData.findIndex(obj => obj._id === item._id);
        let selectedItem = selectedData[findIndex]
        const updatedObj = { 
            ...selectedItem,
            amount: action ==='add' ? selectedItem.amount + 1 : selectedItem.amount - 1
        };
        const updatedData = [
            ...selectedData.slice(0, findIndex),
            updatedObj,
            ...selectedData.slice(findIndex + 1),
        ]; 
        getProcedureId(updatedData)
        // handleEditDone(updatedData)
        // console.log("SelctedData: ", updatedData)
        setSelectedData(updatedData)
    }

    const onAmountChange = (item) => (value) => {

        const findIndex = selectedData.findIndex(obj => obj._id === item._id);
        let selectedItem = selectedData[findIndex]
        let updatedObj = { ...selectedItem, amount: value === "" ? 0 : parseInt(value)};
        const updatedItems = [
            ...selectedData.slice(0, findIndex),
            updatedObj,
            ...selectedData.slice(findIndex + 1),
        ]; 
        getProcedureId(updatedItems)
        setSelectedData(updatedItems)
        
        // console.log("update: ", updatedItems)
    }

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        {
            isEditMode && selectedOption !== 'All'?

            <View style={{flex:1, alignItems:'center'}}>
                <NumberChangeField
                    onChangePress = {onQuantityChangePress(item)}
                    onAmountChange = {onAmountChange(item)}
                    value = {item.amount === 0 ? "" : item.amount.toString()}
                />
            </View>
            
            :
            <View style={[styles.item, {alignItems: 'center'}]}>
                <Text style={styles.itemText}>{item.amount}</Text>
            </View>

        }
        <View style={[styles.item, {alignItems: 'flex-end'}]}>
            <Text style={styles.itemText}>{`$ ${currencyFormatter(item.cost)}`}</Text>
        </View>

    </>


    const renderListFn = (item) =>{
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={() => {}}
            itemView={listItem(item)}
        />
    }
   
    return ( 
        <ScrollView>

            <View style={{flex:1, justifyContent:'space-between', flexDirection:'row', marginBottom:20}}>
                <View style={{flex:2, paddingRight:100}}>
                    <Search
                        placeholderText = "Search by equipment item"
                        inputText = {searchText}
                        changeText = {onSearchInputChange}
                        backgroundColor = "#FAFAFA"
                    />
                </View>
                <View style={{flex:1}}>
                    <DropdownInputField
                        onSelectChange = {onSelectChange}
                        value = {selectedOption}
                        dropdownOptions = { isEditMode ? [...procedureNames] : ['All',...procedureNames]}
                    />
                </View>
                
            </View>

            <Table
                isCheckbox = {true}
                data = {selectedData}
                listItemFormat = {renderListFn}
                headers = {headers}
                toggleHeaderCheckbox = {toggleHeaderCheckbox} 
                itemSelected = {checkBoxList}
                // dataLength = {tabDetails.length}
            />
        </ScrollView>
    );
}
 
export default ChargesheetEquipment;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        padding:10,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        marginBottom:10
    },
    dataContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:"flex-start",
        justifyContent:"space-between"
    },
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
    headersContainer:{
        //flex:1,
        marginLeft:10,
        flexDirection:'row',
        //width:'100%'
    },
    headerItem:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerText:{
        fontSize:12,
        color:'#718096'
    }
})
