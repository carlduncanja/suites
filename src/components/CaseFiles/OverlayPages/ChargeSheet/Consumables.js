import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import Table from '../../../common/Table/Table';
import Checkbox from '../../../common/Checkbox/Checkbox';
import { CheckedBox, PartialCheckbox} from '../../../common/Checkbox/Checkboxes';
import { useCheckBox } from '../../../../helpers/caseFilesHelpers'
import Item from '../../../common/Table/Item';
import Search from '../../../common/Search';
import DropdownInputField from '../../../common/Input Fields/DropdownInputField';
import OptionSearchableField from '../../../common/Input Fields/OptionSearchableField';


const Consumables = ({tabDetails, headers, listItemFormat}) => {
    
    const [checkBoxList, setCheckBoxList] = useState([])
    const [searchText, setSearchText] = useState('')

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

    const renderListFn = (item) =>{ 
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={() => {}}
            itemView={listItemFormat(item)}
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
                        onSelectChange = {()=>{}}
                        value = {'All'}
                        dropdownOptions = {['All',"Yes",'No']}
                    />
                </View>
                
            </View>
            
            <Table
                isCheckbox = {true}
                data = {tabDetails}
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
    }
})
