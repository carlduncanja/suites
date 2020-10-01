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
import BrokenLineDivider from '../../../common/BrokenLineDivider';
import DataItem from '../../../common/List/DataItem';
import ContentDataItem from '../../../common/List/ContentDataItem';
import ComparisonDataItem from '../../../common/List/ComparisonDataItem';
import LineDivider from '../../../common/LineDivider';

import RightArrow from '../../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../../assets/svg/leftArrow';
import ItemArrow from '../../../../../assets/svg/itemArrow';
import CollapsedIcon from "../../../../../assets/svg/closeArrow";
import ActionIcon from "../../../../../assets/svg/dropdownIcon";

import {currencyFormatter} from '../../../../utils/formatter';
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

import { PageContext } from '../../../../contexts/PageContext';
import Data from '../../../common/Table/Data';
import moment from "moment";
import {checkboxItemPress} from "../../../../helpers/caseFilesHelpers";


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

const IconButtonContainer = styled.View`
   flex : 0.2;
`;

const DividerContainer = styled.View`
    margin-bottom : ${ ({theme}) => theme.space['--space-20']};
`;

const TableBannerContainer = styled.View`
    width : 100%;
    height : 38px;
    background-color : ${ ({theme}) => theme.colors['--accent-button']};
    justify-content : center;
    align-items : center;
    margin-bottom : ${ ({theme}) => theme.space['--space-8']};
    border-radius : 8px;
`;

const BannerText = styled.Text( ({theme}) => ({
    ...theme.font['--text-sm-medium'],
    color : theme.colors['--default-shade-white'],
}));

const ChangesDataContainer = styled.View`
    margin-bottom : ${ ({theme}) => theme.space['--space-12']};
`

export const POST_EDIT_MODE = {
    CONSUMABLES: "consumables",
    EQUIPMENTS: "equipments"
}


