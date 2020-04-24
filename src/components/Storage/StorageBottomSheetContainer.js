import React, {useState} from 'react';
import {View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import ConsumablesTab from './OverlayPages/ConsumablesTab';
import EquipmentTab from './OverlayPages/EquipmentTab';

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

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Transfer":
                return <View/>;
            case "Consumables":
                return <ConsumablesTab/>;
            case "Equipment":
                return <EquipmentTab/>;
            default :
                return <View/>
        }
    }

    const overlayContent = <View style={{flex: 1, padding:30}}>
        {getTabContent(currentTab)}
    </View>;

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
