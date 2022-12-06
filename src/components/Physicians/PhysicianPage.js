import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {useModal} from 'react-native-modalfy';
import SlideOverlay from '../common/SlideOverlay/SlideOverlay';
import PhysiciansDetailsTab from '../OverlayTabs/PhysiciansDetailsTab';
import EditablePhysiciansDetailsTab from '../OverlayTabs/EditablePhysiciansDetailsTab';
import CaseFilesTab from '../OverlayTabs/CaseFilesTab';
import CustomProceduresTab from '../OverlayTabs/CustomProceduresTab';
import BottomSheetContainer from '../common/BottomSheetContainer';
import {getAppointments, getPhysicianById, updatePhysician} from '../../api/network';
import PaginatedSchedule from '../PaginatedSchedule';
import {colors} from '../../styles';
import Footer from "../common/Page/Footer";
import {updatePhysicianRecord} from '../../redux/actions/physiciansActions';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../common/DetailsPage/DetailsPage';
import TabsContainer from '../common/Tabs/TabsContainerComponent';
import ConfirmationComponent from '../ConfirmationComponent';

function PhysicianPage({route, navigation}) {
    const {physician, isOpenEditable, reloadPhysicians} = route.params;
    const currentTabs = ['Details', 'Case Files', 'Custom Procedures', 'Schedule'];
    const modal = useModal();
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
        emergencyContact,
        field
    } = physician;
    // ##### States

    const [name, setName] = useState(`Dr. ${firstName} ${surname}`);
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedPhysician, setSelectedPhysician] = useState(physician);
    // const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState(currentTab);
    const [isFetching, setFetching] = useState(false);
    const [isInfoUpdated, setIsInfoUpdated] = useState(false);
    const [pageState, setPageState] = useState({});

    const [fields, setFields] = useState({
        firstName,
        middleName,
        surname,
        dob,
        trn,
        gender,
        emails,
        address,
        phones,
        emergencyContact,
        field
    });

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchPhysician(_id);
        //console.log('and mek yuh touch yuh tonsil');
    }, []);

    useEffect(() => {
        if (!pageState.isEditMode && isInfoUpdated) confirmAction();
    }, [pageState.isEditMode]);

    // ##### Event Handlers

    const onTabPress = selectedTab => {
        if (!pageState.isEditMode) setCurrentTab(selectedTab);
    };

    // const onEditPress = tab => {
    //     setEditableTab(tab);
    //     setEditMode(!isEditMode);
    //     if (!isEditMode === false) {
    //         const fieldsObject = {
    //             ...fields,
    //             phones: removeIds(fields.phones),
    //             emails: removeIds(fields.emails),
    //             address: removeIds(fields.address),
    //             emergencyContact: removeIds(fields.emergencyContact)
    //         };
    //         setSelectedPhysician({...fieldsObject, _id});
    //         updatePhysicianFn(_id, fieldsObject);
    //     }
    // };

    const confirmAction = () => {
        // setTimeout(() => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate={true}
                    onCancel={onConfirmCancel}
                    onAction={onConfirmSave}
                    message="Would you like to finish editing and save the change?"
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

    const onFieldChange = fieldName => value => {
        // console.log("FIELD NAME: ", fieldName)
        // console.log("VALUE: ", value)
        setFields({
            ...fields,
            [fieldName]: value
        });

        setIsInfoUpdated(true);
        setSelectedPhysician({...selectedPhysician, [fieldName]: value});
    };

    const backTapped = () => {
        navigation.navigate('Physicians');
    };

    // ##### Helper functions

    // handles updating doctor info.
    // so you'd click the edit button at the top right
    // after clicking on a specific doctor
    const updatePhysicianCall = updatedFields => {
        updatePhysician(_id, updatedFields)
            .then(data => {
                fetchPhysician(_id);
                console.log('Physician data from db: ', data);

                if (reloadPhysicians) reloadPhysicians();

                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Changes were successful"//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                // todo handle error
                console.log('failed to update physician', error);
            });
    };

    const removeIds = array => {
        const updatedArray = array.map(obj => {
            const newObj = obj;
            delete newObj._id;
            return {...newObj};
        });

        return updatedArray;
    };

    // once you click on a doctor's name
    // you get several tabs to select from
    // i suppose this handles what gets displayed
    // when you click a specific tab
    const getTabContent = selectedTab => {
        const {cases = [], procedures = []} = selectedPhysician;
        switch (selectedTab) {
            case 'Details':
                return editableTab === 'Details' && pageState.isEditMode ? (
                    <EditablePhysiciansDetailsTab
                        fields={fields}
                        onFieldChange={onFieldChange}
                    />
                ) : <PhysiciansDetailsTab physician={selectedPhysician}/>;
            case 'Case Files':
                return <CaseFilesTab setSelectedPhysician={setSelectedPhysician} selectedPhysician={selectedPhysician} cases={cases}/>;
            case 'Custom Procedures':
                return <CustomProceduresTab selectedPhysician={selectedPhysician} procedures={procedures} setSelectedPhysician={setSelectedPhysician} />;
            case 'Schedule':
                return <PaginatedSchedule ID={physician._id} isPhysician={true}/>;
            default:
                return <View/>;
        }
    };

    const getIsEditable = () => {
        switch (currentTab) {
            case 'Case Files':
                return true;
            default:
                return false;
        }
    };

    const fetchPhysician = id => {
        setPageLoading(true);
        getPhysicianById(id)
            .then(data => {
                console.log("Docter Data",data)
                setSelectedPhysician(data);

                const {firstName, surname} = data;
                setName(`Dr. ${firstName} ${surname}`);
                // setPhysician(data)
            })
            .catch(error => {
                console.log('Failed to get physician', error);
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    // happens when switching tabs
    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    // takes in doctor id and their info
    // allows you to edit it and save the new info 
    // in a state
    const updatePhysicianFn = (id, data) => {
        updatePhysician(id, data)
            .then((data, id) => {
                const newData = {
                    _id: id,
                    ...data
                };
                updatePhysicianRecord(newData);
            })
            .catch(error => {
                console.log('Failed to update physician', error);
            });
    };

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
            <PageContext.Provider value={{pageState, setPageState}}>
                <DetailsPage
                    title={name}
                    subTitle=""
                    headerChildren={[name]}
                    onBackPress={backTapped}
                    isArchive={getIsEditable()}
                   
                    pageTabs={(
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={currentTab}
                            onPressChange={onTabPress}
                        />
                    )}
                >

                    {getTabContent(currentTab)}

                </DetailsPage> 
                

            </PageContext.Provider>
        </>
    );
}

PhysicianPage.propTypes = {};
PhysicianPage.defaultProps = {};

const mapDispatcherToProp = {updatePhysicianRecord};

export default connect(null, mapDispatcherToProp)(PhysicianPage);
