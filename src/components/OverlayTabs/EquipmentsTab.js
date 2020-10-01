import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from 'emotion-theming';
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import {currencyFormatter, formatDate} from '../../utils/formatter';
import {checkboxItemPress} from '../../helpers/caseFilesHelpers';
import CollapsibleListItem from '../common/List/CollapsibleListItem';
import DataItem from '../common/List/DataItem';
import RightBorderDataItem from '../common/List/RightBorderDataItem';
import ContentDataItem from '../common/List/ContentDataItem';
import LevelIndicator from '../common/LevelIndicator/LevelIndicator';
import MultipleShadowsContainer from '../common/MultipleShadowContainer';
import IconButton from '../common/Buttons/IconButton';
import ActionIcon from '../../../assets/svg/dropdownIcon';
import CollapsedIcon from '../../../assets/svg/closeArrow';

const testData = [
    {
        name: 'Bag',
        type: 'Anaesthesia',
        quantity: 1,
        unitPrice: 4120.76
    },
    {
        name: 'Atracurium',
        type: 'Anaesthesia',
        quantity: 5,
        unitPrice: 8924.09
    }
];

const headers = [
    {
        name: 'Equipment',
        alignment: 'flex-start',
        styles: {flex: 2}
    },
    {
        name: 'Quantity',
        alignment: 'center'
    },
    {
        name: 'Status',
        alignment: 'center'
    },
    {
        name: 'Available on',
        alignment: 'center'
    }
];

const EquipmentsTab = ({equipments = testData}) => {
    const theme = useTheme();

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedEquipments, setSelectedEquipments] = useState([]);

    const [expandedItems, setExpandedItems] = useState([]);

    const onCheckBoxPress = item => () => {
        const {_id} = item;

        const updatedStorageLocations = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedStorageLocations);

        const removeChildren = selectedEquipments.filter(obj => obj.equipmentTypeId !== _id);
        setSelectedEquipments(removeChildren);
    };

    const onChildCheckBoxPress = (inventoryItem, storageLocation) => () => {
    };

    const onCollapseView = key => {
        if (expandedItems.includes(key)) setExpandedItems(expandedItems.filter(item => item !== key));
        else setExpandedItems([...expandedItems, key]);
    };

    const equipmentTypeItemView = ({equipmentTypeName, availableOn, equipments = []}, onActionPress, isCollapsed) => (
        <>
            {
                isCollapsed ? (
                    <DataItem
                        text={equipmentTypeName}
                        flex={1.5}
                        color="--color-gray-800"
                        fontStyle="--text-base-regular"
                    />
                ) : (
                    <RightBorderDataItem
                        text={equipmentTypeName}
                        flex={1.5}
                        color="--color-gray-800"
                        fontStyle="--text-base-regular"
                    />
                )
            }
            <DataItem flex={1} text={equipments.length} color="--color-gray-800" fontStyle="--text-base-regular" align="center"/>
            <DataItem flex={1} text="--" color="--color-purple-700" fontStyle="--text-base-regular" align="center"/>
            <DataItem flex={1} text={availableOn} color="--color-gray-700" fontStyle="--text-base-regular" align="center"/>
            <ContentDataItem
                align="center"
                flex={0.5}
                content={(
                    <IconButton
                        Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
                        onPress={onActionPress}
                    />
                )}
            />
        </>
    );

    const equipmentItemView = ({equipmentName: name, status, startTime, endTime}, onActionPress) => {
        const availableStatusColor = '--color-green-600';
        const servicingStatusColor = '--color-orange-600';
        const inUseStatusColor = '--color-indigo-600';
        const damagedStatusColor = '--color-red-600';

        const evaluateColor = () => {
            if (status === 'Available') return availableStatusColor;
            if (status === 'Servicing') return servicingStatusColor;
            if (status === 'In Use') return inUseStatusColor;
            if (status === 'Damaged') return damagedStatusColor;
            return '--color-gray-700';
        };

        return (
            <>
                <RightBorderDataItem
                    text={name}
                    flex={1.5}
                    color="--color-blue-600"
                    fontStyle="--text-sm-medium"
                />
                <DataItem flex={1} text="1" color="--color-gray-800" fontStyle="--text-sm-regular" align="center"/>
                {/* TODO: Eval different colors to show based on status */}
                <DataItem flex={1} text={status} color={evaluateColor()} fontStyle="--text-sm-regular" align="center"/>
                <DataItem flex={1} text={formatDate(endTime, 'DD/MM/YYYY')} color="--color-gray-800" fontStyle="--text-sm-regular" align="center"/>
                <DataItem flex={0.5}/>
            </>
        );
    };

    const renderChildItemView = (item, parentItem, onActionPress) => {
        const {_id} = item;
        const equipmentIds = selectedEquipments.map(obj => obj._id);

        return (
            <Item
                itemView={equipmentItemView(item, onActionPress)}
                hasCheckBox={true}
                isChecked={equipmentIds.includes(_id)}
                onCheckBoxPress={onChildCheckBoxPress(item, parentItem)}
                onItemPress={() => {
                }}
            />
        );
    };

    const renderListFn = item => {
        const {appointmentId, _id, equipments = []} = item;

        const isIndeterminate = selectedEquipments.some(equipment => equipment.equipmentTypeId === _id);

        return <CollapsibleListItem
            hasCheckBox={true}
            isChecked={selectedIds.includes(_id)}
            isIndeterminate={isIndeterminate}
            onCheckBoxPress={onCheckBoxPress(item)}
            onItemPress={() => console.info('Equipment Type Selected:', item)}
            collapsed={!expandedItems.includes(_id)}
            onCollapsedEnd={() => onCollapseView(_id)}
            render={(collapse, isCollapsed) => equipmentTypeItemView(item, collapse, isCollapsed)}
        >
            <FlatList
                data={equipments}
                nestedScrollEnabled={true}
                renderItem={({item: childItem}) => renderChildItemView(childItem, item, () => {
                })}
                keyExtractor={(item, index) => `${index}`}
                ItemSeparatorComponent={() => (
                    <View style={{
                        flex: 1,
                        margin: 10,
                        marginLeft: 10,
                        borderColor: '#E3E8EF',
                        borderWidth: 0.5
                    }}
                    />
                )}
            />
        </CollapsibleListItem>;
    };

    return (
        <ScrollView>
            <Table
                isCheckbox={true}
                data={equipments}
                listItemFormat={renderListFn}
                headers={headers}
                itemSelected={selectedIds}
            />
        </ScrollView>
    );
};

export default EquipmentsTab;

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
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    item: {flex: 1},
    itemText: {
        fontSize: 16,
        color: '#4A5568',
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
    }
});
