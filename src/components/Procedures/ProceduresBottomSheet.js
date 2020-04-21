import React, {useState} from 'react';
import {View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import Configuration from './Configuration';


function PhysicianBottomSheet({procedure}) {
    const currentTabs = ["Configuration", "Consumables", "Equipment", "Notes"];
    const {id, name} = procedure;
    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(false);


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const overlayContent = <View style={{flex: 1, padding:30}}>
        <Configuration
            procedure = {procedure}
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
