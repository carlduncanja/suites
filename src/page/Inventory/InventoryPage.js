import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { PageContext } from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainerComponent from '../../components/common/Tabs/TabsContainerComponent';
import { connect } from 'react-redux';
import { getInventoryGroupById } from '../../api/network';
import InventoryGroupGeneral from '../../components/OverlayTabs/InventoryGroupGeneral';

function InventoryPage({ route, navigation }){

    const { data = {}, isGroup = true, isEdit = false} = route.params
    const { name = "", _id = "" } = data
    const tabs = ["General"]

    const [currentTab, setCurrentTab] = useState(tabs[0])
    const [pageState, setPageState] = useState({});
    const [selectedInventory, setSelectedInventory] = useState({});
    const [isInfoUpdated, setIsInfoUpdated] = useState(false)

    useEffect(() => {
        fetchInventory(_id)
    }, []);


    const fetchInventory = (id) => {
        setPageLoading(true)
        getInventoryGroupById(id)
            .then(data => {
                setSelectedInventory(data)
                // console.log("Fetch data: ", data)
            })
            .catch(error => {
                console.log("Failed to get procedure", error)
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
    }

    const getContentData = (selectedTab) => {
        switch (selectedTab) {
            case "General":
                return <InventoryGroupGeneral
                    inventoryGroup = {selectedInventory}
                    onUpdate = {()=>fetchInventory(_id)}
                />
            default:
                break;
        }
    }

    return (

        <PageContext.Provider value = {{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={[name]}
                onBackPress = { () => navigation.navigate("Inventory")}
                pageTabs = {
                    <TabsContainerComponent
                        tabs = {tabs}
                        selectedTab = {currentTab}
                        onPressChange = { () => {}}
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

InventoryPage.propTypes = {};
InventoryPage.defaultProps = {};

export default InventoryPage
