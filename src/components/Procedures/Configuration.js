import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import ColumnSection from '../common/ColumnSection';
import ColumnSectionsList from '../common/ColumnsSectionsList';

const Configuration = ({procedure}) => {

    const { name, duration, recovery, custom, physician, description} = procedure   
    const procedureName = <Record 
        recordTitle = {"Procedure"}
        recordValue = {name}
    />

    const recoveryRecord = <Record
        recordTitle = {"Recovery"}
        recordValue = {recovery}
    />

    const durationRecord = <Record
        recordTitle = {"Duration"}
        recordValue = {`${duration} hours`}
    />

    const customRecord = <Record
        recordTitle = {"Custom"}
        recordValue = {custom}
    />

    const assignedRecord = <ResponsiveRecord
        recordTitle = {"Assigned to"}
        recordValue = {physician}
        handleRecordPress = {()=>{}}
    />

    const section = [
        procedureName,
        recoveryRecord,
        durationRecord,
        customRecord,
        assignedRecord
    ]

    return (
        <View style={styles.container}>
            <View style={styles.description}>
                <Text style={{fontSize:16, color:'#718096', paddingBottom:10}}>Description</Text>
                {
                    description ?
                        <Text>{description}</Text>
                        :
                        <Text style={{fontSize:16, color:'#A0AEC0'}}>No description available</Text>
     
                }
            </View>
            <View style={styles.detailsContainer}>
                <ColumnSection
                    data = {section}
                    numOfColumns = {3}
                />
            </View>
            <View style={{marginTop:15}}>
                <Text style={{color:'#718096', fontSize:16 }}>This Procedure is available at these Locations</Text>
            </View>
        </View>
    )
}

export default Configuration

const styles = StyleSheet.create({
    container:{

    },
    description:{
        width: '60%',
        paddingBottom:30,
    },
    detailsContainer:{
    }
})