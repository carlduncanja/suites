import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import PhysiciansDetailsTab from "../OverlayTabs/PhysiciansDetailsTab";
import EditablePhysiciansDetailsTab from "../OverlayTabs/EditablePhysiciansDetailsTab";
import CaseFilesTab from "../OverlayTabs/CaseFilesTab";
import CustomProceduresTab from "../OverlayTabs/CustomProceduresTab";
import BottomSheetContainer from '../common/BottomSheetContainer';
import { getAppointments } from "../../api/network";
import PaginatedSchedule from "../PaginatedSchedule"
import { colors } from "../../styles";
import { getPhysicianById, updatePhysician } from "../../api/network";
import { updatePhysicianRecord } from "../../redux/actions/physiciansActions";
import { connect } from 'react-redux';
import { PageContext } from "../../contexts/PageContext";
import DetailsPage from "../common/DetailsPage/DetailsPage";
import TabsContainer from "../common/Tabs/TabsContainerComponent";

function PhysicianPage({ route, navigation }) {
    const { physician, isOpenEditable } = route.params;

    const currentTabs = ["Details", "Case Files", "Custom Procedures", "Schedule"];
    const {
        _id,
        firstName,
        middleName,
        surname,
        dob,
        gender,
        trn,
        emails,
        address,
        phones,
        emergencyContact
    } = physician
    const name = `Dr. ${firstName} ${surname}`
    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedPhysician, setSelectedPhysician] = useState(physician)
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState(currentTab)
    const [isFetching, setFetching] = useState(false);
    const [pageState, setPageState] = useState({});


    const [fields, setFields] = useState({
        firstName: firstName,
        middleName: middleName,
        surname: surname,
        dob: dob,
        trn: trn,
        gender: gender,
        emails: emails,
        address: address,
        phones: phones,
        emergencyContact: emergencyContact
    })

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchPhysician(_id)
    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = (tab) => {
        setEditableTab(tab)
        setEditMode(!isEditMode)
        if (!isEditMode === false) {
            let fieldsObject = {
                ...fields,
                phones: removeIds(fields['phones']),
                emails: removeIds(fields['emails']),
                address: removeIds(fields['address']),
                emergencyContact: removeIds(fields['emergencyContact'])
            }
            setSelectedPhysician({ ...fieldsObject, _id })
            updatePhysicianFn(_id, fieldsObject)
        }
    }


    const onFieldChange = (fieldName) => (value) => {
        // console.log("FIELD NAME: ", fieldName)
        // console.log("VALUE: ", value)
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const backTapped = () => {
        navigation.navigate("Physicians");
    }

    // ##### Helper functions

    const removeIds = (array) => {
        let updatedArray = array.map(obj => {
            let newObj = obj
            delete newObj['_id']
            return { ...newObj }
        })

        return updatedArray
    }

    const getTabContent = (selectedTab) => {
        const { cases = [], procedures = [] } = selectedPhysician
        switch (selectedTab) {
            case "Details":
                return editableTab === 'Details' && isEditMode ?
                    <EditablePhysiciansDetailsTab
                        fields={fields}
                        onFieldChange={onFieldChange} />
                    :
                    <PhysiciansDetailsTab physician={selectedPhysician} />
            case "Case Files":
                return <CaseFilesTab cases={cases} />;
            case "Custom Procedures":
                return <CustomProceduresTab procedures={procedures} />;
            case "Schedule":
                return <PaginatedSchedule ID={physician._id} isPhysician={true} />
            default:
                return <View />
        }
    };


    const fetchPhysician = (id) => {
        setFetching(true);
        setPageLoading(true);
        getPhysicianById(id)
            .then(data => {
                setSelectedPhysician(data)
                // setPhysician(data)
            })
            .catch(error => {
                console.log("Failed to get physician", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false);
                setFetching(false)
            })
    };

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        })
    }


    const updatePhysicianFn = (id, data) => {
        updatePhysician(id, data)
            .then((data, id) => {
                let newData = {
                    _id: id,
                    ...data
                }
                updatePhysicianRecord(newData)
            })
            .catch(error => {
                console.log("Failed to update physician", error)
            })
    }

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

                    <PhysicianPageContent
                        overlayContent={getTabContent(currentTab)}

                    />


                </DetailsPage>
            </PageContext.Provider>
        </>
    );
}

PhysicianPage.propTypes = {};
PhysicianPage.defaultProps = {};

const mapDispatcherToProp = {
    updatePhysicianRecord
};

export default connect(null, mapDispatcherToProp)(PhysicianPage)

function PhysicianPageContent({
    overlayContent,

}) {



    return (
        <>
            {
                overlayContent
            }

        </>
    )

}

