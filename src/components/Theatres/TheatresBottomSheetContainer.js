import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import InventoryGeneralTabContent from "../Inventory/OverlayTabs/InventoryGeneralTabContent";
import TheatresDetailsTab from "./OverlayTabs/TheatresDetailsTab";
import {colors} from "../../styles";
import {getTheatreById} from "../../api/network";

function TheatresBottomSheetContainer({theatre = {}}) {
    const currentTabs = ["Details", "History", "Storage", "Equipment", "Schedule"];


    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedTheatre, setTheatre] = useState(theatre);
    const [isEditMode, setEditMode] = useState(false);
    const [isFetching, setFetching] = useState(false);

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchTheatre(theatre._id)
    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const getOverlayScreen = (selectedOverlay) => {
        switch (selectedOverlay) {
            case "Details":
                return <TheatresDetailsTab/>;
            case "History":
                return <View/>;
            case "Storage":
                return <View/>;
            case "Equipment":
                return <View/>;
            case "Schedule":
                return <View/>;
            default :
                return <View/>
        }
    };


    const fetchTheatre = (id) => {
        setFetching(true);
        getTheatreById(id)
            .then(data => {
                setTheatre(data)
            })
            .catch(error => {
                console.log("Failed to get theatre", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    const {_id, name} = selectedTheatre;



    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    : <SlideOverlay
                        overlayId={_id}
                        overlayTitle={name}
                        onTabPressChange={onTabPress}
                        currentTabs={currentTabs}
                        selectedTab={currentTab}
                        isEditMode={isEditMode}
                        overlayContent={getOverlayScreen(currentTab)}
                    />

            }
        </View>
    );
}

TheatresBottomSheetContainer.propTypes = {};
TheatresBottomSheetContainer.defaultProps = {};

export default TheatresBottomSheetContainer;
