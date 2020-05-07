import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator } from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import General from '../OverlayTabs/General';
import EditableEquipmentDetails from '../OverlayTabs/EditableEquipmentDetails';
import moment from 'moment';
import {colors} from "../../styles";
import { getEquipmentById } from "../../api/network";
import { formatDate } from '../../utils/formatter';

function EquipmentBottomSheet({equipment, isOpenEditable}) {

    const testData = {
        description : "In endoscopy, Fibre-optic endoscopes are pliable, highly maneuverable instruments that allow access to channels in the body.",
        assigned: "Dr.Mansingh",
        status : equipment.status,
        supplier : 'Medical Suppliers Ltd.',
        usage : '12 Hours',
        availableOn : formatDate(equipment.nextAvailable,"DD/MM/YYYY")
    }

    const currentTabs = ["Details"];
    
    const {id, name} = equipment;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedEquipment, setSelectedEquipment] = useState(equipment)
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState()
    const [isFetching, setFetching] = useState(false);

    // ##### Lifecycle Methods
    useEffect(() => {
        fetchEquipment(id)
    }, []);

    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = (tab) => {
        setEditableTab(tab)
        setEditMode(!isEditMode)
    }

    // ##### Helper functions

    const getTabContent = (selectedTab) => {

        switch (selectedTab) {
            case "Details":
                return editableTab === 'Details' && isEditMode ?
                    <EditableEquipmentDetails equipment = {selectedEquipment} />
                    :
                    <General equipment = {selectedEquipment}/>;
            default :
                return <View/>
        }
    };

    const overlayContent = <View style={{flex: 1, padding:30}}>
        {getTabContent(currentTab)}
    </View>;

    const fetchEquipment = (id) => {
        setFetching(true);
        getEquipmentById(id)
            .then(data => {
                setEquipment(data)
            })
            .catch(error => {
                console.log("Failed to get equipment", error)
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
                        onEditPress = {onEditPress}
                    />
            }
        </View>
    );
}

EquipmentBottomSheet.propTypes = {};
EquipmentBottomSheet.defaultProps = {};

export default EquipmentBottomSheet;
