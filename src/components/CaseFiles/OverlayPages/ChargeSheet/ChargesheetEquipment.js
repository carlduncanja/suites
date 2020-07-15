import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Table from '../../../common/Table/Table';
import Item from '../../../common/Table/Item';
import Search from '../../../common/Search';
import NumberChangeField from '../../../common/Input Fields/NumberChangeField';
import DropdownInputField from '../../../common/Input Fields/DropdownInputField';
import { currencyFormatter } from '../../../../utils/formatter';

const ChargesheetEquipment = ({headers, equipments = [], caseProceduresFilters = [], onEquipmentsUpdate, handleEditDone = () => {}, isEditMode = false, allItems = []}) => {

    const [checkBoxList, setCheckBoxList] = useState([])
    const [searchText, setSearchText] = useState('')
    const [selectedOption, setSelectedOption] = useState(caseProceduresFilters[0])
    const [selectedIndex, setSelectedIndex] = useState(0)

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
        const selectedData = equipments[selectedIndex]
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== selectedData.length;

        if (indeterminate) {
            const selectedAllIds = [...selectedData.map( item => item )]
            setCheckBoxList(selectedAllIds)
        } else {
            setCheckBoxList([])
        }
    }

    const onSelectChange = (index) => {

        if (index === 0) {
            setSelectedIndex(0)
            setSelectedOption('All')
        } else {
            setSelectedOption(caseProceduresFilters[index])
            setSelectedIndex(index)
        }
    }


    const onQuantityChangePress = (item,index) => (action) =>{

        const selectedData = equipments[selectedIndex];

        const updatedObj = {
            ...item,
            amount: action === 'add' ? item.amount + 1 : item.amount - 1
        };

        const updatedData = selectedData.map(item => {
            return item.equipment === updatedObj.equipment
                ? {...updatedObj}
                : {...item}
        })

        onEquipmentsUpdate(selectedIndex - 1, updatedData);
    }

    const onAmountInputChange = (item,index) => (value) => {

        const selectedData = equipments[selectedIndex];

        const updatedObj = {
            ...item,
            amount: value === '' ? 0 : parseInt(value)
        };

        const updatedData = selectedData.map(item => {
            return item.equipment === updatedObj.equipment
                ? {...updatedObj}
                : {...item}
        })

        onEquipmentsUpdate(selectedIndex - 1, updatedData);
    }

    const listItem = (item,index) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item?.type}</Text>
        </View>
        {
            isEditMode && selectedOption !== 'All'?

            <View style={{flex:1, alignItems:'center'}}>
                <NumberChangeField
                    onChangePress = {onQuantityChangePress(item,index)}
                    onAmountChange = {onAmountInputChange(item,index)}
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


    const renderListFn = (item,index) =>{
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={() => {}}
            onPressDisabled = {true}
            itemView={listItem(item,index)}
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
                        selected = {selectedIndex}
                        dropdownOptions = {caseProceduresFilters}
                    />
                </View>

            </View>

            <Table
                isCheckbox = {true}
                data = {equipments[selectedIndex] || []}
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
