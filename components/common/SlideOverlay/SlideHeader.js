import React,{Component, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewModeHeading } from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'
import { SuitesContext } from '../../../contexts/SuitesContext';

const SlideHeader = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods
    return (  
        <View>
            <ViewModeHeading/>
            <TabsContainer 
                tabs = {suitesState.overlayCurrentMenuTabs}
                selectedTab = {suitesState.overlaySelectedMenuTab}
                onPressChange = {suitesMethod.handleOverlayTabChange}
            />
        </View>
    );
}
 
export default SlideHeader;