import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import Configuration from '../OverlayTabs/Configuration';
import NotesTab from '../OverlayTabs/NotesTab';
import ProceduresConsumablesTab from '../OverlayTabs/ProceduresConsumablesTab';
import ConsumablesTab from '../OverlayTabs/ConsumablesTab';
import ProceduresEquipmentTab from '../OverlayTabs/ProceduresEquipmentTab';
import EditableProceduresConfig from '../OverlayTabs/EditableProceduresConfig';
import TheatresTab from '../OverlayTabs/TheatresTab';
import {colors} from "../../styles";
import { currencyFormatter } from '../../utils/formatter';
import { updateProcedure } from "../../api/network";


import { getProcedureById } from "../../api/network";

function ProceduresBottomSheet({procedure, isOpenEditable}) {
    
    const currentTabs = ["Configuration", "Consumables", "Equipment", "Notes", "Theatres"];
    // console.log("Procedure:", procedure)
    const {
        _id, 
        name,
        hasRecovery,
        duration,
        equipments,
        inventories,
        notes = '',
        supportedRooms,
        physician
    } = procedure;

    
    const consumablesHeader = [
        {
            name :"Item Name",
            alignment: "flex-start"
        },
        {
            name :"Type",
            alignment: "center"
        },
        {
            name :"Quantity",
            alignment: "center"
        },
        {
            name :"Unit Price",
            alignment: "flex-end"
        }
    ]

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState(currentTab)
    const [isFetching, setFetching] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState({})

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
        if(!isEditMode === false){
            console.log("Fields:", fields)
            
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

    // ##### Helper functions
    const consumablesListItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.item}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item,{alignItems:'center'}]}>
            <Text style={styles.itemText}>{item.quantity}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
        </View>
             
    </>

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

    const handleUpdate = (data) => {
        
        let {inventories = [] } = selectedProcedure
        let newInventories = inventories.map( item => {
            return {
                inventory : item.inventory._id,
                amount : item.amount
            }
        })
        let updatedArray = [...newInventories, data]
        let updatedObj = {
            inventories : updatedArray
        }
        console.log("Data: ", updatedObj)
        updateProcedureCall(updatedObj)
    }

    const updateProcedureCall = (updatedFields) =>{
        updateProcedure(_id, updatedFields)
            .then(data => {
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
                    handleUpdate = {handleUpdate}
                />
            case "Equipment":
                return <ProceduresEquipmentTab 
                    equipmentsData = {equipments}
                    isEditMode = {isEditMode}
                />;
            case "Notes":
                return <NotesTab notesData = {[notes]}/>;
            case "Theatres" :
                return <TheatresTab theatresData = {supportedRooms}/>
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
                    // console.log("Selected: ", selectedProcedure)
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
                                style={{flex: 1, padding:30}}
                                // onPress = {()=>{console.log("Touched"); handlePopovers(false)()}}
                            >
                                {getTabContent(currentTab)}
                            </View>
                        }
                    />
            }
        </View>
    );
}

ProceduresBottomSheet.propTypes = {};
ProceduresBottomSheet.defaultProps = {};

export default ProceduresBottomSheet;

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
})
