import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import InventoryGeneralTabContent from "../OverlayTabs/InventoryGeneralTabContent";
import {colors} from "../../styles";
import {getInventoryGroupById} from "../../api/network";
import TransfersOverlayTab from "../OverlayTabs/TransfersOverlayTab";
import StorageLocationsTab from "../OverlayTabs/StorageLocationsTab";
import SuppliersTab from "../OverlayTabs/SuppliersTab";
import InventoryStorageLocationsTab from "../OverlayTabs/InventoryStorageLocationsTab";

function InventoryBottomSheetContainer({inventory}) {
    const currentTabs = ["General", "Storage Locations", "Transfer", "Supplier"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedInventoryItem, setInventoryItem] = useState(inventory);
    const [isEditMode, setEditMode] = useState(false);
    const [isFetching, setFetching] = useState(false);

    // console.log("Inventory: ", selectedInventoryItem)
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

                let stock = 0;
                const levels = {
                    max: 0,
                    min: 0,
                    critical: 0,
                    ideal: 0,
                };


                // calculate levels
                selectedInventoryItem.inventoryLocations.forEach(item => {
                    stock += item.stock;
                    console.log(item);
                    if (item.levels) {
                        levels.max += item.levels.max;
                        levels.low += item.levels.low;
                        levels.ideal += item.levels.ideal;
                        levels.critical += item.levels.critical;
                    }
                });


                const inventoryDetails = {
                    description: selectedInventoryItem.description,
                    sku: selectedInventoryItem.sku,
                    lastReceived: null,
                    supplier: selectedInventoryItem.supplier,
                    categories: [],
                    unit: selectedInventoryItem.unit,
                    unitPrice: selectedInventoryItem.unitPrice,
                    stock,
                    levels
                };


                return <InventoryGeneralTabContent {...inventoryDetails}/>;
            case "Storage Locations":

                const storageLocations = selectedInventoryItem.inventoryLocations.map(item => {

                    const itemLevels = item.levels;
                    const levels = {
                        ideal: itemLevels.ideal || 0,
                        max: itemLevels.max || 0,
                        low: itemLevels.low || 0,
                        min: 0,
                        critical: itemLevels.critical || 0
                    };

                    return {
                        id: item._id,
                        locationName: item.location && item.location.name,
                        stock: item.stock,
                        levels
                    }
                });


                return <InventoryStorageLocationsTab storageLocations={storageLocations}/>;
            case "Transfer":
                return <TransfersOverlayTab/>;
            case "Supplier":
                return <SuppliersTab/>;
            default :
                return <View/>
        }
    };

    const fetchInventoryItem = (id) => {
        setFetching(true);
        getInventoryGroupById(id)
            .then(data => {
                // console.log("Data: ", data)
                setInventoryItem(data);
            })
            .catch(error => {
                console.log("Failed to get inventory item", error);
                // TODO handle error
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
                    : <SlideOverlay
                        overlayId={_id}
                        overlayTitle={name}
                        onTabPressChange={onTabPress}
                        currentTabs={currentTabs}
                        selectedTab={currentTab}
                        isEditMode={isEditMode}
                        overlayContent={
                            <View style={{flex: 1, padding: 30}}>
                                {
                                    getOverlayScreen(currentTab)
                                }
                            </View>
                        }
                    />
            }
        </View>
    );
}

InventoryBottomSheetContainer.propTypes = {};
InventoryBottomSheetContainer.defaultProps = {};

export default InventoryBottomSheetContainer;
