import { useTheme } from 'emotion-theming';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import CollapsedIcon from '../../../assets/svg/closeArrow';
import ActionIcon from '../../../assets/svg/dropdownIcon';
import { checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import { formatDate } from '../../utils/formatter';
import IconButton from '../common/Buttons/IconButton';
import CollapsibleListItem from '../common/List/CollapsibleListItem';
import ContentDataItem from '../common/List/ContentDataItem';
import DataItem from '../common/List/DataItem';
import RightBorderDataItem from '../common/List/RightBorderDataItem';
import Footer from '../common/Page/Footer';
import Item from '../common/Table/Item';
import Table from '../common/Table/Table';

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

const EquipmentsTab = ({equipments = []}) => {
    const theme = useTheme();

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedEquipments, setSelectedEquipments] = useState([]);

    const [expandedItems, setExpandedItems] = useState([]);

    const onCheckBoxPress = item => () => {
        const {_id} = item;

        const updatedEquipments = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedEquipments);

        const removeChildren = selectedEquipments.filter(obj => obj.equipmentTypeId !== _id);
        setSelectedEquipments(removeChildren);
    };

    const onChildCheckBoxPress = (equipment, equipmentType) => () => {
        const {_id} = equipment;
        const {_id: equipmentTypeId} = equipmentType;

        const equipmentIds = selectedEquipments.map(equipment => equipment._id);
        const updatedChildIds = checkboxItemPress(_id, equipmentIds);

        
        const updatedSelectedEquipments = updatedChildIds.map(_id => ({
            _id,
            equipmentTypeId
        }));
        setSelectedEquipments(updatedSelectedEquipments);

        const updatedIds = selectedIds.filter(id => id !== equipmentTypeId);
        setSelectedIds(updatedIds);
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
                        flex={2.1}
                        color="--color-gray-800"
                        fontStyle="--text-base-regular"
                    />
                ) : (
                    <RightBorderDataItem
                        text={equipmentTypeName}
                        flex={2.35}
                        color="--color-gray-800"
                        fontStyle="--text-base-regular"
                    />
                )
            }
            <DataItem flex={1.6} text={equipments.length} color="--color-gray-800" fontStyle="--text-base-regular" align="center"/>
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

    const equipmentItemView = ({equipmentName: name, equipmentTitle, status, startTime, endTime}, onActionPress) => {
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
                    text={equipmentTitle}
                    flex={2.4}
                    color="--color-blue-600"
                    fontStyle="--text-sm-medium"
                />
                <DataItem flex={1.4} text="1" color="--color-gray-800" fontStyle="--text-sm-regular" align="center"/>
                <DataItem flex={1} text={status} color={evaluateColor()} fontStyle="--text-sm-regular"  />
                <DataItem flex={1.8} text={formatDate(endTime, 'DD/MM/YYYY')} color="--color-gray-800" fontStyle="--text-sm-regular" align="center" textAlign='center'/>
                
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
        const {_id, equipments = []} = item;

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

    const toggleHeaderCheckbox = () => {
        const updatedEquipmentTypes = selectAll(equipments, selectedIds);
        setSelectedIds(updatedEquipmentTypes);
    };

    return (
        <>
            <ScrollView>
                <Table
                    isCheckbox={true}
                    data={equipments}
                    listItemFormat={renderListFn}
                    headers={headers}
                    itemSelected={selectedIds}
                    toggleHeaderCheckbox={toggleHeaderCheckbox}
                />
            </ScrollView>

            <Footer
                hasActions={false}
                hasPaginator={false}
            />
        </>
    );
};

export default EquipmentsTab;


