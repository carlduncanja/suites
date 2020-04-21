import React, {useState} from 'react';
import {View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import Details from './Details';


function PhysicianBottomSheet({physician}) {
    const currentTabs = ["Details", "Case Files", "Custom Procedures", "Schedule"];
    const {id, firstName, surname} = physician;
    const name = `Dr. ${firstName} ${surname}`

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedPhysician, setSelectedPhysician] = useState(physician)
    const [isEditMode, setEditMode] = useState(false);


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const overlayContent = <View style={{flex: 1, padding:30}}>
        <Details
            physician = {selectedPhysician}
        />
    </View>;

    return (
        <View style={{flex: 1}}>
            <SlideOverlay
                overlayId={id}
                overlayTitle={name}
                onTabPressChange={onTabPress}
                currentTabs={currentTabs}
                selectedTab={currentTab}
                isEditMode={isEditMode}
                overlayContent={overlayContent}
            />
        </View>
    );
}

PhysicianBottomSheet.propTypes = {};
PhysicianBottomSheet.defaultProps = {};

export default PhysicianBottomSheet;
