import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import General from '../OverlayTabs/General';
import EditableEquipmentDetails from '../OverlayTabs/EditableEquipmentDetails';
import moment from 'moment';
import { colors } from "../../styles";
import { getEquipmentById } from "../../api/network";
import { formatDate } from '../../utils/formatter';
import BottomSheetContainer from '../common/BottomSheetContainer';
import { PageContext } from "../../contexts/PageContext";
import DetailsPage from "../common/DetailsPage/DetailsPage";
import TabsContainer from "../common/Tabs/TabsContainerComponent";
import SvgIcon from "../../../assets/SvgIcon";

function EquipmentItemPage({ route, navigation }) {

    const { equipment, info, isOpenEditable, group } = route.params;


    console.log("Info item has:", info);
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
    const [selectedEquipment, setSelectedEquipment] = useState(equipment)
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState('')
    const [isFetching, setFetching] = useState(false);
    const [pageState, setPageState] = useState({});

    const {
        // supplier id
        _id = "",
        name,
        // supplier name
        supplier,
        assigned,
        status,
        usage,
        availableOn,
        categories,
        description,
        sku
    } = equipment

    const [fields, setFields] = useState({
        // supplier name
        sku: sku,
        supplier: supplier,
        assigned: assigned,
        status: info.status,
        usage: usage,
        availableOn: availableOn,
        categories: categories,
        description: description
    })

    // ##### Lifecycle Methods
    useEffect(() => {
        setTimeout(() => {
            fetchEquipment(_id)
        }, 200)

    }, []);

    // ##### Event Handlers

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
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

                console.log("Fields has", fields);
                return pageState.isEditMode ?
                    <EditableEquipmentDetails fields={fields} onFieldChange={onFieldChange} />
                    :
                    <General equipment={selectedEquipment} updatedInfo={info} />;
            default:
                return <View />
        }
    };

    const overlayContent = <View style={{ flex: 1, padding: 30 }}>
        {getTabContent(currentTab)}
    </View>;

    const fetchEquipment = (id) => {
        setPageLoading(true);
        getEquipmentById(id)
            .then(data => {
                // console.log("Data:", data)
                setSelectedEquipment(data)
                setEquipment(data)
            })
            .catch(error => {
                console.log("Failed to get equipment", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false);
            })
    };
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

export default EquipmentItemPage;
