import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import Table from '../../../common/Table/Table';
import Checkbox from '../../../common/Checkbox/Checkbox';
import { CheckedBox, PartialCheckbox} from '../../../common/Checkbox/Checkboxes';
import { useCheckBox } from '../../../../helpers/caseFilesHelpers'
import Item from '../../../common/Table/Item';
import Search from '../../../common/Search';
import DropdownInputField from '../../../common/Input Fields/DropdownInputField';
import OptionSearchableField from '../../../common/Input Fields/OptionSearchableField';
import { currencyFormatter } from '../../../../utils/formatter';
import IconButton from '../../../common/Buttons/IconButton';
import RightArrow from '../../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../../assets/svg/leftArrow';



const Consumables = ({tabDetails, headers, listItemFormat, details = [], isEditMode}) => {
    
    const [checkBoxList, setCheckBoxList] = useState([])
    const [searchText, setSearchText] = useState('')
    const [inventoriesData, setInventoriesData] = useState(details)
    
    const procedureNames = inventoriesData.map( item => item.procedure.name) 
    const data = []
    const allInventories = inventoriesData.map( item => item.inventories)
    allInventories.forEach(item => item.map( obj => data.push(obj)))
    let initialOption = isEditMode ? procedureNames[0] : 'All'
    
    
    const [selectedOption, setSelectedOption] = useState(initialOption)
    const [selectedData, setSelectedData] = useState(data)

    const onSearchInputChange = (input) =>{
        setSearchText(input)
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

    const onSelectChange = (index) => {
        if(isEditMode){
            let data = details[index].inventories.map(item => {return {
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
                let data = details[index-1].inventories.map(item => {return {
                    ...item,
                    unitPrice : item.cost
                }})
                setSelectedData( data|| [])
                setSelectedOption(procedureNames[index-1])
                // console.log("Index: ", )
            }
        }
        
        
    }

    const onQuantityChangePress = (item) => (action) =>{
        if(selectedOption !== 'All'){
            let filterOption = inventoriesData.filter(item => item.procedure.name === selectedOption)

            // Update inventories array
            const { inventories } = filterOption[0]
            const findIndex = inventories.findIndex(obj => obj.name === item.name);
            const updatedObj = { 
                ...inventories[findIndex],
                amount: action ==='add' ? inventories[findIndex].amount + 1 : inventories[findIndex].amount - 1
            };
            const updatedInventories = [
                ...inventories.slice(0, findIndex),
                updatedObj,
                ...inventories.slice(findIndex + 1),
            ]; 
            // console.log("Inventories: ", updatedInventories)

            // Update procedure with updated inventories
            const updatedProcedure = {...filterOption[0], inventories : updatedInventories}

            // Update entire list of procedures
            const filterProcedure = inventoriesData.findIndex( obj => obj.procedure.name === selectedOption)
            const updatedData = [
                ...inventoriesData.slice(0, filterProcedure),
                updatedProcedure,
                ...inventoriesData.slice(findIndex+1)
            ]

            setInventoriesData(updatedData)
            setSelectedData(updatedProcedure.inventories)
        }
        
    }

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        {
            isEditMode ?

            <View style={[styles.editItem, {alignItems: 'center'}]}>
                <IconButton
                    Icon = {<LeftArrow strokeColor="#718096"/>}
                    onPress = {()=>onQuantityChangePress(item)('sub')}
                    disabled = {false}
                />

                <TextInput 
                    style={styles.editTextBox}
                >
                    <Text style={styles.itemText}>{item.amount}</Text>
                </TextInput>
                
                <IconButton
                    Icon = {<RightArrow strokeColor="#718096"/>}
                    onPress = {()=>{onQuantityChangePress(item)('add')}}
                    disabled = {false}
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
                        placeholderText = "Search by inventory item"
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
 
export default Consumables;

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
    },
    editItem:{
        flex:1,
        flexDirection:'row',  
        justifyContent:'center'
    },
    editTextBox:{
        backgroundColor:'#F8FAFB',
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        padding:6,
        paddingTop:2,
        paddingBottom:2,
        marginLeft:10,
        marginRight:10
    },
})
