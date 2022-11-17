import React, { useEffect, useState } from 'react';
import ListItem from '../common/List/ListItem';
import DataItem from '../common/List/DataItem';
import Data from '../common/Table/Data';
import { View } from 'react-native';
import { getLifeStyles } from '../../api/network';

const CUSTOM_TYPES = [
    {
        title: "Case Files",
        page: 'CaseFilesPage'
    },
    {
        title: 'Appointment Buffer-time',
        page: 'AppointmentsPage'
    },

];

const CustomTypes = ({ navigation }) => {
    const [lifeStyleData, setLifeStyleData] = useState([])



    const customType = title => (
        <DataItem color="--color-gray-700" fontStyle="--text-sm-medium" flex={1} text={title} />
    ); 

    

    const onItemPress = (page) => {
        navigation.navigate(page);
    };

    const renderCustomType = (item) => (
        <ListItem
            hasCheckBox={false}
            onItemPress={() => onItemPress(item.page)}
            itemView={customType(item.title)}
        />
    );

   
    return (
        <>
            {CUSTOM_TYPES.map(type => (
                renderCustomType(type)
            ))}
        </>
    );
};

export default CustomTypes;
