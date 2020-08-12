import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";
import SlideOverlay from "../../components/common/SlideOverlay/SlideOverlay";
import Configuration from '../../components/OverlayTabs/Configuration';
import NotesTab from '../../components/OverlayTabs/NotesTab';
import ProceduresConsumablesTab from '../../components/OverlayTabs/ProceduresConsumablesTab';
import ConsumablesTab from '../../components/OverlayTabs/ConsumablesTab';
import ProceduresEquipmentTab from '../../components/OverlayTabs/ProceduresEquipmentTab';
import EditableProceduresConfig from '../../components/OverlayTabs/EditableProceduresConfig';
import TheatresTab from '../../components/OverlayTabs/TheatresTab';
import {colors} from "../../styles";
import {currencyFormatter} from '../../utils/formatter';
import {updateProcedure} from "../../api/network";
import {setProcedureEdit} from "../../redux/actions/procedurePageActions";


import {getProcedureById} from "../../api/network";
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import ActionItem from "../../components/common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import {withModal} from 'react-native-modalfy';
import BottomSheetContainer from '../../components/common/BottomSheetContainer';
import {connect} from 'react-redux';
import {set} from 'numeral';
import DetailsPage from "../../components/common/DetailsPage/DetailsPage";
import {PageContext} from "../../contexts/PageContext";
import TabsContainer from "../../components/common/Tabs/TabsContainerComponent";

function ProcedurePage({route, isEditState, setProcedureEdit}) {

    const currentTabs = ["Configuration", "Consumables", "Equipment", "Notes", "Theatres"];

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
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [isFetching, setFetching] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState({})
    const [isInfoUpdated, setIsInfoUpdated] = useState(false)
    const [isFloatingActionDisabled, setIsDisabled] = useState(false)

    let updatedPhysician = {
        name: `Dr. ${physician.firstName} ${physician.surname}` || null,
        _id: physician._id || null
    }

    const [fields, setFields] = useState({
        name: name,
        hasRecovery: hasRecovery,
        duration: duration.toString(),
        custom: true,
        physician: physician
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

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = (tab) => {

        setProcedureEdit(!isEditState)
        setEditMode(!isEditMode)
        // console.log("Edit state, updated: ", !isEditState, isInfoUpdated)
        if (!isEditState === false && isInfoUpdated) {

            if (currentTab === 'Configuration') {
                updateProcedureCall(selectedProcedure)
                // onProcedureUpdate()
            } else if (currentTab === 'Consumables') {
                updateProcedureCall(selectedProcedure)
                // Add confirmation component
            }

        }
        // if(!isEditMode === false && isInfoUpdated){
        //     console.log("Info: ", selectedProcedure)
        //     // updateProcedureCall(selectedProcedure)
        //     // console.log("Fields:", fields)

        //     // updatePhysicianFn(_id, fieldsObject)
        // }
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
        setFetching(true);
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
                setFetching(false)
            })
    };

    const onAddInventory = (data) => {
        let {inventories = []} = selectedProcedure
        // let updatedData = {
        //     amount : data.amount,
        //     inventory : data.inventory._id
        // }
        // let updatedObj = { inventories : [...inventories, updatedData] }
        // let newInventories = inventories.map( item => {
        //     return {
        //         inventory : item.inventory._id,
        //         amount : item.amount
        //     }
        // })
        // let updatedArray = [...newInventories, updatedData]
        // let updatedObj = {
        //     inventories : updatedArray
        // }
        let newData = [...inventories, data]
        let newProcedureData = {...selectedProcedure, inventories: newData}
        setIsInfoUpdated(true)
        setSelectedProcedure(newProcedureData)
        // console.log("Data: ", updatedObj)
        updateProcedureCall(newProcedureData)
    }

    const handleInventoryUpdate = (data) => {
        const procedure = {...selectedProcedure, inventories: data}
        const updatedObj = {inventories: data}

        setSelectedProcedure(procedure)
        setIsInfoUpdated(true)
        // Change updated
        // updateProcedureCall(updatedObj)
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
        // console.log("Theatre: ", data)
        let {supportedRooms = []} = selectedProcedure
        let newData = [...supportedRooms, data]
        let newProcedureData = {...selectedProcedure, supportedRooms: newData}
        setIsInfoUpdated(true)
        setSelectedProcedure(newProcedureData)
        // updateProcedureCall(newProcedureData)
    }

    const onProcedureUpdate = () => {
        let newProcedureData = {
            ...selectedProcedure,
            name: fields['name'],
            hasRecovery: fields['hasRecovery'],
            duration: parseInt(fields['duration']),
            custom: fields['custom'],
            physician: fields['physician']
        }
        // console.log("New Procedure: ", newProcedureData)
        // setSelectedProcedure(newProcedureData)
        // updateProcedureCall(newProcedureData)
    }

    const handleEquipmentUpdate = (data) => {
        const procedure = {...selectedProcedure, equipments: data}
        const updatedObj = {inventories: data}
        setSelectedProcedure(procedure)
        setIsInfoUpdated(true)
        // Change updated
        // updateProcedureCall(updatedObj)
    }

    const updateProcedureCall = (updatedFields) => {
        updateProcedure(_id, updatedFields)
            .then(data => {
                // fetchProcdure(_id)
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

        const consumablesData = inventories.map(item => {
            return {
                item: item.inventory.name,
                type: "Anaesthesia",
                quantity: item.amount,
                unitPrice: item.inventory.unitPrice
            }
        });


        switch (selectedTab) {
            case "Configuration":
                return currentTab === 'Configuration' && isEditState ?
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
                    isEditMode={isEditState}
                    onAddInventory={onAddInventory}
                    handleInventoryUpdate={handleInventoryUpdate}
                />
            case "Equipment":
                return <ProceduresEquipmentTab
                    equipmentsData={equipments}
                    isEditMode={isEditMode}
                    onAddEquipment={onAddEquipment}
                    handleEquipmentUpdate={handleEquipmentUpdate}
                />;
            case "Notes":
                return <NotesTab notesData={notes === "" ? [] : [notes]}/>;
            case "Theatres" :
                return <TheatresTab
                    theatresData={supportedRooms}
                    onAddTheatre={onAddTheatre}
                />
            default :
                return <View/>
        }
    };

    return (
        <BottomSheetContainer
            isFetching = {isFetching}
            isEditMode = {isEditState}
            overlayId={_id}
            overlayTitle={name}
            currentTabs = {currentTabs}
            selectedTab = {currentTab}
            onTabPressChange = {onTabPress}
            overlayContent = {getTabContent(currentTab)}
            onEditPress = {onEditPress}
        />
    );
}

const mapStateToProps = (state) => ({
    isEditState: state.procedurePage?.isEdit
});

const mapDispatchToProps = {
    setProcedureEdit
}

ProcedurePage.propTypes = {};
ProcedurePage.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProcedurePage);

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
