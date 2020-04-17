import React, {useState} from 'react';
import {View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";

function InventoryBottomSheetContainer({inventory}) {
    const currentTabs = ["Transfer", "Consumables", "Equipment"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedInventoryItem, setInventoryItem] = useState(inventory);
    const [isEditMode, setEditMode] = useState(false);


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const overlayContent = <View style={{flex: 1, backgroundColor: 'green'}}/>;

    const {_id, name} = selectedInventoryItem;

    return (
        <View style={{flex: 1}}>
            <SlideOverlay
                overlayId={_id}
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

InventoryBottomSheetContainer.propTypes = {};
InventoryBottomSheetContainer.defaultProps = {};

export default InventoryBottomSheetContainer;
