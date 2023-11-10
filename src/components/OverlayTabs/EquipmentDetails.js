import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useModal, withModal} from 'react-native-modalfy';
import moment from 'moment';
import Record from '../common/Information Record/Record';
import TouchableRecord from '../common/Information Record/TouchableRecord';
import ColumnSection from '../common/ColumnSection';
import ColumnSectionsList from '../common/ColumnsSectionsList';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import LongPressWithFeedback from '../common/LongPressWithFeedback';
import ActionItem from '../common/ActionItem';

import WasteIcon from '../../../assets/svg/wasteIcon';
import AddIcon from '../../../assets/svg/addIcon';
import AssignIcon from '../../../assets/svg/assignIcon';
import EditIcon from '../../../assets/svg/editIcon';

const EquipmentDetails = ({equipment = {}, navigation, groupInfo, name}) => {
    const modal = useModal();
    const {dateAvailable, description} = equipment;

    const {
        _id = '',
        sku = '',
        assignment = {},
        status = '',
        usage = '',
        // availableOn = '',
        nextAvailable = '',
        type = {},
    } = equipment;

    const {theatre = {}} = assignment;
    const {categories, suppliers} = type;

    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);

    const evalRecentAssignment = assignments => {
        let storageLocationName = null;
        let assignmentName = null;
        let status = null;
        let mostRecent = null;
        let futureTime = null;

        for (const assignment of assignments) {
            if (assignment.type !== 'location') {
                if (!mostRecent || moment(assignment.startTime).isAfter(mostRecent)) {
                    mostRecent = moment(assignment.startTime);

                    assignmentName = assignment.referenceName;

                    futureTime = mostRecent.clone().add(assignment.duration || 0, 'hours');
                    status = moment().isBetween(mostRecent, futureTime) ? 'Unavailable' : 'Available';
                }
            } else storageLocationName = assignment.referenceName;
        }

        return {assignmentName, storageLocationName, status, futureTime};
    };

    const {assignmentName, futureTime: availableOn, storageLocationName} = evalRecentAssignment(equipment?.assignments);

    const assignedRecord = (
        <TouchableRecord
            recordTitle="Assigned"
            recordValue={assignmentName || (storageLocationName ? `(${storageLocationName})` : '--')}
            handleRecordPress={() => {
                // navigation.navigate('AssignmentManagementPage', {assignments: equipment.assignments, group: groupInfo, name});
            }}
        />
    );

    const statusRecord = (
        <Record
            recordTitle="Status"
            recordValue={status}
            valueColor={status === 'Available' ? '--color-green-600' : '--color-orange-600'}
        />
    );

    const skuRecord = (
        <Record
            recordTitle="SKU"
            recordValue={sku || '--'}
        />
    );

    const available = (
        <Record
            recordTitle="Available On"
            recordValue={availableOn ? availableOn.format('DD/MM/YYYY - h:mm A') : '--'}
        />
    );

    const category = (
        <Record
            recordTitle="Category"
            recordValue=""
        />
    );

    const section1 = [
        skuRecord,
        assignedRecord,
        statusRecord,
        available
    ];

    const section2 = [
        category
    ];

    return (
        <>
            <View style={styles.description}>
                <Text style={{color: '#6E7B87'}}>Description</Text>
                <Text>{description}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <ColumnSectionsList
                    sections={[
                        <ColumnSection
                            data={section1}
                            numOfColumns={3}
                        />
                    ]}
                />
            </View>

        </>
    );
};

export default EquipmentDetails;

const styles = StyleSheet.create({
    container: {},
    description: {
        width: '60%',
        paddingBottom: 20
    },
    detailsContainer: {},
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    }
});
