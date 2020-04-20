import React, {useState} from 'react';
import {View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import InventoryGeneralTabContent from "./OverlayTabs/InventoryGeneralTabContent";

function InventoryBottomSheetContainer({inventory}) {
    const currentTabs = ["General", "Storage Locations", "Transfer", "Supplier"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedInventoryItem, setInventoryItem] = useState(inventory);
    const [isEditMode, setEditMode] = useState(false);


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const {_id, name} = selectedInventoryItem;

    const getOverlayScreen = (selectedOverlay) => {

        switch (selectedOverlay) {
            case "General":
                return <InventoryGeneralTabContent/>;
            case "Storage Locations":
                return <View/>;
            case "Transfer":
                return <View/>;
            case "Supplier":
                return <View/>;
            default :
                return <View/>
        }
    };

    return (
        <View style={{flex: 1}}>
            <SlideOverlay
                overlayId={_id}
                overlayTitle={name}
                onTabPressChange={onTabPress}
                currentTabs={currentTabs}
                selectedTab={currentTab}
                isEditMode={isEditMode}
                overlayContent={getOverlayScreen(currentTab)}
            />
        </View>
    );
}

InventoryBottomSheetContainer.propTypes = {};
InventoryBottomSheetContainer.defaultProps = {};

export default InventoryBottomSheetContainer;
