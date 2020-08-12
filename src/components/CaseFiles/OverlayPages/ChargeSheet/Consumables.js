import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput} from "react-native";
import Table from '../../../common/Table/Table';
import Item from '../../../common/Table/Item';
import Search from '../../../common/Search';
import DropdownInputField from '../../../common/Input Fields/DropdownInputField';
import {currencyFormatter} from '../../../../utils/formatter';
import IconButton from '../../../common/Buttons/IconButton';
import RightArrow from '../../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../../assets/svg/leftArrow';
import NumberChangeField from '../../../common/Input Fields/NumberChangeField';
import styled, {css} from '@emotion/native';


const Consumables = ({headers, consumables = [], caseProceduresFilters = [], onConsumablesUpdate, isEditMode, allItems = []}) => {

    const [checkBoxList, setCheckBoxList] = useState([])
    const [searchText, setSearchText] = useState('')
    const [selectedOption, setSelectedOption] = useState(caseProceduresFilters[0])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSearchInputChange = (input) => {
        setSearchText(input)
    }

    const toggleCheckbox = (item) => () => {
        let updatedInventories = [...checkBoxList];

        if (updatedInventories.includes(item)) {
            updatedInventories = updatedInventories.filter(caseItem => caseItem !== item)
        } else {
            updatedInventories.push(item);
        }
        setCheckBoxList(updatedInventories);
    }

    const toggleHeaderCheckbox = () => {
        const selectedData = consumables[selectedIndex];
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== selectedData.length;

        if (indeterminate) {
            const selectedAllIds = [...selectedData.map(item => item)]
            setCheckBoxList(selectedAllIds)
        } else {
            setCheckBoxList([])
        }
    }

    const onSelectChange = (index) => {

        console.log("Index:", index)
        if (index === 0) {
            setSelectedIndex(0)
            setSelectedOption('All')
        } else {
            setSelectedOption(caseProceduresFilters[index])
            setSelectedIndex(index)
        }
    }



    const onQuantityChangePress = (item, index) => (action) => {

        const selectedData = consumables[selectedIndex];

        const updatedObj = {
            ...item,
            amount: action === 'add' ? item.amount + 1 : item.amount - 1
        };

        const updatedData = selectedData.map(item => {
            return item._id === updatedObj._id
                ? {...updatedObj}
                : {...item}
        })

        onConsumablesUpdate(selectedIndex - 1, updatedData);
    }

    const listItem = (item, index) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item?.type || 'n/a'}</Text>
        </View>
        {
            isEditMode && selectedOption !== 'All'
                ? <View style={{flex: 1, alignItems: 'center'}}>
                    <NumberChangeField
                        onChangePress={onQuantityChangePress(item, index)}
                        // onAmountChange={onAmountChange(item, index)}
                        value={item.amount === 0 ? "" : item.amount.toString()}
                    />
                </View>

                : <View style={[styles.item, {alignItems: 'center'}]}>
                    <Text style={styles.itemText}>{item.amount}</Text>
                </View>

        }
        <View style={[styles.item, {alignItems: 'flex-end'}]}>
            <Text style={styles.itemText}>{`$ ${currencyFormatter(item.cost)}`}</Text>
        </View>
    </>


    const renderListFn = (item, index) => {
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={() => {}}
            onPressDisabled={true}
            itemView={listItem(item, index)}
        />
    }

    const TestWrapper = styled.View`
        flex: 1;
    `

    return (
        <TestWrapper>
            <ScrollView>

                <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20}}>
                    <View style={{flex: 2, paddingRight: 100, justifyContent:'center'}}>
                        <Search
                            placeholderText="Search by inventory item"
                            inputText={searchText}
                            changeText={onSearchInputChange}
                            backgroundColor="#FAFAFA"
                        />
                    </View>
                    <View style={{flex: 1, alignItems:'flex-start'}}>
                        <DropdownInputField
                            onSelectChange={onSelectChange}
                            value={selectedOption}
                            selected={selectedIndex}
                            dropdownOptions={caseProceduresFilters}
                        />
                    </View>
                </View>


                <Table
                    isCheckbox={true}
                    data={consumables[selectedIndex] || []}
                    listItemFormat={renderListFn}
                    headers={headers}
                    toggleHeaderCheckbox={toggleHeaderCheckbox}
                    itemSelected={checkBoxList}
                    // dataLength = {tabDetails.length}
                />
            </ScrollView>

        </TestWrapper>
    );
}

export default Consumables;

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
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
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
    },
    editItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    editTextBox: {
        backgroundColor: '#F8FAFB',
        borderColor: '#CCD6E0',
        borderWidth: 1,
        borderRadius: 4,
        padding: 6,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: 10,
        marginRight: 10
    },
})
