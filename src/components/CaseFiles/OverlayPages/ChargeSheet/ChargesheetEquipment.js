import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from "react-native";
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

import {PageContext} from '../../../../contexts/PageContext';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {useModal} from 'react-native-modalfy';
import {checkboxItemPress} from "../../../../helpers/caseFilesHelpers";

const EquipmentsWrapper = styled.View`
    flex:1;
`;
const EquipmentsContainer = styled.View`
    height : 100%;
    width : 100%;
`;

const TableContainer = styled.View`
    margin-top : ${({theme}) => theme.space['--space-12']};
`;

const EquipmentTextContainer = styled.View` 
    flex-direction : row;
    justify-content : center;
`;
const EquipmentText = styled.Text(({theme}) => ({
    ...theme.font['--text-sm-medium'],
    color: theme.colors['--color-blue-600'],
    paddingLeft: 14,
}));

function ChargesheetEquipment({
                                  headers,
                                  equipments = [],
                                  caseProceduresFilters = [],
                                  onEquipmentsUpdate,
                                  onSelectEquipments,
                                  onSelectEquipmenntsVariants,
                                  selectedEquipments = [],
                                  variantsEquipments = [],
                                  allItems = [],
                                  caseProcedures = [],
                              }) {
//  console.log("Procedures: ", caseProcedures)

    const theme = useTheme();
    const modal = useModal();
    const {pageState} = useContext(PageContext);
    const {isEditMode} = pageState

    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState(caseProceduresFilters[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSearchInputChange = (input) => {
        setSearchText(input)
    }

    const toggleCheckbox = (item, parentId) => () => {
        const {equipment: variantId} = item;

        let variantsToUpdate = [...variantsEquipments];
        const parentIds = variantsToUpdate.map(variantObjects => variantObjects.parentId);
        const selectedVariantGroupIndex = parentIds.indexOf(parentId);

        // find the variant object to include.
        if (selectedVariantGroupIndex >= 0) {
            // add or remove equipment from group from
            let equipmentVariants = variantsToUpdate[selectedVariantGroupIndex].variants
            equipmentVariants = checkboxItemPress(variantId, equipmentVariants)
            variantsToUpdate[selectedVariantGroupIndex].variants = equipmentVariants

            onSelectEquipmenntsVariants([...variantsToUpdate]);
        } else {
            onSelectEquipmenntsVariants([...variantsToUpdate, {
                _parentId: parentId,
                variants: [variantId]
            }])
        }
    }

    const toggleHeaderCheckbox = () => {

        let updatedChecboxList = []
        let updatedVariants = []
        const indeterminate = selectedEquipments.length >= 0 && selectedEquipments.length !== caseProcedures.length

        if (indeterminate) {
            caseProcedures.map(procedure => {
                let {equipments = []} = procedure;
                updatedChecboxList.push(procedure?.caseProcedureId);

                let variantCheckboxList = [...equipments.map(item => item?.equipment)]

                updatedVariants.push(
                    {
                        _parentId: procedure?.caseProcedureId,
                        variants: variantCheckboxList
                    }
                )

            });
            onSelectEquipmenntsVariants(updatedVariants)
            onSelectEquipments(updatedChecboxList)

        } else {
            // setCheckBoxList([])
            onSelectEquipmenntsVariants([])
            onSelectEquipments([])
        }

    }

    const toggleParentCheckBox = (item) => {
        // selected case procedure appointment.
        let itemId = item?.caseProcedureId
        const updateIds = checkboxItemPress(itemId, selectedEquipments)
        onSelectEquipments(updateIds);
    }

    const onQuantityChangePress = (item, index, sectionIndex) => (action) => {

        const selectedData = caseProcedures[sectionIndex].equipments;

        const updatedObj = {
            ...item,
            amount: action === 'add' ? item.amount + 1 : item.amount - 1
        };

        const updatedData = selectedData.map(item => {
            return item.equipment === updatedObj.equipment
                ? {...updatedObj}
                : {...item}
        })
        onEquipmentsUpdate(selectedIndex, updatedData);
    }

    const onAmountInputChange = (item, index) => (value) => {

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

    const listItem = ({name}, onActionPress, isCollapsed, index) => <>
        <DataItem text={name} flex={10} color="--color-gray-800" fontStyle="--text-base-regular"/>

        <IconButton
            Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
            onPress={onActionPress}
        />
    </>


    const childViewItem = (item, itemIndex, sectionIndex) => {
        const {amount = 0, cost = 0, name = "", type = "n/a"} = item

        return (
            <>
                <DataItem text={name} fontStyle={'--text-sm-medium'} color="--color-blue-600"/>

                {/* <ContentDataItem
                    flex = {1}
                    content = {
                        <EquipmentTextContainer>
                            <ItemArrow strokeColor = { theme.colors['--color-gray-600']}/>
                            <EquipmentText>{name}</EquipmentText>
                        </EquipmentTextContainer>
                    }
                /> */}

                <DataItem text={type} align="center" fontStyle={'--text-base-regular'} color="--color-gray-700"/>
                {
                    isEditMode === true ?
                        <ContentDataItem
                            align="center"
                            content={
                                <NumberChangeField
                                    onChangePress={onQuantityChangePress(item, itemIndex, sectionIndex)}
                                    value={amount === 0 ? "" : amount.toString()}
                                    borderColor='--color-green-500'
                                    backgroundColor='--color-green-100'
                                />
                            }
                        />
                        :
                        <DataItem text={amount} align="center" fontStyle={'--text-base-regular'}
                                  color="--color-gray-700"/>
                }
                <DataItem text={`$ ${currencyFormatter(cost)}`} align="center" fontStyle={'--text-base-regular'}
                          color="--color-gray-700"/>

            </>
        )
    }

    const renderChildItemView = (item, parentId, itemIndex, sectionIndex) => {
        let {_id, equipment} = item
        // let { variants = [] } = variantsEquipments?.find( obj => obj._parentId === parentId);
        // let equipmentIds = variantsEquipments.map(item => item.variantId);
        let selectedGroup = variantsEquipments?.find(obj => obj._parentId === parentId);
        const variants = selectedGroup?.variants || [];

        return (
            <Item
                itemView={childViewItem(item, itemIndex, sectionIndex)}
                hasCheckBox={true}
                isChecked={variants.includes(equipment)}
                onCheckBoxPress={toggleCheckbox(item, parentId)}
                onItemPress={() => {
                }}
            />
        )
    };

    const renderCollapsible = (item, sectionIndex) => {
        const {procedure, equipments, caseProcedureId} = item

        let procedureItem = {
            name: procedure?.name
        };

        return (
            <CollapsibleListItem
                isChecked={selectedEquipments.includes(item?.caseProcedureId)}
                onCheckBoxPress={() => toggleParentCheckBox(item)}
                hasCheckBox={true}
                onItemPress={() => {
                }}
                render={(collapse, isCollapsed) => listItem(procedureItem, collapse, isCollapsed, sectionIndex)}
            >
                <FlatList
                    data={equipments}
                    renderItem={({item, index}) => {
                        return renderChildItemView(item, caseProcedureId, index, sectionIndex)
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
                    placeholderText="Search by Item Name, or Type"
                    inputText={searchText}
                    changeText={onSearchInputChange}
                    backgroundColor={theme.colors['--color-neutral-gray-100']}
                />

                <TableContainer theme={theme}>

                    <Table
                        isCheckbox={true}
                        data={caseProcedures}
                        listItemFormat={renderCollapsible}
                        // listItemFormat = {()=>{}}
                        headers={headers}
                        toggleHeaderCheckbox={toggleHeaderCheckbox}
                        itemSelected={selectedEquipments}
                    />

                </TableContainer>

            </EquipmentsContainer>
        </EquipmentsWrapper>


    );
}

export default ChargesheetEquipment;


