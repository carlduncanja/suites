import React, {useState} from 'react';
import {View} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import General from '../Equipment/General';
import moment from 'moment';

function EquipmentBottomSheet({equipment}) {
    const currentTabs = ["Details"];
    const details = <General/>

    const testData = {
        description : "In endoscopy, Fibre-optic endoscopes are pliable, highly maneuverable instruments that allow access to channels in the body.",
        assigned: "Dr.Mansingh",
        status : equipment.status,
        supplier : 'Medical Suppliers Ltd.',
        usage : '12 Hours',
        availableOn : moment(equipment.nextAvailable).format("DD/MM/YYYY")
    }

    const {id, name} = equipment;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(false);


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    // ##### Helper functions

    const overlayContent = <View style={{flex: 1, padding:30}}>
        <General
            details = {{...testData, id : id}}
        />
    </View>;

    return (
        <View style={{flex: 1}}>
            <SlideOverlay
                overlayId={id}
                overlayTitle={name}
                onTabPressChange={onTabPress}
                currentTabs={currentTabs}
                selectedTab={currentTab}
                isEditMode={isEditMode}
                overlayContent={overlayContent}
            />
        </View>
    );
}

EquipmentBottomSheet.propTypes = {};
EquipmentBottomSheet.defaultProps = {};

export default EquipmentBottomSheet;
