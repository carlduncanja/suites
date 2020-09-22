import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from "react-native";
import ConfirmationComponent from "../components/ConfirmationComponent";
import { PageContext } from "../contexts/PageContext";
import DetailsPage from "../components/common/DetailsPage/DetailsPage";
import TabsContainer from "../components/common/Tabs/TabsContainerComponent";
import SvgIcon from "../../assets/SvgIcon";
import { withModal } from 'react-native-modalfy';
import AssignedManagmentTab from '../components/OverlayTabs/AssignedManagmentTab';

function AssignmentManagementPage({ route, navigation, modal }) {

    const { assignments = [], group, name } = route.params;

    const currentTabs = ["Details"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);

    const [isEditMode, setEditMode] = useState(false);
    const [editableTab, setEditableTab] = useState('')
    const [isFetching, setFetching] = useState(false);
    const [isInfoUpdated, setIsInfoUpdated] = useState(false);
    const [pageState, setPageState] = useState({});



    const [fields, setFields] = useState({
        // supplier name
        sku: '',
        description: '',
        status: '',
        assigned: ''
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
                return <AssignedManagmentTab assignments={assignments} />

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
                    headerChildren={[group.name, name, 'Assigned']}
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



export default withModal(AssignmentManagementPage);
