import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from '@emotion/native';
import Table from "../common/Table/Table";
import DataItem from "../common/List/DataItem";

const TableHeaders = [
    {
        name: "Item ID",
        alignment: "flex-start",
        flex: 1,
    },
    {
        name: "Status",
        alignment: "flex-start",
        flex: 1,
    },
    {
        name: "Assigned",
        alignment: "flex-start",
        flex: 1,
    },
];

const PageWrapper = styled.View`
    flex: 1;
`


const ASSIGNMENT = {
    PHYSICIAN: 'physician',
    USER: 'user',
    LOCATION: 'location',
    STORAGE: 'storage',
    NONE: 'none'
};

const getAssignment = assignment => {
    const {physician, location, user, storage} = assignment || {};

    switch (assignment.type) {
        case ASSIGNMENT.PHYSICIAN:
            return `Dr ${physician?.firstName?.charAt(0)}.${physician.lastName}`;
        case ASSIGNMENT.LOCATION:
            return `${location?.name}`
        case ASSIGNMENT.STORAGE:
            return `${storage?.name}`
        case ASSIGNMENT.USER:
            return `${user?.firstName} ${user.lastName}`;
        default:
            return "available";
    }
}


function EquipmentGroupItemsTab({items, ...props}) {
    const renderItemView = (equipmentItem) => {
        const assignment = getAssignment(equipmentItem.assignment)

        return <View style={{flexDirection: "row", flex: 1, height: 16, marginBottom: 32}}>
            <DataItem flex={1} align={'flex-start'} text={equipmentItem.name} fontStyle={'text-sm-medium'}
                      color={'--color-blue-600'}/>
            <DataItem flex={1} align={'flex-start'} text={equipmentItem.status}/>
            <DataItem flex={1} align={'flex-start'} text={assignment}/>
        </View>
    }

    return (
        <PageWrapper>
            <Table
                headers={TableHeaders}
                listItemFormat={renderItemView}
                isCheckbox={false}
                data={items}
            />
        </PageWrapper>
    );
}

EquipmentGroupItemsTab.propTypes = {};
EquipmentGroupItemsTab.defaultProps = {};

export default EquipmentGroupItemsTab;
