import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LoadingIndicator from '../common/LoadingIndicator';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SlideOverlay from '../common/SlideOverlay/SlideOverlay';
import CaseFileOverlayMenu from "../CaseFiles/CaseFileOverlayMenu";
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";

function CaseFilesBottomSheetContainer({
        isFetching = false,
        isEditMode = false,
        overlayId = "",
        overlayTitle = "",
        currentTabs = [],
        selectedTab = "",
        onTabPressChange = () =>{},
        overlayContent = ()=>{},
        onEditPress = ()=>{},
        selectedMenuItem ,
        overlayMenu = [],
        handleTabPress = ()=>{},
        isDisabled = false,
        toggleActionButton = ()=>{}
    }){

    const theme = useTheme();

    const BottomSheetWrapper = styled.View`
        flex:1;
        background-color: ${theme.colors['--default-shade-white']};
    `;
    const SheetContainer = styled.View`
        height:100%
    `;

    const FooterWrapper = styled.View`
        width: 100%;
        padding-right: 30px;
        padding-left: 30px;
        padding-bottom: 17px;
        position : absolute;
        bottom: 0;
        height: 60px;
    `;
 
    const FooterContainer = styled.View`

        width: 100%;
        height: 100%;
        flex-direction : row;
    `;
    return ( 
        <BottomSheetWrapper>
            <SheetContainer>
                {
                isFetching ?
                    <LoadingIndicator/>
                    :
                    <>
                        <SlideOverlay
                            overlayId={overlayId}
                            overlayTitle={overlayTitle}
                            onTabPressChange={onTabPressChange}
                            currentTabs={currentTabs}
                            selectedTab={selectedTab}
                            isEditMode={isEditMode}
                            overlayContent={overlayContent}
                            onEditPress = {onEditPress}
                        />
                        <FooterWrapper>
                            <FooterContainer>
                                <CaseFileOverlayMenu
                                    selectedMenuItem={selectedMenuItem}
                                    overlayMenu={overlayMenu}
                                    handleTabPress={handleTabPress}
                                />
                                <FloatingActionButton
                                    isDisabled={isDisabled}
                                    toggleActionButton={toggleActionButton}
                                />
                            </FooterContainer>
                            
                        </FooterWrapper>

                        
                    </>
            }
            </SheetContainer>
        </BottomSheetWrapper>
    )
}

export default CaseFilesBottomSheetContainer

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor:'blue',
    },
    actionWrapper: {
        position: 'absolute',
        bottom: 20,
        right: 40
    }
})
