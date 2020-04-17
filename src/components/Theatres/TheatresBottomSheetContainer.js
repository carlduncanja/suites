import React, {useState} from 'react';
import {View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";

function TheatresBottomSheetContainer({theatre}) {
    const currentTabs = ["Details", "History", "Storage", "Equipment", "Schedule"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedTheatre, setTheatre] = useState(theatre);
    const [isEditMode, setEditMode] = useState(false);


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const overlayContent = <View style={{flex: 1, backgroundColor: 'green'}}/>;

    const {_id, name} = selectedTheatre;

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

TheatresBottomSheetContainer.propTypes = {};
TheatresBottomSheetContainer.defaultProps = {};

export default TheatresBottomSheetContainer;
