import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import General from '../OverlayTabs/General';
import EditableEquipmentDetails from '../OverlayTabs/EditableEquipmentDetails';
import moment from 'moment';
import { colors } from "../../styles";
import { updateEquipment } from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";
import { formatDate } from '../../utils/formatter';
import BottomSheetContainer from '../common/BottomSheetContainer';
import { PageContext } from "../../contexts/PageContext";
import DetailsPage from "../common/DetailsPage/DetailsPage";
import TabsContainer from "../common/Tabs/TabsContainerComponent";
import SvgIcon from "../../../assets/SvgIcon";
import { withModal } from 'react-native-modalfy';

function EquipmentItemPage({ route, navigation, modal }) {

    const { equipment, info, isOpenEditable, group, onCreated } = route.params;
    const testData = {
        description: "In endoscopy, Fibre-optic endoscopes are pliable, highly maneuverable instruments that allow access to channels in the body.",
        assigned: "Dr.Mansingh",
        status: info.status,
        supplier: 'Medical Suppliers Ltd.',
        usage: '12 Hours',
        availableOn: formatDate(equipment.nextAvailable, "DD/MM/YYYY")
    }


    const currentTabs = ["Details"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedEquipment, setSelectedEquipment] = useState(equipment);
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState('')
    const [isFetching, setFetching] = useState(false);
    const [isInfoUpdated, setIsInfoUpdated] = useState(false);
    const [pageState, setPageState] = useState({});

    const {
        // supplier id
        _id = "",
        name,
        // supplier name
        supplier,
        assigned,
        sku
    } = equipment


    const [fields, setFields] = useState({
        // supplier name
        sku: sku,
        description: info.description,
        status: info.status,
        // assigned: equipment?.assignments[0]?.theatre || "",
    })

    // ##### Lifecycle Methods


    useEffect(() => {
        if (!pageState.isEditMode && isInfoUpdated) confirmAction();
    }, [pageState.isEditMode]);


    const confirmAction = () => {
        // setTimeout(() => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate={true}
                    message={"Do you wish to save your changes?"}
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
        const bodyToPass = {
            sku: fields['sku'],

        }

        console.log("Gonna send to endpoint:", bodyToPass);
        modal.closeModals('ConfirmationModal');
        setTimeout(() => {
            // updatePhysicianRecord(selectedPhysician);
            updateEquipmentCall(fields);
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

    const onSuccess = () => {
        modal.closeModals("ConfirmationModal");
        navigation.navigate("Equipment");
        onCreated();
    }
    const updateEquipmentCall = (info) => {
        updateEquipment(_id, info)
            .then(data => {
                console.log("successfully updated", data)
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content:
                            <ConfirmationComponent
                                isError={false}
                                message={"Completed Succefully"}
                                isEditUpdate={false}
                                onCancel={onConfirmCancel}
                                onAction={onSuccess}
                            />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                )
            }
            )
            .catch(error => {
                console.log("error occurred is:", error);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content:
                            <ConfirmationComponent
                                isError={true}
                                message={"There was an error performing this action"}
                                isEditUpdate={false}
                                onCancel={onConfirmCancel}
                                onAction={onConfirmSave}
                            />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                )
            }).finally(_ => {
            })
    }

    // ##### Event Handlers

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
        console.log("what's updated?", fields)
        setIsInfoUpdated(true);
    };

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = (tab) => {
        setEditableTab(tab)
        setEditMode(!isEditMode)
    }

    const backTapped = () => {
        navigation.navigate("Equipment");
    }

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        })
    }



    // ##### Helper functions

    const getTabContent = (selectedTab) => {

        switch (selectedTab) {
            case "Details":
                return pageState.isEditMode ?
                    <EditableEquipmentDetails
                        fields={fields}
                        onFieldChange={onFieldChange}
                    />
                    :
                    <General equipment={selectedEquipment} updatedInfo={info} navigation={navigation} groupInfo={group} name={name} />;
            default:
                return <View />
        }
    };

    const overlayContent = <View style={{ flex: 1, padding: 30 }}>
        {getTabContent(currentTab)}
    </View>;

    return (
        <>
            <PageContext.Provider value={{ pageState, setPageState }}>
                <DetailsPage
                    hasIcon={<SvgIcon iconName='paginationNext' strokeColor="#718096" />}
                    headerChildren={[group.name, name]}
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

EquipmentItemPage.propTypes = {};
EquipmentItemPage.defaultProps = {};

export default withModal(EquipmentItemPage);
