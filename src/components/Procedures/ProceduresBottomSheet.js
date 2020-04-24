import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import Configuration from '../OverlayTabs/Configuration';
import NotesTab from '../OverlayTabs/NotesTab';
import ProceduresConsumablesTab from '../OverlayTabs/ProceduresConsumablesTab';
import ConsumablesTab from '../OverlayTabs/ConsumablesTab';
import ProceduresEquipmentTab from '../OverlayTabs/ProceduresEquipmentTab';
import TheatresTab from '../OverlayTabs/TheatresTab';
import {colors} from "../../styles";
import { currencyFormatter } from '../../utils/formatter';

import { getProcedureById } from "../../api/network";

function ProceduresBottomSheet({procedure}) {
    
    const currentTabs = ["Configuration", "Consumables", "Equipment", "Notes", "Theatres"];
    const {_id, name} = procedure;
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
    const [isEditMode, setEditMode] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState({})

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchProcdure(_id)
    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

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
                return <Configuration procedure = {selectedProcedure}/>;
            case "Consumables":
                return <ConsumablesTab data = {consumablesData}  headers={consumablesHeader} listItem={consumablesListItem}/>;
            case "Equipment":
                return <ProceduresEquipmentTab equipmentsData = {equipments}/>;
            case "Notes":
                return <NotesTab notesData = {notes}/>;
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
                        overlayContent={<View style={{flex: 1, padding:30}}>
                            {
                                getTabContent(currentTab)
                            }
                        </View>}
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
