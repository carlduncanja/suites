import React, { useContext, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'; 
import SlideContent from './SlideContent'
import SlideHeader from './SlideHeader';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SlideOverlay ({
        isEditMode = false,
        currentTabs = [], 
        overlayId = '', 
        overlayTitle = '',
        selectedTab = '',
        onTabPressChange = ()=>{},  
        onEditPress = ()=>{}, 
        overlayContent = ()=>{},      
    }){

    const theme = useTheme();

    const SlideOverlayWrapper = styled.View`
        margin:0px;
        background-color: ${theme.colors['--default-shade-white']};
    `;
    const SlideOverlayContainer = styled.View`
        height:100%;
        width:100%;
    `;

    return (
        <SlideOverlayWrapper>
            <SlideOverlayContainer>  
                <SlideHeader
                    id = {overlayId}
                    title = {overlayTitle}
                    selectedTab = {selectedTab}
                    currentTabs = {currentTabs}
                    onTabPressChange = {onTabPressChange}
                    isEditMode = {isEditMode}
                    onEditButtonPress = {onEditPress}
                />
                <SlideContent overlayContent = {overlayContent}/>
            </SlideOverlayContainer>
        </SlideOverlayWrapper>
        
        // <View style={styles.container}>
        //     <View style={styles.header}>
        //         <SlideHeader
        //             id = {overlayId}
        //             title = {overlayTitle}
        //             selectedTab = {selectedTab}
        //             currentTabs = {currentTabs}
        //             onTabPressChange = {onTabPressChange}
        //             isEditMode = {isEditMode}
        //             onEditButtonPress = {onEditPress}
        //         />
        //     </View>

        //     <View style={styles.content}>
        //         {
        //             overlayContent
        //         }
        //     </View>
        // </View>
    );
};

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
