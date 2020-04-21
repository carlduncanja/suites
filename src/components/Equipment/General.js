import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import ColumnSection from '../common/ColumnSection';
import ColumnSectionsList from '../common/ColumnsSectionsList';

const General = ({details}) => {

    const supplierId = <Record 
        recordTitle = {"Supplier ID"}
        recordValue = {details.id}
    />

    const assigned = <ResponsiveRecord
        recordTitle = {"Assigned"}
        recordValue = {details.assigned}
        handleRecordPress = {()=>{}}
    />
   
    const status = <Record
        recordTitle = {"Status"}
        recordValue = {details.status}
        valueColor = {"#DD6B20"}
    />

    const supplier = <ResponsiveRecord
        recordTitle = {"Supplier"}
        recordValue = {details.supplier}
        handleRecordPress = {()=>{}}
    />

    const usage = <Record
        recordTitle = {"Usage"}
        recordValue = {details.usage}
    />

    const availableOn = <Record
        recordTitle = {"Available On"}
        recordValue = {details.availableOn}
    />

    const category = <Record
        recordTitle = "Category"
        recordValue = {""}
    />

    const section1 = [
        supplierId,
        assigned,
        status,
        supplier,
        usage,
        availableOn
    ]

    const section2 = [
        category
    ]

    return (
        <View style={styles.container}>
            <View style={styles.description}>
                <Text>Description</Text>
                <Text>{details.description}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <ColumnSectionsList
                    sections = {[
                        <ColumnSection
                            data = {section1}
                            numOfColumns = {3}
                        />,
                        <ColumnSection
                            data = {section2}
                            numOfColumns = {1}
                        />
                    ]}
                />
            </View>
        </View>
    )
}

export default General

const styles = StyleSheet.create({
    container:{

    },
    description:{
        width: '60%',
        paddingBottom:20
    },
    detailsContainer:{
    }
})