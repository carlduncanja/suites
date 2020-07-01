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
import { currencyFormatter } from '../../utils/formatter';
import { updateProcedure } from "../../api/network";


import { getProcedureById } from "../../api/network";
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import ActionItem from "../../components/common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import { withModal } from 'react-native-modalfy';

function ProcedurePage({route}) {
    
    const currentTabs = ["Configuration", "Consumables", "Equipment", "Notes", "Theatres"];

    const { procedure, isOpenEditable } = route.params.params

    const {
        _id = "", 
        name,
        hasRecovery,
        duration,
        physician
    } = procedure;

    
    // const consumablesHeader = [
    //     {
    //         name :"Item Name",
    //         alignment: "flex-start"
    //     },
    //     {
    //         name :"Type",
    //         alignment: "center"
    //     },
    //     {
    //         name :"Quantity",
    //         alignment: "center"
    //     },
    //     {
    //         name :"Unit Price",
    //         alignment: "flex-end"
    //     }
    // ]

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState(currentTab)
    const [isFetching, setFetching] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState({})
    const [isInfoUpdated, setIsInfoUpdated] = useState(false)
    const [isFloatingActionDisabled, setIsDisabled] = useState(false)


    const [fields, setFields] = useState({
        name : name,
        hasRecovery : hasRecovery,
        duration : duration.toString(),
        custom : true,
        physician : physician
    })

    const [popoverList, setPopoverList] = useState([
        {
            name : "physician",
            status : false
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
        setEditableTab(tab)
        setEditMode(!isEditMode)
        if(!isEditMode === false && isInfoUpdated){
            console.log("Info: ", selectedProcedure)
            // updateProcedureCall(selectedProcedure)
            // console.log("Fields:", fields)
            
            // updatePhysicianFn(_id, fieldsObject)
        }
    }

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const handlePopovers = (popoverValue) => (popoverItem) =>{
        
        if(!popoverItem){
            let updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})
            
            setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ]; 
            setPopoverList(updatedPopovers)
        }
    
    }

    // const toggleActionButton = () =>{
    //     setIsDisabled(true)
    //     modal.openModal("ActionContainerModal",
    //         {
    //             actions: getFabActions(),
    //             title: "CASE ACTIONS",
    //             onClose: () => {
    //                 setFloatingAction(false)
    //             }
    //         })
    // }

    // ##### Helper functions
    // const consumablesListItem = (item) => <>
    //     <View style={styles.item}>
    //         <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.item}</Text>
    //     </View>
    //     <View style={[styles.item,{alignItems:'flex-start'}]}>
    //         <Text style={styles.itemText}>{item.type}</Text>
    //     </View>
    //     <View style={[styles.item,{alignItems:'center'}]}>
    //         <Text style={styles.itemText}>{item.quantity}</Text>
    //     </View>
    //     <View style={[styles.item,{alignItems:'flex-end'}]}>
    //         <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
    //     </View>
             
    // </>

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
        let {inventories = [] } = selectedProcedure
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
        let newProcedureData = {...selectedProcedure, inventories:newData}
        setIsInfoUpdated(true)
        setSelectedProcedure(newProcedureData)
        // console.log("Data: ", updatedObj)
        updateProcedureCall(newProcedureData)
    }

    const handleInventoryUpdate = (data) => {
        const procedure = {...selectedProcedure, inventories : data}
        const updatedObj = { inventories : data}
        setSelectedProcedure(procedure)
        setIsInfoUpdated(true)
        // Change updated
        // updateProcedureCall(updatedObj)
    }

    const onAddEquipment = (data) => {
        let { equipments = [] } = selectedProcedure
        let newData = [...equipments, data]
        let newProcedureData = {...selectedProcedure, equipments:newData}
        setIsInfoUpdated(true)
        setSelectedProcedure(newProcedureData)
        updateProcedureCall(newProcedureData)
    }

    const onAddTheatre = (data) => {
        // console.log("Theatre: ", data)
        let { supportedRooms = [] } = selectedProcedure
        let newData = [...supportedRooms, data]
        let newProcedureData = {...selectedProcedure, supportedRooms:newData}
        setIsInfoUpdated(true)
        setSelectedProcedure(newProcedureData)
        // updateProcedureCall(newProcedureData)
    }

    const handleEquipmentUpdate = (data) => {
        const procedure = {...selectedProcedure, equipments : data}
        const updatedObj = { inventories : data}
        setSelectedProcedure(procedure)
        setIsInfoUpdated(true)
        // Change updated
        // updateProcedureCall(updatedObj)
    }

    const updateProcedureCall = (updatedFields) =>{
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

    const getFabActions = () =>{
        let title = "Actions";
        let floatingAction = [];

        switch (currentTab) {
            case 0:{
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
        const { inventories = [], equipments = [], notes = "", supportedRooms = [] } = selectedProcedure
        
        const consumablesData = inventories.map(item => {
            return {
                item :  item.inventory.name,
                type : "Anaesthesia",
                quantity : item.amount,
                unitPrice : item.inventory.unitPrice
            }
        });

        switch (selectedTab) {
            case "Configuration":
                return currentTab === 'Configuration' && isEditMode ?
                    <TouchableOpacity
                        style={{flex: 1}}
                        activeOpacity = {1}
                        onPress = {()=>{handlePopovers(false)()}}
                    >
                        <EditableProceduresConfig 
                        fields = {fields}
                        onFieldChange = {onFieldChange}
                        popoverList = {popoverList}
                        handlePopovers = {handlePopovers}
                        />
                    </TouchableOpacity>
                    
                    :
                    <Configuration procedure = {selectedProcedure}/>;
            case "Consumables":
                return <ProceduresConsumablesTab
                    consumablesData = {inventories}
                    isEditMode = {isEditMode}
                    onAddInventory = {onAddInventory}
                    handleInventoryUpdate = {handleInventoryUpdate}
                />
            case "Equipment":
                return <ProceduresEquipmentTab 
                    equipmentsData = {equipments}
                    isEditMode = {isEditMode}
                    onAddEquipment = {onAddEquipment}
                    handleEquipmentUpdate = {handleEquipmentUpdate}
                />;
            case "Notes":
                return <NotesTab notesData = {[notes]}/>;
            case "Theatres" :
                return <TheatresTab 
                    theatresData = {supportedRooms}
                    onAddTheatre = {onAddTheatre}
                />
            default :
                return <View/>
        }
    };

    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                    <>
                        <SlideOverlay
                            overlayId={_id}
                            overlayTitle={name}
                            onTabPressChange={onTabPress}
                            currentTabs={currentTabs}
                            selectedTab={currentTab}
                            isEditMode={isEditMode}
                            onEditPress = {onEditPress}
                            overlayContent={
                                <View 
                                    style={{flex: 1, padding:30, backgroundColor:'#FFFFFF'}}
                                    // onPress = {()=>{console.log("Touched"); handlePopovers(false)()}}
                                >
                                    {getTabContent(currentTab)}
                                </View>
                            }
                        />
                        {/* <View style={styles.footer}>
                            <FloatingActionButton
                                isDisabled={isFloatingActionDisabled}
                                toggleActionButton={toggleActionButton}
                            />
                        </View> */}
                        
                    </>
            }
        </View>
    );
}

ProcedurePage.propTypes = {};
ProcedurePage.defaultProps = {};

export default withModal(ProcedurePage);

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
    footer:{
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
