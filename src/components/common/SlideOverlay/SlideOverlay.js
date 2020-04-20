import React, { useContext } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SlideContent from './SlideContent'
import SlideHeader from './SlideHeader';

const SlideOverlay = ({overlayContent, isEditMode, overlayId, overlayTitle, onTabPressChange, onEditPress, currentTabs, selectedTab}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SlideHeader
                    id = {overlayId}
                    title = {overlayTitle}
                    selectedTab = {selectedTab}
                    currentTabs = {currentTabs}
                    onTabPressChange = {onTabPressChange}
                    isEditMode = {isEditMode}
                    onEditButtonPress = {onEditPress}
                />
            </View>

            <View style={styles.content}>
                <SlideContent
                    overlayContent = {overlayContent}
                />
            </View>
        </View>
    );
}

export default SlideOverlay;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        // backgroundColor:'#EEF2F6',
        // borderTopLeftRadius:30,
        // borderTopRightRadius:30
    },
    content:{
        flex:1,
    },
    footer:{
        flex:1,
        position:'absolute',
        justifyContent:'flex-end',
        paddingBottom:25,
        alignSelf:'center',
        alignItems:'center',
        top:0,
        bottom:0,

    }
})
