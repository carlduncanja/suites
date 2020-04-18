import React, {useState} from 'react';
import {View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";

function StorageBottomSheetContainer({storage}) {
    const currentTabs = ["Transfer", "Consumables", "Equipment"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedStorageItem, setStorageItem] = useState(storage);
    const [isEditMode, setEditMode] = useState(false);


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = () => {
        setEditMode(!isEditMode);
    };

    // ##### Helper functions

    const overlayContent = <View style={{flex: 1, backgroundColor: 'green'}}/>;

    const {_id, name} = selectedStorageItem;

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
                onEditPress={onEditPress}
            />
        </View>
    );
}

StorageBottomSheetContainer.propTypes = {};
StorageBottomSheetContainer.defaultProps = {};

export default StorageBottomSheetContainer;
