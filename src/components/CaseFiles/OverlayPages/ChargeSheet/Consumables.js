import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from "react-native";

import Table from '../../../common/Table/Table';
import Item from '../../../common/Table/Item';
import Search from '../../../common/Search';
import DropdownInputField from '../../../common/Input Fields/DropdownInputField';
import NumberChangeField from '../../../common/Input Fields/NumberChangeField';
import Header from '../../../common/Table/Header';
import CollapsibleListItem from "../../../common/List/CollapsibleListItem";
import IconButton from '../../../common/Buttons/IconButton';

import RightArrow from '../../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../../assets/svg/leftArrow';
import ItemArrow from '../../../../../assets/svg/itemArrow';
import CollapsedIcon from "../../../../../assets/svg/closeArrow";
import ActionIcon from "../../../../../assets/svg/dropdownIcon";

import {currencyFormatter} from '../../../../utils/formatter';
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';
import DataItem from '../../../common/List/DataItem';
import ContentDataItem from '../../../common/List/ContentDataItem';
import { PageContext } from '../../../../contexts/PageContext';


const headers = [
    {
        name: "Item Name",
        alignment: "flex-start"
    },
    {
        name: "Type",
        alignment: "center"
    },
    {
        name: "Quantity",
        alignment: "center"
    },
    {
        name: "Unit Price",
        alignment: "flex-end"
    }
];

const ConsumablesWrapper = styled.View`
    flex:1;
`;
const ConsumablesContainer = styled.View`
    height : 100%;
    width : 100%;
`;

const TableContainer = styled.View`
    margin-top : ${ ({theme}) => theme.space['--space-12']};
`;

const ConsumableTextContainer = styled.View` 
    flex-direction : row;
    justify-content : center;
`;
const ConsumableText = styled.Text( ({theme}) => ({
    ...theme.font['--text-sm-medium'],
    color : theme.colors['--color-blue-600'],
    paddingLeft : 14,
}));

function Consumables ({
    headers, 
    consumables = [], 
    caseProceduresFilters = [], 
    caseProcedures = [] ,
    onConsumablesUpdate, 
    allItems = []
}) {

    // console.log("Cae: ", caseProcedures)
    const theme = useTheme();
    const { pageState } = useContext(PageContext);
    const { isEditMode } = pageState

    // console.log("caseProcedures: ", caseProcedures);


    const [checkBoxList, setCheckBoxList] = useState([]);
    const [variantsCheckboxList, setVariantsCheckBoxList] = useState([]);

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

    const onQuantityChangePress = (item, index, sectionIndex) => (action) => {

        const selectedData = caseProcedures[sectionIndex].inventories;

        const updatedObj = {
            ...item,
            amount: action === 'add' ? item.amount + 1 : item.amount - 1
        };

        const updatedData = selectedData.map(item => {
            return item._id === updatedObj._id
                ? {...updatedObj}
                : {...item}
        })

        onConsumablesUpdate(sectionIndex, updatedData);
    }

    const listItem = ({ name }, onActionPress, isCollapsed, index) => <>
        <DataItem text = {name} flex = {10} color="--color-gray-800" fontStyle = "--text-base-regular"/>

        <IconButton
            Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
            onPress={onActionPress}
        />
    </>

    const childViewItem = (item, itemIndex, sectionIndex) => {
        const { amount = 0, cost = 0, name = "" , type = ""} = item

        return (
            <>
                <DataItem text ={name} fontStyle = {'--text-sm-medium'} color = "--color-blue-600"/>
                <DataItem text ={type} align = "center" fontStyle = {'--text-base-regular'} color = "--color-gray-700"/>
                {
                    isEditMode === true ?
                    <ContentDataItem
                        align = "center"
                        content = {
                            <NumberChangeField
                                onChangePress={onQuantityChangePress(item, itemIndex, sectionIndex)}
                                value={amount === 0 ? "" : amount.toString()}
                                borderColor = '--color-green-500'
                                backgroundColor = '--color-green-100'
                            />
                        }
                    />
                    :
                    <DataItem text = {amount} align = "center" fontStyle = {'--text-base-regular'} color = "--color-gray-700"/>
                }
                <DataItem text = {`$ ${currencyFormatter(cost)}`} align = "center" fontStyle = {'--text-base-regular'} color = "--color-gray-700"/>

                {/* <View style={[styles.item, {justifyContent: 'flex-start', flex: 1.5}]}>
                    <SvgIcon iconName="doctorArrow" strokeColor="#718096"/>
                    <ItemArrow strokeColor = "#718096"/>
                    <Text style={{color: "#3182CE", fontSize: 16, marginLeft: 10}}>
                        {name}
                    </Text>
                </View> */}

                {/* <View style={[
                    styles.item, {justifyContent: "center"}
                ]}>
                    <Text style={[styles.itemText]}>
                        n/a
                    </Text>
                </View> */}

                {/* <View style={[
                    styles.item, {justifyContent: "center"}
                ]}>
                    <Text style={[styles.itemText]}>
                        {amount}
                    </Text>
                </View>

                <View style={[
                    styles.item, {justifyContent: "center"}
                ]}>
                    <Text style={[styles.itemText]}>
                        {`$ ${currencyFormatter(cost)}`}
                    </Text>
                </View> */}
            </>
        )
    }
    // const renderListFn = (item, index) => {
    //     return <Item
    //         hasCheckBox={true}
    //         isChecked={checkBoxList.includes(item)}
    //         onCheckBoxPress={toggleCheckbox(item)}
    //         onItemPress={() => {
    //         }}
    //         onPressDisabled={true}
    //         itemView={listItem(item, index)}
    //     />
    // }

    const renderChildItemView = (item, itemIndex, sectionIndex) => {
        let { _id } = item

        return (
            <Item
                itemView = {childViewItem(item, itemIndex, sectionIndex)}
                hasCheckBox = {true}
                isChecked = {variantsCheckboxList.includes(_id)}
                onCheckBoxPress = {()=>{}}
                onItemPress = {()=>{}}
            />
        )
    };

    const renderCollapsible = (item, sectionIndex) => {
        const { procedure, inventories} = item

        let procedureItem = {
            name : procedure?.name
        };

        return (
            <CollapsibleListItem
                isChecked={checkBoxList.includes(item._id)}
                onCheckBoxPress={ ()=> {}}
                hasCheckBox={true}
                onItemPress={ ()=> {}}
                render={(collapse, isCollapsed) => listItem(procedureItem, collapse, isCollapsed, sectionIndex)}
            >
            <FlatList
                data={inventories}
                renderItem={({item, index}) => {
                    return renderChildItemView(item, index, sectionIndex)
                }}
                keyExtractor={(item, index) => "" + index}
                ItemSeparatorComponent={() =>
                    <View style={{flex: 1, margin: 5, marginLeft: 10, borderColor: "#E3E8EF", borderWidth: .5}}/>
                }
            />

        </CollapsibleListItem>
        )
    }

    return (
        <ConsumablesWrapper>
            <ConsumablesContainer>

                <Search
                    placeholderText="Search by inventory item"
                    inputText={searchText}
                    changeText={onSearchInputChange}
                    backgroundColor={theme.colors['--color-neutral-gray-100']}
                />

                <TableContainer theme = {theme}>

                    <Table
                        isCheckbox={true}
                        data={caseProcedures}
                        listItemFormat={renderCollapsible}
                        headers={headers}
                        toggleHeaderCheckbox={()=>{}}
                        itemSelected={checkBoxList}
                    />

                </TableContainer>

            </ConsumablesContainer>
        </ConsumablesWrapper>
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
