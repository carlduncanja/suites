import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from "react-native";
import BottomSheetContainer from '../common/BottomSheetContainer';
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import StorageConsumablesTab from '../OverlayTabs/StorageConsumablesTab';
import StorageEquipmentTab from '../OverlayTabs/StorageEquipmentTab';
import TransfersOverlayTab from "../OverlayTabs/TransfersOverlayTab";
import { getStorageById } from "../../api/network";
import { colors } from "../../styles";
import { PageContext } from "../../contexts/PageContext";
import DetailsPage from "../common/DetailsPage/DetailsPage";
import TabsContainer from "../common/Tabs/TabsContainerComponent";

function StoragePage({ route, navigation }) {
    const currentTabs = ["Transfer", "Consumables", "Equipment"];

    const { storage } = route.params;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [storageItem, setStorageItem] = useState(storage);
    const [isEditMode, setEditMode] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [pageState, setPageState] = useState({});

    // ##### Life cycle methods

    useEffect(() => {
        setTimeout(() => {
            fetchStorageItem(storage._id)
        }, 200)
    }, []);


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = () => {
        setEditMode(!isEditMode);
    };

    const backTapped = () => {
        navigation.navigate("Storage");
    }

    // ##### Helper functions

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        })
    }


    const fetchStorageItem = (id) => {

        setPageLoading(true);
        getStorageById(id)
            .then(data => {
                setStorageItem(data);
            })
            .catch(error => {
                console.log("Failed to get inventory item", error);
                // TODO handle error
            })
            .finally(_ => {

                setPageLoading(false);
            })
    };

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Transfer":
                return <TransfersOverlayTab />;
            case "Consumables":
                // Get Consumables
                const consumables = storageItem.inventoryLocations.map(item => {
                    console.log(item);

                    return {
                        item: item.inventory.name,
                        type: "",
                        onHand: item.stock,
                        unitPrice: item.inventory.unitPrice
                    }
                });

                return <StorageConsumablesTab consumables={consumables} />;

            case "Equipment":
                return <StorageEquipmentTab />;
            default:
                return <View />
        }
    };

    const overlayContent = <View style={{ flex: 1, padding: 30 }}>
        {getTabContent(currentTab)}
    </View>;

    const { _id, name } = storageItem;

    return (
        // <BottomSheetContainer
        //     isFetching={isFetching}
        //     overlayId={_id}
        //     overlayTitle={name}
        //     onTabPressChange={onTabPress}
        //     currentTabs={currentTabs}
        //     selectedTab={currentTab}
        //     isEditMode={isEditMode}
        //     onEditPress={onEditPress}
        //     overlayContent={getTabContent(currentTab)}
        // />
        <>
            <PageContext.Provider value={{ pageState, setPageState }}>
                <DetailsPage
                    title={name}
                    subTitle={``}
                    onBackPress={backTapped}
                    pageTabs={
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={currentTab}
                            onPressChange={onTabPress}
                        />
                    }
                >

                    {getTabContent(currentTab)}




                </DetailsPage>
            </PageContext.Provider>
        </>
    );
}

StoragePage.propTypes = {};
StoragePage.defaultProps = {};

export default StoragePage;

