import React, { useState, useEffect} from 'react';
import { View, ActivityIndicator} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import PhysiciansDetailsTab from '../OverlayTabs/PhysiciansDetailsTab';
import EditablePhysiciansDetailsTab from '../OverlayTabs/EditablePhysiciansDetailsTab';
import CaseFilesTab from '../OverlayTabs/CaseFilesTab';
import CustomProceduresTab from '../OverlayTabs/CustomProceduresTab';
import {colors} from "../../styles";

import { getPhysicianById, updatePhysician } from "../../api/network";
import { updatePhysicianRecord } from "../../redux/actions/physiciansActions";
import {connect} from 'react-redux';

function PhysicianBottomSheet({physician, isOpenEditable}) {
    const currentTabs = ["Details", "Case Files", "Custom Procedures", "Schedule"];
    const {
        _id,
        firstName,
        middleName,
        surname,
        dob,
        gender,
        trn,
        emails,
        address,
        phones, 
        emergencyContact
    } = physician
    const name = `Dr. ${firstName} ${surname}`
    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedPhysician, setSelectedPhysician] = useState(physician)
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState()
    const [isFetching, setFetching] = useState(false);


    const [fields, setFields] = useState({
        firstName : firstName,
        middleName : middleName,
        surname : surname,
        dob : dob,
        trn :trn,
        gender : gender,
        emails : emails,
        address : address,
        phones : phones,
        emergencyContact : emergencyContact
    })

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchPhysician(_id)
    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = (tab) => {
        setEditableTab(tab)
        setEditMode(!isEditMode)
        if(!isEditMode === false){
            let fieldsObject = {
                ...fields,
                phones : removeIds(fields['phones']),
                emails : removeIds(fields['emails']),
                address : removeIds(fields['address']),
                emergencyContact : removeIds(fields['emergencyContact'])
            }

            console.log("Fields: ", fieldsObject)
            updatePhysicianFn(_id, fieldsObject)
        }
    }

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    // ##### Helper functions

    const removeIds = (array) =>{
        let updatedArray = array.map( obj => {
            let newObj = obj
            delete newObj['_id']
            return {...newObj}
        })

        return updatedArray
    }

    const getTabContent = (selectedTab) => {
        const { cases = [], procedures = [] } = selectedPhysician
        switch (selectedTab) {
            case "Details":
                return editableTab === 'Details' && isEditMode ?
                    <EditablePhysiciansDetailsTab 
                        fields = {fields} 
                        onFieldChange = {onFieldChange}/>
                    :
                    <PhysiciansDetailsTab physician = {selectedPhysician}/>
            case "Case Files":
                return <CaseFilesTab cases = {cases}/>;
            case "Custom Procedures":
                return <CustomProceduresTab procedures = {procedures}/>;
            case "Schedule":
                return <View/>;
            default :
                return <View/>
        }
    };

    const overlayContent = <View style={{flex: 1, padding:30}}>
        {getTabContent(currentTab)}
    </View>;

    const fetchPhysician = (id) => {
        setFetching(true);
        getPhysicianById(id)
            .then(data => {
                setSelectedPhysician(data)
                // setPhysician(data)
            })
            .catch(error => {
                console.log("Failed to get physician", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    const updatePhysicianFn = (id, data) => {
        updatePhysician(id, data)
            .then((data, id) => {
                let newData = {
                    _id : id,
                    ...physician
                }
                updatePhysicianRecord(newData)
                console.log("Success: ", data)
            })
            .catch(error => {
                console.log("Failed to update physician", error)
            })
    }

    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                    <SlideOverlay
                        overlayId={_id}
                        overlayTitle={name}
                        onTabPressChange={onTabPress}
                        currentTabs={currentTabs}
                        selectedTab={currentTab}
                        isEditMode={isEditMode}
                        overlayContent={overlayContent}
                        onEditPress = {onEditPress}
                    />
            }
        </View>
    );
}

PhysicianBottomSheet.propTypes = {};
PhysicianBottomSheet.defaultProps = {};


const mapDispatcherToProp = {
    updatePhysicianRecord
};

export default connect(null, mapDispatcherToProp)(PhysicianBottomSheet)