function PostEditView ({
    headers,
    consumables = [],
    caseProceduresFilters = [],
    caseProcedures = [],
    lastEdited = new Date(),
    caseProcedureChanges = [],
    bannerText = "Find your change submission below",
    role = "Nurse",
    mode = POST_EDIT_MODE.CONSUMABLES
}) {

    // console.log("Cae: ", caseProcedures)
    const theme = useTheme();
    const { pageState } = useContext(PageContext);
    const { isEditMode } = pageState


    const [selectedCaseProcedureIds, setSelectedCaseProcedureIds] = useState([]);
    const [variantsCheckboxList, setVariantsCheckBoxList] = useState([]);

    const [searchText, setSearchText] = useState('')
    const [selectedOption, setSelectedOption] = useState(caseProceduresFilters[0])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSearchInputChange = (input) => {
        setSearchText(input)
    }

    const toggleCheckbox = (item) => () => {
        const updatedIds = checkboxItemPress(item.caseProcedureId, selectedCaseProcedureIds)
        setSelectedCaseProcedureIds(updatedIds);
    }



    const listItem = ({ name }, onActionPress, isCollapsed, index) => <>

        <DataItem text = {name} flex = {10} color="--color-gray-800" fontStyle = "--text-base-regular"/>

        <IconButton
            Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
            onPress={onActionPress}
        />
    </>

    const changeListItem = ({ name }, onActionPress, isCollapsed, index, timeUpdated) => <>

        <DataItem text = {name} flex = {1} color="--color-blue-900" fontStyle = "--text-base-medium"/>
        <DataItem text ={`Last Edited: ${timeUpdated}`} flex = {1} color="--color-blue-900" fontStyle = "--text-xs-regular" align="flex-end"/>
        <IconButtonContainer>
            <IconButton
                Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
                onPress={onActionPress}
            />
        </IconButtonContainer>

    </>


    const childViewItem = (item, index) => {
        const { amount = 0, cost = 0, name = "" , type = ""} = item
        return (
            <>
                <ContentDataItem
                    flex = {1}
                    content = {
                        <ConsumableTextContainer>
                            <ItemArrow strokeColor = { theme.colors['--color-gray-600']}/>
                            <ConsumableText>{name}</ConsumableText>
                        </ConsumableTextContainer>
                    }
                />
                <DataItem text ={type} align = "center" fontStyle = {'--text-base-regular'} color = "--color-gray-700"/>
                {
                    <DataItem text = {amount} align = "center" fontStyle = {'--text-base-regular'} color = "--color-gray-700"/>
                }
                <DataItem text = {`$ ${currencyFormatter(cost)}`} align = "center" fontStyle = {'--text-base-regular'} color = "--color-gray-700"/>

            </>
        )
    }

    const changeChildViewItem = (item, index) => {
        const { amount = 0, cost = 0, name = "" , initialAmount = 0, type} = item
        return (
            <>
                <ContentDataItem
                    flex = {1}
                    content = {
                        <ConsumableTextContainer>
                            <ItemArrow strokeColor = { theme.colors['--color-gray-600']}/>
                            <ConsumableText>{name}</ConsumableText>
                        </ConsumableTextContainer>
                    }
                />

                <DataItem text ={type} align = "center" fontStyle = {'--text-base-regular'} color = "--color-gray-700"/>
                {
                    isEditMode === true && role === 'Admin'?
                        <ContentDataItem
                            align = "center"
                            content = {
                                <NumberChangeField
                                    backgroundColor = "#48BB78"
                                    onChangePress={()=>{}}
                                    // onAmountChange={onAmountChange(item, index)}
                                    value={amount === 0 ? "" : amount.toString()}
                                />
                            }
                        />
                    : <ComparisonDataItem
                        prevValue = {initialAmount}
                        nextValue = {amount}
                        align = "center"
                        fontStyle = {'--text-base-regular'}
                        color = "--color-gray-700"
                    />
                }

                <DataItem text = {`$ ${currencyFormatter(cost)}`} align = "center" fontStyle = {'--text-base-regular'} color = "--color-gray-700"/>

            </>
        )
    }

    const renderChildItemView = (item, index) => {
        let { _id } = item

        return (
            <Item
                itemView = {childViewItem(item, index)}
                hasCheckBox = {true}
                isChecked = {variantsCheckboxList.includes(_id)}
                onCheckBoxPress = {()=>{}}
                onItemPress = {()=>{}}
            />
        )
    };

    const renderChangeChildItemView = (item, index) => {
        let { _id } = item
        return (
            <Item
                itemView = {changeChildViewItem(item, index)}
                hasCheckBox = {false}
                isChecked = {variantsCheckboxList.includes(_id)}
                onCheckBoxPress = {()=>{}}
                onItemPress = {()=>{}}
            />
        )
    };

    const renderCollapsible = (item, index) => {

        const { procedure, inventories, equipments} = item
        let procedureItem = {
            name : procedure?.name
        };

        //  chose data depending on the mode.
        const data = mode === POST_EDIT_MODE.EQUIPMENTS ? equipments : inventories;

        return (
            <CollapsibleListItem
                isChecked={selectedCaseProcedureIds.includes(item._id)}
                // onCheckBoxPress={toggleCheckbox(item)}
                hasCheckBox={true}
                // onItemPress={()=> {}}
                render={(collapse, isCollapsed) => listItem(procedureItem, collapse, isCollapsed, index)}
            >
            <FlatList
                data={data}
                renderItem={({item, index}) => {
                    return renderChildItemView(item, index)
                }}
                keyExtractor={(item, index) => "" + index}
                ItemSeparatorComponent={() =>
                    <View style={{flex: 1, margin: 5, marginLeft: 10, borderColor: "#E3E8EF", borderWidth: .5}}/>
                }
            />

        </CollapsibleListItem>
        )
    }

    const renderChangeCollapsible = (item, index) => {

        const { procedure, inventories, equipments} = item
        let procedureItem = {name : procedure?.name};

        //  chose data depending on the mode.
        const data = mode === POST_EDIT_MODE.EQUIPMENTS ? equipments : inventories;


        //Jan 12, 2020 @ 12:30pm
        const timeUpdated = moment(lastEdited).add(3, 'hours').format('MMM DD, yyyy @ hh:mma')

        return (
            <CollapsibleListItem
                isChecked={selectedCaseProcedureIds.includes(item.caseProcedureId)}
                onCheckBoxPress={toggleCheckbox(item)}
                hasCheckBox={true}
                onItemPress={(collapse)=> { collapse()}}
                render={(collapse, isCollapsed) => changeListItem(procedureItem, collapse, isCollapsed, index, timeUpdated)}
                backgroundColor = "--color-gray-200"
            >
            <FlatList
                data={data}
                renderItem={({item, index}) => {
                    return renderChangeChildItemView(item, index)
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
                    backgroundColor="#FAFAFA"
                />

                <TableContainer>
                    <Header
                        headers = {headers}
                        toggleHeaderCheckbox = {()=>{}}
                        isCheckbox = {true}
                    />

                    <DividerContainer theme = {theme}>
                        <LineDivider/>
                    </DividerContainer>

                    <TableBannerContainer theme = {theme}>
                        <BannerText theme = {theme}>{bannerText}</BannerText>
                    </TableBannerContainer>

                    <ChangesDataContainer theme = {theme}>
                        <Data
                            listItemFormat = {renderChangeCollapsible}
                            data = {caseProcedureChanges}
                        />
                    </ChangesDataContainer>

                    <DividerContainer theme = {theme}>
                        <BrokenLineDivider/>
                    </DividerContainer>

                    <Data
                        listItemFormat = {renderCollapsible}
                        data = {caseProcedures}
                    />

                </TableContainer>

            </ConsumablesContainer>
        </ConsumablesWrapper>
    );
}

export default PostEditView;

