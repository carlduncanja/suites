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
import {useTheme} from 'emotion-theming';

import {PageContext} from '../../../../contexts/PageContext';
import Data from '../../../common/Table/Data';
import moment from "moment";
import {checkboxItemPress} from "../../../../helpers/caseFilesHelpers";
import {emptyFn} from "../../../../const";


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
    margin-top : ${({theme}) => theme.space['--space-12']};
`;

const ConsumableTextContainer = styled.View`
    flex-direction : row;
    justify-content : center;
`;
const ConsumableText = styled.Text(({theme}) => ({
    ...theme.font['--text-sm-medium'],
    color: theme.colors['--color-blue-600'],
    paddingLeft: 14,
}));

const IconButtonContainer = styled.View`
   flex : 0.2;
`;

const DividerContainer = styled.View`
    margin-bottom : ${({theme}) => theme.space['--space-20']};
`;

const TableBannerContainer = styled.View`
    width : 100%;
    height : 38px;
    background-color : ${({theme}) => theme.colors['--accent-button']};
    justify-content : center;
    align-items : center;
    margin-bottom : ${({theme}) => theme.space['--space-8']};
    border-radius : 8px;
`;

const BannerText = styled.Text(({theme}) => ({
    ...theme.font['--text-sm-medium'],
    color: theme.colors['--default-shade-white'],
}));

const ChangesDataContainer = styled.View`
    margin-bottom : ${({theme}) => theme.space['--space-12']};
