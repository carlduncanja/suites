import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import Configuration from './OverlayTabs/Configuration';
import NotesTab from './OverlayTabs/NotesTab';
import ConsumablesTab from './OverlayTabs/ConsumablesTab';
import EquipmentTab from './OverlayTabs/EquipmentTab';
import TheatresTab from './OverlayTabs/TheatresTab';
import {colors} from "../../styles";

import { getProcedureById } from "../../api/network";

function ProceduresBottomSheet({procedure}) {
    
    const currentTabs = ["Configuration", "Consumables", "Equipment", "Notes", "Theatres"];
    const {_id, name} = procedure;

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
        switch (selectedTab) {
            case "Configuration":
                return <Configuration procedure = {selectedProcedure}/>;
            case "Consumables":
                return <ConsumablesTab consumablesData = {inventories} />;
            case "Equipment":
                return <EquipmentTab equipmentsData = {equipments}/>;
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
