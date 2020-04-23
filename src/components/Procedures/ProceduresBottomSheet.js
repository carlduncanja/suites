import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import Configuration from './OverlayTabs/Configuration';
import NotesTab from './OverlayTabs/NotesTab';
import ConsumablesTab from './OverlayTabs/ConsumablesTab';
import EquipmentTab from './OverlayTabs/EquipmentTab';
import TheatresTab from './OverlayTabs/TheatresTab';
import {colors} from "../../styles";
import {getProceduresById} from "../../api/network";

function PhysicianBottomSheet({procedure}) {
    const currentTabs = ["Configuration", "Consumables", "Equipment", "Notes", "Theatres"];
    const {id, name} = procedure;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(false);
    const [isFetching, setFetching] = useState(false);

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchProcdure(id)
    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Configuration":
                return <Configuration procedure = {procedure}/>;
            case "Consumables":
                return <ConsumablesTab/>;
            case "Equipment":
                return <EquipmentTab/>;
            case "Notes":
                return <NotesTab/>;
            case "Theatres" :
                return <TheatresTab/>
            default :
                return <View/>
        }
    };

    const overlayContent = <View style={{flex: 1, padding:30}}>
        {getTabContent(currentTab)}
    </View>;

    const fetchProcdure = (id) => {
        setFetching(true);
        getProceduresById(id)
            .then(data => {
                setProcedure(data)
            })
            .catch(error => {
                console.log("Failed to get procedure", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                    <SlideOverlay
                        overlayId={id}
                        overlayTitle={name}
                        onTabPressChange={onTabPress}
                        currentTabs={currentTabs}
                        selectedTab={currentTab}
                        isEditMode={isEditMode}
                        overlayContent={overlayContent}
                    />
            }
        </View>
    );
}

PhysicianBottomSheet.propTypes = {};
PhysicianBottomSheet.defaultProps = {};

export default PhysicianBottomSheet;
