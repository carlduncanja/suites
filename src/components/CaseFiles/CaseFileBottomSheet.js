import React,{ useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import SlideOverlay from '../common/SlideOverlay/SlideOverlay';
import Navigation from '../CaseFiles/navigation/ContentNavigationStack';
import {colors} from "../../styles";

import { getCaseFileById } from "../../api/network";

const CaseFileBottomSheet = ({caseItem, overlayMenu}) =>{

    const initialCurrentTabs = overlayMenu[0].overlayTabs
    const intialSelectedTab = initialCurrentTabs[0]
    const {_id, name } = caseItem
    
    // ############### Staate

    const [selectedTab, setSelectedTab] = useState(intialSelectedTab)
    const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs)
    const [isEditMode, setEditMode] = useState(false)
    const [selectedCase, setSelectedCase] = useState({})
    const [isFetching, setFetching] = useState(false);

    // ############### Lifecycle Methods
    useEffect(() => {
        fetchCase(_id)
    }, []);

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

    // ############### Helper Function
    const fetchCase = (id) => {
        setFetching(true);
        getCaseFileById(id)
            .then(data => {
                setSelectedCase(data)
                // setProcedure(data)
            })
            .catch(error => {
                console.log("Failed to get case", error)
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    // ############### Data
    
    const overlayContent = <Navigation 
        item = {caseItem} 
        overlayMenu = {overlayMenu}
        handleOverlayMenuPress = {handleOverlayMenuPress}
        selectedTab = {selectedTab}
        isEditMode = {isEditMode}
    />


    return (
        <View style={{flex:1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                    <SlideOverlay
                        overlayId = {_id}
                        overlayTitle = {name}
                        onTabPressChange = {handleTabPressChange}
                        currentTabs = {currentTabs}
                        selectedTab = {selectedTab}
                        isEditMode = {isEditMode}
                        overlayContent = {overlayContent}
                    />
            }
        </View>
    )
}
CaseFileBottomSheet.propTypes = {};
CaseFileBottomSheet.defaultProps = {};

export default CaseFileBottomSheet