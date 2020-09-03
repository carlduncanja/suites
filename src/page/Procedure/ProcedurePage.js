import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import Configuration from '../../components/OverlayTabs/Configuration';
import NotesTab from '../../components/OverlayTabs/NotesTab';
import ProceduresConsumablesTab from '../../components/OverlayTabs/ProceduresConsumablesTab';
import ProceduresEquipmentTab from '../../components/OverlayTabs/ProceduresEquipmentTab';
import EditableProceduresConfig from '../../components/OverlayTabs/EditableProceduresConfig';
import TheatresTab from '../../components/OverlayTabs/TheatresTab';
import ActionItem from "../../components/common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import DetailsPage from "../../components/common/DetailsPage/DetailsPage";
import TabsContainer from "../../components/common/Tabs/TabsContainerComponent";
import ConfirmationComponent from '../../components/ConfirmationComponent';

import {updateProcedure, getProcedureById} from "../../api/network";
import {setProcedureEdit} from "../../redux/actions/procedurePageActions";
import {connect} from 'react-redux';
import {PageContext} from "../../contexts/PageContext";
import { bindActionCreators } from 'redux';
import { useModal } from "react-native-modalfy";
import { useCode } from 'react-native-reanimated';


function ProcedurePage({route, setProcedureEdit, navigation}) {

    const currentTabs = ["Configuration", "Consumables", "Equipment", "Notes", "Theatres"];
    const modal = useModal();
    // const { pageState } = useContext(PageContext);
    // const { isEditMode } = pageState;

    const {procedure, isOpenEditable} = route.params

    const {
        _id = "",
        name,
        hasRecovery,
        duration,
        physician
    } = procedure;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [pageState, setPageState] = useState({});
    const [selectedProcedure, setSelectedProcedure] = useState({})
    const [isInfoUpdated, setIsInfoUpdated] = useState(false)

    const [fields, setFields] = useState({
        name: name,
        hasRecovery: hasRecovery,
        duration: duration.toString(),
        custom: true,
        physician: physician,
    })

    const [popoverList, setPopoverList] = useState([
        {
            name: "physician",
            status: false
        }
    ])

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchProcdure(_id)
    }, []);

    useEffect(()=>{
        if(pageState.isEditMode === false && isInfoUpdated === true){
            confirmAction();
            // updateProcedureCall(selectedProcedure)
        }
    },[pageState.isEditMode])

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!pageState.isEditMode) setCurrentTab(selectedTab);
    };

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading : value,
            isEdit : false
        })
    }


    const confirmAction = () =>{
        // setTimeout(() => {
            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {true}
                            onCancel = {onConfirmCancel}
                            onAction = {onConfirmSave}
                        />
                        ,
                        onClose: () => {modal.closeModals("ConfirmationModal")}
                    })
        // }, 200)
    }

    const onConfirmSave = () =>{
        modal.closeModals('ConfirmationModal');
        setTimeout(()=>{
            updateProcedureCall(selectedProcedure)
            setIsInfoUpdated(false)
        },200)
    }

    const onConfirmCancel = () => {
        modal.closeModals('ConfirmationModal');
        setPageState({
            ...pageState,
            isEditMode : true
        });
    }

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })

        setSelectedProcedure({...selectedProcedure, [fieldName]: value})
    };

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
            const updatedObj = {...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers)
        }

    }

    const fetchProcdure = (id) => {
        setPageLoading(true)
        getProcedureById(id)
            .then(data => {
                setSelectedProcedure(data)
                // setProcedure(data)
            })
            .catch(error => {
                console.log("Failed to get procedure", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false)
            })
    };

    const onAddInventory = (data) => {
        let {inventories = []} = selectedProcedure
        let newData = [...inventories, data]
        let newProcedureData = {...selectedProcedure, inventories: newData}
        setIsInfoUpdated(true)
        setSelectedProcedure(newProcedureData)
        updateProcedureCall(newProcedureData)
    }

    const onAddEquipment = (data) => {
        let {equipments = []} = selectedProcedure
        let newData = [...equipments, data]
        let newProcedureData = {...selectedProcedure, equipments: newData}
        setIsInfoUpdated(true)
        setSelectedProcedure(newProcedureData)
        updateProcedureCall(newProcedureData)
    }

    const onAddTheatre = (data) => {
        let {supportedRooms = []} = selectedProcedure
        let newData = [...supportedRooms, data]
        let newProcedureData = {...selectedProcedure, supportedRooms: newData}
        setIsInfoUpdated(true)
        setSelectedProcedure(newProcedureData)
        updateProcedureCall(newProcedureData)
    }

    const handleInventoryUpdate = (data) => {
        const procedure = {...selectedProcedure, inventories: data}
        const updatedObj = {inventories: data}
        setSelectedProcedure(procedure)
        setIsInfoUpdated(true)
        // Change updated
        // updateProcedureCall(updatedObj)
    };

    // const handleEquipmentUpdate = (data) => {
    //     const procedure = {...selectedProcedure, equipments: data}
    //     setSelectedProcedure(procedure)
    //     setIsInfoUpdated(true)
    // };

    const handleEquipmentDelete = (data) => {
        const procedure = {...selectedProcedure, equipments: data}
        setSelectedProcedure(procedure)
        updateProcedureCall(procedure)
    };

    const handleConsumablesDelete = (data) => {
        const procedure = {...selectedProcedure, inventories: data}
        setSelectedProcedure(procedure)
        updateProcedureCall(procedure)
    };

    const handleTheatresDelete = (data) => {
        const procedure = {...selectedProcedure, supportedRooms: data}
        setSelectedProcedure(procedure)
        updateProcedureCall(procedure)
    }

    const updateNote = (data) => {
        const procedure = {...selectedProcedure, notes : data}
        setSelectedProcedure(procedure)
        setIsInfoUpdated(true)
        // console.log("Procedure: ", selectedProcedure)
    }

    const updateProcedureCall = (updatedFields) => {
        updateProcedure(_id, updatedFields)
            .then(data => {
                // getProcedures()
                fetchProcdure(_id)
                console.log("Data from db: ", data)
                // modal.closeAllModals();
                // setTimeout(() => {onCreated(data)}, 200);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to update procedure", error)
            })
    }

    const getFabActions = () => {
        let title = "Actions";
        let floatingAction = [];

        switch (currentTab) {
            case 0: {
                const addNewItem = <ActionItem title={"Add Inventory Item"} icon={<AddIcon/>} onPress={_ => {
                }}/>;
                const removeLineItemAction = <ActionItem title={"Remove Consumable"} icon={<DeleteIcon/>}
                                                         onPress={_ => {
                                                         }}/>;
                floatingAction.push(addNewItem, /*removeLineItemAction*/)
                title = "CONSUMABLE'S ACTIONS"
                break;
            }


            default:
                break;
        }

        return <ActionContainer
            floatingActions={floatingAction}
            title={title}
        />

    }


    const getTabContent = (selectedTab) => {


        const {inventories = [], equipments = [], notes = "", supportedRooms = []} = selectedProcedure
        switch (selectedTab) {
            case "Configuration":
                return currentTab === 'Configuration' && pageState.isEditMode ?
                    <TouchableOpacity
                        style={{flex: 1}}
                        activeOpacity={1}
                        onPress={() => {
                            handlePopovers(false)()
                        }}
                    >
                        <EditableProceduresConfig
                            fields={fields}
                            onFieldChange={onFieldChange}
                            popoverList={popoverList}
                            handlePopovers={handlePopovers}
                        />
                    </TouchableOpacity>

                    :
                    <Configuration procedure={selectedProcedure}/>;
            case "Consumables":
                return <ProceduresConsumablesTab
                    consumablesData={inventories}
                    onAddInventory={onAddInventory}
                    handleInventoryUpdate={handleInventoryUpdate}
                    handleConsumablesDelete = {handleConsumablesDelete}
                />
            case "Equipment":
                return <ProceduresEquipmentTab
                    equipmentsData={equipments}
                    onAddEquipment={onAddEquipment}
                    handleEquipmentDelete = {handleEquipmentDelete}
                    // handleEquipmentUpdate={handleEquipmentUpdate}
                />;
            case "Notes":
                return <NotesTab
                    notesData={notes}
                    updateNote = {updateNote}
                />;
            case "Theatres" :
                return <TheatresTab
                    theatresData={supportedRooms}
                    onAddTheatre={onAddTheatre}
                    handleTheatresDelete = {handleTheatresDelete}
                />
            default :
                return <View/>
        }
    };

    let physicianName = `Dr. ${physician?.firstName[0]} . ${physician?.surname}`;

    return (
        <PageContext.Provider value ={{ pageState, setPageState}}>
            <DetailsPage
                headerChildren={[name, physicianName]}
                onBackPress = {() =>{navigation.navigate('Procedures')}}
                pageTabs = {
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
    );
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setProcedureEdit
}, dispatch)

ProcedurePage.propTypes = {};
ProcedurePage.defaultProps = {};

export default connect(null, mapDispatchToProps)(ProcedurePage);

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
    footer: {
        // alignSelf: 'flex-end',
        // flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        // marginBottom: 20,
        right: 30,
        // marginRight: 30,
        // backgroundColor:'red'
    }
})
