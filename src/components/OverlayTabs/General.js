import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import ColumnSection from '../common/ColumnSection';
import ColumnSectionsList from '../common/ColumnsSectionsList';
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionItem from "../common/ActionItem";

import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";
import AssignIcon from "../../../assets/svg/assignIcon";
import EditIcon from "../../../assets/svg/editIcon";


import { withModal } from "react-native-modalfy";

const General = ({ equipment = {}, updatedInfo, modal }) => {


    const { dateAvailable } = updatedInfo;

    const {
        _id = "",
        assignment = {},
        status = "",
        usage = "",
        availableOn = "",
        nextAvailable = "",
        type = {},
    } = equipment

    const { theatre = {} } = assignment
    const { description, categories, suppliers } = type

    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);

    const supplierId = <Record
        recordTitle={"Supplier ID"}
        recordValue={""}
    />

    const assignedRecord = <ResponsiveRecord
        recordTitle={"Assigned"}
        recordValue={theatre.name}
        handleRecordPress={() => { }}
    />

    const statusRecord = <Record
        recordTitle={"Status"}
        recordValue={updatedInfo.status}
        valueColor={"#DD6B20"}
    />

    const supplierRecord = <ResponsiveRecord
        recordTitle={"Supplier"}
        recordValue={""}
        handleRecordPress={() => { }}
    />

    const usageRecord = <Record
        recordTitle={"Usage"}
        recordValue={usage}
    />

    const available = <Record
        recordTitle={"Available On"}
        recordValue={new Date(dateAvailable).toLocaleString()}
    />

    const category = <Record
        recordTitle="Category"
        recordValue={""}
    />

    const section1 = [
        supplierId,
        assignedRecord,
        statusRecord,
        supplierRecord,
        usageRecord,
        available
    ]

    const section2 = [
        category
    ]

    return (
        <>
            <View style={styles.description}>
                <Text>Description</Text>
                <Text>{description}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <ColumnSectionsList
                    sections={[
                        <ColumnSection
                            data={section1}
                            numOfColumns={3}
                        />,
                        <ColumnSection
                            data={section2}
                            numOfColumns={1}
                        />
                    ]}
                />
            </View>

        </>
    )
}

export default withModal(General)

const styles = StyleSheet.create({
    container: {

    },
    description: {
        width: '60%',
        paddingBottom: 20
    },
    detailsContainer: {
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    }
})