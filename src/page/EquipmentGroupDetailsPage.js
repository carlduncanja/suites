import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { PageContext } from '../contexts/PageContext';
import DetailsPage from '../components/common/DetailsPage/DetailsPage';
import TabsContainerComponent from '../components/common/Tabs/TabsContainerComponent';
import { getEquipmentTypeById } from '../api/network';
import EquipmentGroupGeneralTab from '../components/OverlayTabs/EquipmentGroupGeneralTab';

function EquipmentGroupDetailsPage({ route, navigation }) {

    const { data = {}, equipments = [] } = route.params;
    //console.log("data being received,", data);
    const { name = "", _id = "" } = data
    const tabs = ["Details"]

    const [currentTab, setCurrentTab] = useState(tabs[0])
    const [pageState, setPageState] = useState({});
    const [selectedEquipment, setSelectedEquipment] = useState({});
    const [isInfoUpdated, setIsInfoUpdated] = useState(false)

    useEffect(() => {
        fetchEquipmentGroup(_id)
    }, []);


    const fetchEquipmentGroup = (id) => {
        setPageLoading(true)
        getEquipmentTypeById(id)
            .then(data => {
                setSelectedEquipment(data)
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
            isLoading: value,
            isEdit: false
        })
    }

    const getContentData = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <EquipmentGroupGeneralTab
                    equipmentGroup={selectedEquipment}
                    equipmentChildren={equipments}
                />
            default:
                break;
        }
    }

    return (

        <PageContext.Provider value={{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={[name]}
                onBackPress={() => navigation.navigate("Equipment")}
                pageTabs={
                    <TabsContainerComponent
                        tabs={tabs}
                        selectedTab={currentTab}
                        onPressChange={() => { }}
                    />
                }
            >
                {getContentData(currentTab)}
            </DetailsPage>

        </PageContext.Provider>
    )
}


// const mapDispatchToProps = dispatch => bindActionCreators({
//     setInventoryEdit
// }, dispatch)

EquipmentGroupDetailsPage.propTypes = {};
EquipmentGroupDetailsPage.defaultProps = {};

export default EquipmentGroupDetailsPage
