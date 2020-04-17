import React,{ useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import SlideOverlay from '../common/SlideOverlay/SlideOverlay';
import Navigation from '../CaseFiles/navigation/ContentNavigationStack';


const CaseFileBottomSheet = ({item, overlayMenu}) =>{

    let initialCurrentTabs = overlayMenu[0].overlayTabs
    let intialSelectedTab = initialCurrentTabs[0]
    const overlayId = item.id
    const overlayTitle = item.caseFileDetails.title
    
    // ############### Staate

    const [selectedTab, setSelectedTab] = useState(intialSelectedTab)
    const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs)
    const [isEditMode, setEditMode] = useState(false)

    // ############### Event Handlers
    const handleTabPressChange = (tab) => {
        if ( isEditMode === false){
            setSelectedTab(tab)
        }
    }

    const handleOverlayMenuPress = (selectedMenuItem) => {
        const selectedMenu = overlayMenu.filter(item => item.menuItemName === selectedMenuItem)
        const currentTabs = selectedMenu[0].overlayTabs
        const selectedTab = currentTabs[0]
        setCurrentTabs(currentTabs)
        setSelectedTab(selectedTab)
    }

    // ############### Data
    
    const overlayContent = <Navigation 
        item = {item} 
        overlayMenu = {overlayMenu}
        handleOverlayMenuPress = {handleOverlayMenuPress}
        selectedTab = {selectedTab}
        isEditMode = {isEditMode}
    />


    return (
        <View style={{flex:1}}>
            <SlideOverlay
                overlayId = {overlayId}
                overlayTitle = {overlayTitle}
                onTabPressChange = {handleTabPressChange}
                currentTabs = {currentTabs}
                selectedTab = {selectedTab}
                isEditMode = {isEditMode}
                overlayContent = {overlayContent}
            />
        </View>
    )
}

export default CaseFileBottomSheet