`

export const POST_EDIT_MODE = {
    CONSUMABLES: "consumables",
    EQUIPMENTS: "equipments"
}


function PostEditView({
                          headers,
                          caseProcedures = [],
                          lastEdited = new Date(),
                          caseProcedureChanges = [],
                          bannerText = "Find your change submission below",
                          isEditMode = false,
                          selectedLineItems = [],
                          selectedCaseProcedureIds = [],
                          onCaseProcedureItemUpdated = emptyFn,
                          onLineItemSelected = emptyFn,
                          onSelectCaseProcedureId = emptyFn,
                          mode = POST_EDIT_MODE.CONSUMABLES,
                      }) {

    const theme = useTheme();

    console.log("helllooo??? selectedCaseProcedureIds", selectedCaseProcedureIds);

    const [searchText, setSearchText] = useState('')

    const onSearchInputChange = (input) => {
        setSearchText(input)
    }

    const toggleCheckbox = (item) => () => {
        const updatedIds = checkboxItemPress(item.caseProcedureId, selectedCaseProcedureIds)
        onSelectCaseProcedureId(updatedIds);
    }

    const toggleChildCheckbox = (item, parentId) => () => {
        const {_id: variantId} = item;

        let variantsToUpdate = [...selectedLineItems];
        const parentIds = variantsToUpdate.map(variantObjects => variantObjects._parentId);
        const selectedVariantGroupIndex = parentIds.indexOf(parentId);

        // find the variant object to include.
        if (selectedVariantGroupIndex >= 0) {

            // add or remove equipment from group from
            let equipmentVariants = variantsToUpdate[selectedVariantGroupIndex].variants
            equipmentVariants = checkboxItemPress(variantId, equipmentVariants)
            variantsToUpdate[selectedVariantGroupIndex].variants = equipmentVariants

            onLineItemSelected([...variantsToUpdate]);
        } else {
            onLineItemSelected([...variantsToUpdate, {
                _parentId: parentId,
                variants: [variantId]
            }])
        }
    }

    const onQuantityChangePress = (item, index, caseProcedureId) => (action) => {
        const updatedObj = {
            ...item,
            amount: action === 'add' ? item.amount + 1 : item.amount - 1
        };

        onCaseProcedureItemUpdated(updatedObj, caseProcedureId);
    }

    const listItem = ({name}, onActionPress, isCollapsed, index) => <>
        <DataItem text={name} flex={10} color="--color-gray-800" fontStyle="--text-base-regular"/>

        <IconButton
            Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
            onPress={onActionPress}
        />
    </>

    const changeListItem = ({name}, onActionPress, isCollapsed, index, timeUpdated) => <>

        <DataItem text={name} flex={1} color="--color-blue-900" fontStyle="--text-base-medium"/>
        <DataItem text={`Last Edited: ${timeUpdated}`} flex={1} color="--color-blue-900" fontStyle="--text-xs-regular"
                  align="flex-end"/>
        <IconButtonContainer>
            <IconButton
                Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
                onPress={onActionPress}
            />
        </IconButtonContainer>

    </>

    const childViewItem = (item, index) => {
        const {amount = 0, cost = 0, name = "", type = ""} = item
        return (
            <>
                <ContentDataItem
                    flex={1}
                    content={
                        <ConsumableTextContainer>
                            <ItemArrow strokeColor={theme.colors['--color-gray-600']}/>
                            <ConsumableText>{name}</ConsumableText>
                        </ConsumableTextContainer>
                    }
                />
                <DataItem text={type} align="center" fontStyle={'--text-base-regular'} color="--color-gray-700"/>
                {
                    <DataItem text={amount} align="center" fontStyle={'--text-base-regular'} color="--color-gray-700"/>
                }
                <DataItem text={`$ ${currencyFormatter(cost)}`} align="center" fontStyle={'--text-base-regular'}
                          color="--color-gray-700"/>

            </>
        )
    }

    const changeChildViewItem = (item, index, caseProcedureId) => {
        const {amount = 0, cost = 0, name = "", initialAmount = 0, type} = item



        return (
            <>
                <ContentDataItem
                    flex={1}
                    content={
                        <ConsumableTextContainer>
                            <ItemArrow strokeColor={theme.colors['--color-gray-600']}/>
                            <ConsumableText>{name}</ConsumableText>
                        </ConsumableTextContainer>
                    }
                />

                <DataItem text={type} align="center" fontStyle={'--text-base-regular'} color="--color-gray-700"/>
                {
                    isEditMode ?
                        <ContentDataItem
                            align="center"
                            content={
                                <NumberChangeField
                                    onChangePress={onQuantityChangePress(item, index, caseProcedureId)}
                                    value={amount === 0 ? "" : amount.toString()}
                                    borderColor='--color-green-500'
                                    backgroundColor='--color-green-100'
                                />
                            }
                        />
                        : <ComparisonDataItem
                            prevValue={initialAmount}
                            nextValue={amount}
                            align="center"
                            fontStyle={'--text-base-regular'}
                            color="--color-gray-700"
                        />
                }

                <DataItem text={`$ ${currencyFormatter(cost)}`} align="center" fontStyle={'--text-base-regular'}
                          color="--color-gray-700"/>

            </>
        )
    }

    const renderChildItemView = (item, index, caseProcedureId) => {
        return (
            <Item
                itemView={childViewItem(item, index)}
                hasCheckBox={true}
            />
        )
    };

    const renderChangeChildItemView = (item, index, caseProcedureId) => {
        let {_id} = item
        let selectedGroup = selectedLineItems?.find(obj => obj._parentId === caseProcedureId);
        const variants = selectedGroup?.variants || [];
        const isChecked = variants.includes(_id)

        return (
            <Item
                itemView={changeChildViewItem(item, index, caseProcedureId)}
                hasCheckBox={true}
                isChecked={isChecked}
                onCheckBoxPress={toggleChildCheckbox(item, caseProcedureId)}
                onItemPress={() => {
                }}
            />
        )
    };

    const renderCollapsible = (item, index) => {

        const {caseProcedureId, procedure, inventories, equipments} = item
        let procedureItem = {
            name: procedure?.name
        };

        //  chose data depending on the mode.
        const data = mode === POST_EDIT_MODE.EQUIPMENTS ? equipments : inventories;

        return (
            <CollapsibleListItem
                hasCheckBox={true}
                render={(collapse, isCollapsed) => listItem(procedureItem, collapse, isCollapsed, index)}
            >
                <FlatList
                    data={data}
                    renderItem={({item, index}) => {
                        return renderChildItemView(item, index, caseProcedureId)
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

        const {procedure, inventories, equipments, caseProcedureId} = item
        let procedureItem = {name: procedure?.name};

        //  chose data depending on the mode.
        const data = mode === POST_EDIT_MODE.EQUIPMENTS ? equipments : inventories;


        //Jan 12, 2020 @ 12:30pm
        const timeUpdated = moment(lastEdited).add(3, 'hours').format('MMM DD, yyyy @ hh:mma')

        return (
            <CollapsibleListItem
                isChecked={selectedCaseProcedureIds.includes(caseProcedureId)}
                onCheckBoxPress={toggleCheckbox(item)}
                hasCheckBox={true}
                onItemPress={(collapse) => {
                    collapse()
                }}
                render={(collapse, isCollapsed) => changeListItem(procedureItem, collapse, isCollapsed, index, timeUpdated)}
                backgroundColor="--color-gray-200"
            >
                <FlatList
                    data={data}
                    renderItem={({item, index}) => {
                        return renderChangeChildItemView(item, index, caseProcedureId)
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
                        headers={headers}
                        toggleHeaderCheckbox={() => {
                        }}
                        isCheckbox={true}
                    />

                    <DividerContainer theme={theme}>
                        <LineDivider/>
                    </DividerContainer>

                    <TableBannerContainer theme={theme}>
                        <BannerText theme={theme}>{bannerText}</BannerText>
                    </TableBannerContainer>

                    <ChangesDataContainer theme={theme}>
                        <Data
                            listItemFormat={renderChangeCollapsible}
                            data={caseProcedureChanges}
                        />
                    </ChangesDataContainer>

                    <DividerContainer theme={theme}>
                        <BrokenLineDivider/>
                    </DividerContainer>

                    <Data
                        listItemFormat={renderCollapsible}
                        data={caseProcedures}
                    />

                </TableContainer>

            </ConsumablesContainer>
        </ConsumablesWrapper>
    );
}

export default PostEditView;

