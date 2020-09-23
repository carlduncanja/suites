import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { withModal } from "react-native-modalfy";
import { PageContext } from '../contexts/PageContext';
import DetailsPage from '../components/common/DetailsPage/DetailsPage';
import TabsContainerComponent from '../components/common/Tabs/TabsContainerComponent';
import { getEquipmentTypeById } from '../api/network';
import EquipmentGroupGeneralTab from '../components/OverlayTabs/EquipmentGroupGeneralTab';
import { useTheme } from 'emotion-theming';
import EditableEquipmentGroupTab from '../components/OverlayTabs/EditableEquipmentGroupTab';

function EquipmentGroupDetailsPage(props) {
    const theme = useTheme();
    const modal = props.modal;
    const { data = {}, onCreated = () => { } } = props.route.params;
    const { name = "", _id = "", equipments = [], suppliers = [], description = '', categories = [] } = data
    const tabs = ["Details"];
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [pageState, setPageState] = useState({});
    const [selectedEquipment, setSelectedEquipment] = useState({});
    const [isInfoUpdated, setIsInfoUpdated] = useState(false)






    useEffect(() => {
        fetchEquipmentGroup(_id)
    }, []);

    useEffect(() => {
        if (!pageState.isEditMode && isInfoUpdated) confirmAction();
    }, [pageState.isEditMode]);

    const [fields, setFields] = useState({
        name: name,
        description: description,
        sku: equipments[0].sku,
        supplier: suppliers,
        quantity: equipments.length,
        categories: categories,
    })




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

    const [popoverList, setPopoverList] = useState([
        {
            name: "category",
            status: false
        },

    ])

    const handlePopovers = (popoverValue) => (popoverItem) => {

        if (!popoverItem) {
            let updatedPopovers = popoverList.map(item => {
                return {
                    ...item,
                    status: false
                }
            })

            setPopoverList(updatedPopovers)
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue };
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers)
        }

    }


    // ###### HELPER FUNCTIONS

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        })
    }
    const confirmAction = () => {
        // setTimeout(() => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate={true}
                    onCancel={onConfirmCancel}
                    onAction={onConfirmSave}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
        // }, 200)
    };

    const onConfirmSave = () => {
        modal.closeModals('ConfirmationModal');
        setTimeout(() => {
            // updatePhysicianRecord(selectedPhysician);
            updatePhysicianCall(selectedPhysician);
            setIsInfoUpdated(false);
        }, 200);
    };

    const onConfirmCancel = () => {
        modal.closeModals('ConfirmationModal');
        setPageState({
            ...pageState,
            isEditMode: true
        });
    };

    // ##### Event Handlers

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
        setIsInfoUpdated(true);
    };

    const onTabPress = (selectedTab) => {
        if (!pageState.isEditMode) setCurrentTab(selectedTab);
    };

    const goToAddEquipment = () => {
        props.navigation.navigate("AddEquipmentPage", { equipment: selectedEquipment, onCreated: onCreated });
        props.modal.closeAllModals();

    }

    const getContentData = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return pageState.isEditMode ?
                    <EditableEquipmentGroupTab
                        handlePopovers={handlePopovers}
                        popoverList={popoverList}
                        fields={fields}
                        onFieldChange={onFieldChange}
                    />
                    :
                    <EquipmentGroupGeneralTab
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
