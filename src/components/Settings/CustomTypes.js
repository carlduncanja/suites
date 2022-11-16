import React, { useState } from 'react';
import ListItem from '../common/List/ListItem';
import DataItem from '../common/List/DataItem';

const CUSTOM_TYPES = [
    {
        title: 'Appointment Buffer-time',
        page: 'AppointmentsPage',
    },
    {
        title: 'Storage',
        page: 'InventoryPage',
        categoryType: 'storage',
        categoryTitle: 'Storage',
        frameTitle: "Categories"
    },
    {
        title: 'Inventory',
        page: 'InventoryPage',
        categoryType: 'inventory',
        categoryTitle: 'Inventory',
        frameTitle: "Categories"
    },
    {
        title: 'Medical Staff',
        page: 'InventoryPage',
        categoryType: 'staff',
        categoryTitle: 'Staff',
        frameTitle: "Physicians"
    }
];

const CustomTypes = ({navigation}) => {
    const customType = title => (
        <DataItem color="--color-gray-700" fontStyle="--text-sm-medium" flex={1} text={title}/>
    );

    const onItemPress = (page) => {
        navigation.navigate(page, {edited: false, onRefresh: handleRefresh, categoryTitle, categoryType, page, frameTitle });
    };

    const handleRefresh = (page) => {
        navigation.navigate("Settings");
        navigation.navigate(page, {edited: true, onRefresh: handleRefresh});
    }

    const renderCustomType = (item) => (
        <ListItem
            hasCheckBox={false}
            onItemPress={() => onItemPress(item.page)}
            itemView={customType(item.title)}
        />
    );
    return (
        <>
            { CUSTOM_TYPES.map(type => (
                renderCustomType(type)
            ))}
        </>
    );
};

export default CustomTypes;
