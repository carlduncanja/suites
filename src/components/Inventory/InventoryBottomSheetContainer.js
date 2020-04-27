import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import InventoryGeneralTabContent from "../OverlayTabs/InventoryGeneralTabContent";
import {colors} from "../../styles";
import {getInventoryById} from "../../api/network";
import TransfersOverlayTab from "../OverlayTabs/TransfersOverlayTab";

function InventoryBottomSheetContainer({inventory}) {
    const currentTabs = ["General", "Storage Locations", "Transfer", "Supplier"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedInventoryItem, setInventoryItem] = useState(inventory);
    const [isEditMode, setEditMode] = useState(false);
    const [isFetching, setFetching] = useState(false);


    // ##### Life cycle methods

    useEffect(() => {
        fetchInventoryItem(inventory._id)
    }, []);


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
                return <TransfersOverlayTab/>;
            case "Supplier":
                return <View/>;
            default :
                return <View/>
        }
    };

    const fetchInventoryItem = (id) => {
        setFetching(true);
        getInventoryById(id)
            .then(data => {
                setInventoryItem(data);
            })
            .catch(error => {
                console.log("Failed to get inventory item", error);
                // TODO handle error
            })
            .finally( _ => {
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

InventoryBottomSheetContainer.propTypes = {};
InventoryBottomSheetContainer.defaultProps = {};

export default InventoryBottomSheetContainer;
