import React, { useState, useEffect} from 'react';
import { View, ActivityIndicator} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import Details from './OverlayTabs/Details';
import CaseFilesTab from './OverlayTabs/CaseFilesTab';
import CustomProceduresTab from './OverlayTabs/CustomProceduresTab';
import {colors} from "../../styles";
import {getPhysiciansById} from "../../api/network";


function PhysicianBottomSheet({physician}) {
    const currentTabs = ["Details", "Case Files", "Custom Procedures", "Schedule"];
    const {id, firstName, surname} = physician;
    const name = `Dr. ${firstName} ${surname}`

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedPhysician, setSelectedPhysician] = useState(physician)
    const [isEditMode, setEditMode] = useState(false);
    const [isFetching, setFetching] = useState(false);

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchPhysician(id)
    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <Details physician = {selectedPhysician}/>;
            case "Case Files":
                return <CaseFilesTab/>;
            case "Custom Procedures":
                return <CustomProceduresTab/>;
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
        getPhysiciansById(id)
            .then(data => {
                setPhysician(data)
            })
            .catch(error => {
                console.log("Failed to get physician", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                    <SlideOverlay
                        overlayId={id}
                        overlayTitle={name}
                        onTabPressChange={onTabPress}
                        currentTabs={currentTabs}
                        selectedTab={currentTab}
                        isEditMode={isEditMode}
                        overlayContent={overlayContent}
                    />
            }
        </View>
    );
}

PhysicianBottomSheet.propTypes = {};
PhysicianBottomSheet.defaultProps = {};

export default PhysicianBottomSheet;
