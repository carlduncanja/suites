import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Record from '../../common/Information Record/Record';
import ResponsiveRecord from '../../common/Information Record/ResponsiveRecord';
import ColumnSection from '../../common/ColumnSection';
import FloatingActionButton from "../../common/FloatingAction/FloatingActionButton";
import ActionContainer from "../../common/FloatingAction/ActionContainer";

import { withModal } from "react-native-modalfy";

const Configuration = ({procedure, modal}) => {

    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);

    const { 
        name, 
        duration, 
        hasRecovery, 
        custom, 
        physician={}, 
        description} = procedure 

    const {
        firstName = "", 
        surname = ""} =  physician
    
    const recovery = hasRecovery ? "Yes" : "No"
    const customStatus  = "Yes"
    const physicianName = `Dr. ${firstName} ${surname}`

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
        recordValue = {customStatus}
    />

    const assignedRecord = <ResponsiveRecord
        recordTitle = {"Assigned to"}
        recordValue = {physicianName}
        handleRecordPress = {()=>{}}
    />

    const section = [
        procedureName,
        recoveryRecord,
        durationRecord,
        customRecord,
        assignedRecord
    ]

    const toggleActionButton = () =>{
        setIsFloatingActionDisabled(true);
        modal.openModal("ActionContainerModal",
            {
                actions: getFloatingActions(),
                title: "PROCEDURE ACTIONS",
                onClose: () => {
                    setIsFloatingActionDisabled(false)
                }
            })
    }

    getFloatingActions = () =>{
        return <ActionContainer
            floatingActions={[

            ]}
            title={"PROCEDURE ACTIONS"}
        />
    }

    return (
        <>
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
            <View style={styles.footer}>
                <FloatingActionButton
                    isDisabled = {isFloatingActionDisabled}
                    toggleActionButton = {toggleActionButton}
                />
            </View>
        </>
    )
}

export default withModal(Configuration)

const styles = StyleSheet.create({
    container:{
        backgroundColor:'red'
    },
    description:{
        width: '60%',
        paddingBottom:30,
    },
    detailsContainer:{
    },
    footer:{
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    }
})