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


    const { dateAvailable, description } = updatedInfo;

    const {
        _id = "",
        sku = '',
        assignment = {},
        status = "",
        usage = "",
        availableOn = "",
        nextAvailable = "",
        type = {},
    } = equipment

    const { theatre = {} } = assignment
    const { categories, suppliers } = type

    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);



    const assignedRecord = <ResponsiveRecord
        recordTitle={"Assigned"}
        recordValue={equipment?.assignments[0]?.theatre}
        handleRecordPress={() => { }}
    />

    const statusRecord = <Record
        recordTitle={"Status"}
        recordValue={updatedInfo.status}
        valueColor={"--color-orange-600"}
    />

    const skuRecord = <Record
        recordTitle="SKU"
        recordValue={`${sku}`}
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
        skuRecord,
        assignedRecord,
        statusRecord,
        available
    ]

    const section2 = [
        category
    ]

    return (
        <>
            <View style={styles.description}>
                <Text style={{ color: "#6E7B87" }}>Description</Text>
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