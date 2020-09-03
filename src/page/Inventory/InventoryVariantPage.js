import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { PageContext } from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainerComponent from '../../components/common/Tabs/TabsContainerComponent';
import { connect } from 'react-redux';
import { getInventoryVariantByGroup } from '../../api/network';
import InventoryGroupGeneral from '../../components/OverlayTabs/InventoryGroupGeneral';
import InventoryVariantGeneral from '../../components/OverlayTabs/InventoryVariantGeneral';
import InventoryStorageLocationsTab from '../../components/OverlayTabs/InventoryStorageLocationsTab';

function InventoryVariantPage({ route, navigation }){

    const { data = {}, isEdit = false} = route.params
    console.log("Data: ", data)
    const { name = "", _id = "", groupName = "", groupId = "" } = data
    const tabs = ["General","Storage Locations", "Transfers", "Suppliers"];

    const [currentTab, setCurrentTab] = useState(tabs[0])
    const [pageState, setPageState] = useState({});
    const [selectedVariant, setSelectedVariant] = useState({});
    const [isInfoUpdated, setIsInfoUpdated] = useState(false)

    useEffect(() => {
        fetchVariant(groupId,_id)
    }, []);


    const fetchVariant = (parentId,variantId) => {
        // console.log("Group: ", parentId, variantId)
        setPageLoading(true)
        getInventoryVariantByGroup(variantId, parentId)
            .then(data => {
                setSelectedVariant(data)
                console.log("Fetch variant data: ", data)
            })
            .catch(error => {
                console.log("Failed to get variant", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false)
            })
    };

    // ###### HELPER FUNCTIONS

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading : value,
            isEdit : false
        })
    };

    const onTabPress = (selectedTab) => {
        if (!pageState.isEditMode) setCurrentTab(selectedTab);
    };

    const getContentData = (selectedTab) => {
        switch (selectedTab) {
            case "General":
                return <InventoryVariantGeneral
                    inventoryVariant = {selectedVariant}
                    selectedData = {data}
                />;

            case "Storage Locations" :
                return <InventoryStorageLocationsTab
                    storageLocations = {selectedVariant?.storageLocations || [] }
                />
            default:
                break;
        }
    }

    return (

        <PageContext.Provider value = {{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={[groupName, name]}
                onBackPress = { () => navigation.navigate("Inventory")}
                pageTabs = {
                    <TabsContainerComponent
                        tabs = {tabs}
                        selectedTab = {currentTab}
                        onPressChange = {onTabPress}
                    />
                }
            >
                { getContentData(currentTab)}
            </DetailsPage>

        </PageContext.Provider>
    )
}


// const mapDispatchToProps = dispatch => bindActionCreators({
//     setInventoryEdit
// }, dispatch)

InventoryVariantPage.propTypes = {};
InventoryVariantPage.defaultProps = {};

export default InventoryVariantPage
