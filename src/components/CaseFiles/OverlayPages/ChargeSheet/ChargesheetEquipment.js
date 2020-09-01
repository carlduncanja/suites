import React, { useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import Table from '../../../common/Table/Table';
import Item from '../../../common/Table/Item';
import Search from '../../../common/Search';
import NumberChangeField from '../../../common/Input Fields/NumberChangeField';
import DropdownInputField from '../../../common/Input Fields/DropdownInputField';

import ItemArrow from '../../../../../assets/svg/itemArrow';
import CollapsedIcon from "../../../../../assets/svg/closeArrow";
import ActionIcon from "../../../../../assets/svg/dropdownIcon";
import {currencyFormatter} from '../../../../utils/formatter';
import CollapsibleListItem from "../../../common/List/CollapsibleListItem";
import IconButton from '../../../common/Buttons/IconButton';
import DataItem from '../../../common/List/DataItem';
import ContentDataItem from '../../../common/List/ContentDataItem';

import { PageContext } from '../../../../contexts/PageContext';

import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

const EquipmentsWrapper = styled.View`
    flex:1;
`;
const EquipmentsContainer = styled.View`
    height : 100%;
    width : 100%;
`;

const TableContainer = styled.View`
    margin-top : ${ ({theme}) => theme.space['--space-12']};
`;

const EquipmentTextContainer = styled.View` 
    flex-direction : row;
    justify-content : center;
`;
const EquipmentText = styled.Text( ({theme}) => ({
    ...theme.font['--text-sm-medium'],
    color : theme.colors['--color-blue-600'],
    paddingLeft : 14,
}));
 
function ChargesheetEquipment({
    headers, 
    equipments = [], 
    caseProceduresFilters = [], 
    onEquipmentsUpdate, 
    // handleEditDone = () => {}, 
    // isEditMode = false, 
    allItems = [],
    caseProcedures = [],
}) {

    console.log("Case procedures: ", caseProcedures)
    const theme = useTheme();
    const { pageState } = useContext(PageContext);
    const { isEditMode } = pageState

    const [checkBoxList, setCheckBoxList] = useState([]);
    const [variantsCheckboxList, setVariantsCheckBoxList] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState(caseProceduresFilters[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);

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

    const listItem = ({ name }, onActionPress, isCollapsed, index) => <>
        <DataItem text = {name} flex = {10} color="--color-gray-800" fontStyle = "--text-base-regular"/>

        <IconButton
            Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
            onPress={onActionPress}
        />
    </>

    // const listItem = (item,index) => <>
    //     <View style={styles.item}>
    //         <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
    //     </View>
    //     <View style={[styles.item, {alignItems: 'center'}]}>
    //         <Text style={styles.itemText}>{item?.type || 'n/a'}</Text>
    //     </View>
    //     { 
    //         isEditMode && selectedOption !== 'All'?

    //         <View style={{flex:1, alignItems:'center'}}>
    //             <NumberChangeField
    //                 onChangePress = {onQuantityChangePress(item,index)}
    //                 onAmountChange = {onAmountInputChange(item,index)}
    //                 value = {item.amount === 0 ? "" : item.amount.toString()}
    //             />
    //         </View>

    //         :
    //         <View style={[styles.item, {alignItems: 'center'}]}>
    //             <Text style={styles.itemText}>{item.amount}</Text>
    //         </View>

    //     }
    //     <View style={[styles.item, {alignItems: 'flex-end'}]}>
    //         <Text style={styles.itemText}>{`$ ${currencyFormatter(item.cost)}`}</Text>
    //     </View>

    // </>


    // const renderListFn = (item,index) =>{
    //     return <Item
    //         hasCheckBox={true}
    //         isChecked={checkBoxList.includes(item)}
    //         onCheckBoxPress={toggleCheckbox(item)}
    //         onItemPress={() => {}}
    //         onPressDisabled = {true}
    //         itemView={listItem(item,index)}
    //     />
    // }

    const childViewItem = (item, itemIndex, sectionIndex) => {
        const { amount = 0, cost = 0, name = "" , type = "n/a"} = item

        return (
            <>
                <DataItem text ={name} fontStyle = {'--text-sm-medium'} color = "--color-blue-600"/>

                {/* <ContentDataItem
                    flex = {1}
                    content = {
                        <EquipmentTextContainer>
                            <ItemArrow strokeColor = { theme.colors['--color-gray-600']}/>
                            <EquipmentText>{name}</EquipmentText>
                        </EquipmentTextContainer>
                    }
                /> */}
                
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

            </>
        )
    }

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
        const { procedure, equipments} = item

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
                data={equipments}
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

        <EquipmentsWrapper>
            <EquipmentsContainer>

                <Search
                    placeholderText = "Search by Item Name, or Type"
                    inputText = {searchText}
                    changeText = {onSearchInputChange}
                    backgroundColor = {theme.colors['--color-neutral-gray-100']}
                />

                <TableContainer theme = {theme}>

                    <Table
                        isCheckbox = {true}
                        data = {caseProcedures}
                        listItemFormat = {renderCollapsible}
                        // listItemFormat = {()=>{}}
                        headers = {headers}
                        toggleHeaderCheckbox = { ()=> {} }
                        itemSelected = {checkBoxList}
                    />

                </TableContainer>

            </EquipmentsContainer>
        </EquipmentsWrapper>
        // <ScrollView>

        //     <View style={{flex:1, justifyContent:'space-between', flexDirection:'row', marginBottom:20}}>
        //         <View style={{flex:2, paddingRight:100, justifyContent:'center'}}>
        //             <Search
        //                 placeholderText = "Search by equipment item"
        //                 inputText = {searchText}
        //                 changeText = {onSearchInputChange}
        //                 backgroundColor = "#FAFAFA"
        //             />
        //         </View>
        //         <View style={{flex:1}}>
        //             <DropdownInputField
        //                 onSelectChange = {onSelectChange}
        //                 value = {selectedOption}
        //                 selected = {selectedIndex}
        //                 dropdownOptions = {caseProceduresFilters}
        //             />
        //         </View>

        //     </View>

        //     <Table
        //         isCheckbox = {true}
        //         data = {equipments[selectedIndex] || []}
        //         listItemFormat = {renderListFn}
        //         headers = {headers}
        //         toggleHeaderCheckbox = {toggleHeaderCheckbox}
        //         itemSelected = {checkBoxList}
        //         // dataLength = {tabDetails.length}
        //     />
        // </ScrollView>
    
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
