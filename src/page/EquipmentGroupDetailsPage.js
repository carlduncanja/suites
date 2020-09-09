import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { withModal } from "react-native-modalfy";
import { PageContext } from '../contexts/PageContext';
import DetailsPage from '../components/common/DetailsPage/DetailsPage';
import TabsContainerComponent from '../components/common/Tabs/TabsContainerComponent';
import { getEquipmentTypeById } from '../api/network';
import EquipmentGroupGeneralTab from '../components/OverlayTabs/EquipmentGroupGeneralTab';
import { Modal } from 'react-native-paper';

function EquipmentGroupDetailsPage(props) {

    const { data = {} } = props.route.params;
    const { name = "", _id = "", equipments = [], suppliers = [] } = data
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

    const onTabPress = (selectedTab) => {
        if (!pageState.isEditMode) setCurrentTab(selectedTab);
    };

    const goToAddEquipment = () => {
        props.navigation.navigate("AddEquipmentPage", { equipment: selectedEquipment });
        props.modal.closeAllModals();

    }

    const getContentData = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <EquipmentGroupGeneralTab
                    goToAddEquipment={goToAddEquipment}
                    equipmentGroup={selectedEquipment}
                    equipments={equipments}
                    suppliers={suppliers}
                />
            case "Items":
                return
            default:
                break;
        }
    }

    return (

        <PageContext.Provider value={{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={[name]}
                onBackPress={() => props.navigation.navigate("Equipment")}
                pageTabs={
                    <TabsContainerComponent
                        tabs={tabs}
                        selectedTab={currentTab}
                        onPressChange={onTabPress}
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

export default withModal(EquipmentGroupDetailsPage)
