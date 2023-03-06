import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useModal} from 'react-native-modalfy';
import {useCode} from 'react-native-reanimated';
import Configuration from '../../components/OverlayTabs/Configuration';
import NotesTab from '../../components/OverlayTabs/NotesTab';
import ProceduresConsumablesTab from '../../components/OverlayTabs/ProceduresConsumablesTab';
import ProceduresEquipmentTab from '../../components/OverlayTabs/ProceduresEquipmentTab';
import EditableProceduresConfig from '../../components/OverlayTabs/EditableProceduresConfig';
import TheatresTab from '../../components/OverlayTabs/TheatresTab';
import ActionItem from '../../components/common/ActionItem';
import AddIcon from '../../../assets/svg/addIcon';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import ConfirmationComponent from '../../components/ConfirmationComponent';

import {updateProcedure, getProcedureById} from '../../api/network';
import {setProcedureEdit} from '../../redux/actions/procedurePageActions';
import {PageContext} from '../../contexts/PageContext';
import {formatPhysician} from "../../utils";

function ProcedurePage({route, navigation}) {
    const currentTabs = ['Configuration', 'Consumables', 'Equipment', 'Notes', 'Theatres'];
    const modal = useModal();
    // const { pageState } = useContext(PageContext);
    // const { isEditMode } = pageState;

    const {procedure, isOpenEditable, onUpdate} = route.params;
    console.log("procedur information", procedure)
    const {
        _id = '',
        name,
        description = '',
        hasRecovery,
        duration,
        custom = false,
        physicians = [],
    } = procedure;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [pageState, setPageState] = useState({});
    const [selectedProcedure, setSelectedProcedure] = useState({});
    const [isInfoUpdated, setIsInfoUpdated] = useState(false);

    const [fields, setFields] = useState({
        description,
        name,
        duration,
        hasRecovery,
        custom,
        physicians: physicians
        
    });

    const [popoverList, setPopoverList] = useState([
        {
            name: 'physicians',
            status: false
        }
    ]);

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchProcedure(_id);
    }, []);

    useEffect(() => {
        if (pageState.isEditMode === false && isInfoUpdated === true) {
            confirmAction();
            // updateProcedureCall(selectedProcedure)
        }
    }, [pageState.isEditMode]);

    // ##### Event Handlers

    const onTabPress = selectedTab => {
        if (!pageState.isEditMode) setCurrentTab(selectedTab);
    };

    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    const confirmAction = () => {
        // setTimeout(() => {
        modal
            .openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={true}
                        onCancel={onConfirmCancel}
                        onAction={onConfirmSave}
                        message="Do you want to save these changes ?"
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
            console.log('Updated: ', selectedProcedure);
            updateProcedureCall(selectedProcedure);
            setIsInfoUpdated(false);
        }, 200);
    };

    const onConfirmCancel = () => {
        modal.closeModals('ConfirmationModal');
        fetchProcedure(_id);
        setPageState({
            ...pageState,
            isEditMode: false
        });
    };

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value
        });
        console.log('Fields: ', fieldName, value);
        setIsInfoUpdated(true);
        setSelectedProcedure({
            ...selectedProcedure,
            [fieldName]: value
        });
    };

    const handlePopovers = popoverValue => popoverItem => {
        if (!popoverItem) {
            const updatedPopovers = popoverList.map(item => ({
                ...item,
                status: false
            }));

            setPopoverList(updatedPopovers);
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = {
                ...popoverList[objIndex],
                status: popoverValue
            };
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers);
        }
    };

    const fetchProcedure = id => {
        setPageLoading(true);
        getProcedureById(id)
            .then(data => {
                setSelectedProcedure(data);
                setFields({...fields, physicians: data?.physicians || []})
                console.log('Fetched data: ', data);
                // setProcedure(data)
            })
            .catch(error => {
                console.log('Failed to get procedure', error);
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    const onAddInventory = data => {
        const {inventories = []} = selectedProcedure;
        const updatedInventory = inventories.map(item => ({
            inventory: item?.inventory._id,
            amount: item?.amount
        }));
        const newData = [...updatedInventory, ...data?.inventories];
        const newProcedureData = {
            ...selectedProcedure,
            inventories: newData
        };
        setIsInfoUpdated(true);
        // setSelectedProcedure(newProcedureData)
        updateProcedureCall(newProcedureData);
    };

    const onAddEquipment = data => {
        const {equipments = []} = selectedProcedure;
        const updatedEquipments = equipments.map(item => ({
            equipment: item?.equipment._id,
            amount: item?.amount
        }));
        const newData = [...updatedEquipments, ...data?.equipments];

        const newProcedureData = {
            ...selectedProcedure,
            equipments: newData
        };
        setIsInfoUpdated(true);
        // setSelectedProcedure(newProcedureData)
        updateProcedureCall(newProcedureData);
    };

    const onAddItems = data => {
        // console.log("Dtae in add function: ", data);
        const {inventories = [], equipments = []} = selectedProcedure;
        const updatedInventory = inventories.map(item => ({
            inventory: item?.inventory._id,
            amount: item?.amount
        }));
        const updatedEquipments = equipments.map(item => ({
            equipment: item?.equipment._id,
            amount: item?.amount
        }));
        const newInventory = [...updatedInventory, ...data?.inventories];
        const newEquipment = [...updatedEquipments, ...data?.equipments];
        const newProcedureData = {
            inventories: newInventory,
            equipments: newEquipment
        };

        console.log('New procedure: ', newProcedureData);
        setIsInfoUpdated(true);
        // setSelectedProcedure(newProcedureData);
        updateProcedureCall(newProcedureData);
    };

    const onAddTheatre = data => {
        const {supportedRooms = []} = selectedProcedure;
        const newData = [...supportedRooms, data];
        const newProcedureData = {
            ...selectedProcedure,
            supportedRooms: newData
        };
        setIsInfoUpdated(true);
        setSelectedProcedure(newProcedureData);
        updateProcedureCall(newProcedureData);
    };

    const onDetailsUpdate = data => {
        console.log('Data: ', data);
    };

    const handleInventoryUpdate = data => {
        const procedure = {
            ...selectedProcedure,
            inventories: data
        };
        const updatedObj = {inventories: data};
        setSelectedProcedure(procedure);
        setIsInfoUpdated(true);
        // Change updated
        // updateProcedureCall(updatedObj)
    };

    const handleEquipmentDelete = data => {
        const procedure = {
            ...selectedProcedure,
            equipments: data
        };
        setSelectedProcedure(procedure);
        updateProcedureCall(procedure);
    };

    const handleConsumablesDelete = data => {
        const procedure = {
            ...selectedProcedure,
            inventories: data
        };
        setSelectedProcedure(procedure);
        updateProcedureCall(procedure);
    };

    const handleTheatresDelete = data => {
        const procedure = {
            ...selectedProcedure,
            supportedRooms: data
        };
        setSelectedProcedure(procedure);
        updateProcedureCall(procedure);
    };

    const updateNote = data => {
        const procedure = {
            ...selectedProcedure,
            notes: data
        };
        setSelectedProcedure(procedure);
        setIsInfoUpdated(true);
        // console.log("Procedure: ", selectedProcedure)
    };

    const updateProcedureCall = updatedFields => {
        updateProcedure(_id, updatedFields)
            .then(data => {
                // getProcedures()
                onUpdate();
                fetchProcedure(_id);
                console.log('Success: ', data);

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
                            message="Changes were successfully made."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
                // modal.closeAllModals();
                // setTimeout(() => {onCreated(data)}, 200);
            })
            .catch(error => {
                // todo handle error
                console.log('failed to update procedure', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                                // resetState();
                            }}
                            message="Something went wrong when applying changes."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => console.log('Modal closed'),
                });
            });
    };

    const getFabActions = () => {
        let title = 'Actions';
        const floatingAction = [];

        switch (currentTab) {
            case 0: {
                const addNewItem = (
                    <ActionItem
                        title="Add Inventory Item"
                        icon={<AddIcon/>}
                        onPress={_ => {
                        }}
                    />
                );
                const removeLineItemAction = (
                    <ActionItem
                        title="Remove Consumable"
                        icon={<DeleteIcon/>}
                        onPress={_ => {
                        }}
                    />
                );
                floatingAction.push(addNewItem, /*removeLineItemAction*/);
                title = 'CONSUMABLE\'S ACTIONS';
                break;
            }

            default:
                break;
        }

        return <ActionContainer
            floatingActions={floatingAction}
            title={title}
        />;
    };

    const getTabContent = selectedTab => {
        const {inventories = [], equipments = [], notes = '', supportedRooms = []} = selectedProcedure;
        switch (selectedTab) {
            case 'Configuration':
                return <Configuration
                    procedure={selectedProcedure}
                    onDetailsUpdate={onDetailsUpdate}
                    fields={fields}
                    setFields ={setFields}
                    onFieldChange={onFieldChange}
                />;
            case 'Consumables':
                return <ProceduresConsumablesTab
                    consumablesData={inventories}
                    handleInventoryUpdate={handleInventoryUpdate}
                    handleConsumablesDelete={handleConsumablesDelete}
                    onAddInventory={onAddInventory}
                    navigation={navigation}
                    procedureId={_id}
                />;
            case 'Equipment':
                return <ProceduresEquipmentTab
                    equipmentsData={equipments}
                    onAddEquipment={onAddEquipment}
                    handleEquipmentDelete={handleEquipmentDelete}
                    onAddItems={onAddItems}
                    navigation={navigation}
                    // handleEquipmentUpdate={handleEquipmentUpdate}
                />;
            case 'Notes':
                return <NotesTab
                    notesData={notes}
                    updateNote={updateNote}
                />;
            case 'Theatres':
                return <TheatresTab
                    theatresData={supportedRooms}
                    onAddTheatre={onAddTheatre}
                    handleTheatresDelete={handleTheatresDelete}
                />;
            default:
                return <View/>;
        }
    };

    const getIsEditable = () => {
        switch (currentTab) {
            case 'Configuration':
                return false;
            case 'Consumables':
                return false;
            case 'Equipment':
                return false;
            case 'Notes':
                return false;
            case 'Theatres':
                return true;
            default:
                return false;
        }
    };
    const physicianName = formatPhysician(physicians);

    return (
        <PageContext.Provider value={{
            pageState,
            setPageState
        }}
        >
            <DetailsPage
                headerChildren={[name, physicianName]}
                onBackPress={() => {
                    navigation.navigate('Procedures');
                }}
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
    );
}

const mapDispatchToProps = dispatch => bindActionCreators({setProcedureEdit}, dispatch);

ProcedurePage.propTypes = {};
ProcedurePage.defaultProps = {};

export default connect(null, mapDispatchToProps)(ProcedurePage);
