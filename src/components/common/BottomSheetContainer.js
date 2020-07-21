import React, {useEffect, useState} from 'react';
import LoadingIndicator from './LoadingIndicator';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SlideOverlay from './SlideOverlay/SlideOverlay';

function BottomSheetContainer({
        isFetching = false,
        isEditMode = false,
        overlayId = "",
        overlayTitle = "",
        currentTabs = [],
        selectedTab = "",
        onTabPressChange = () =>{},
        overlayContent = ()=>{},
        onEditPress = ()=>{}
    }){

    const theme = useTheme();

    const BottomSheetWrapper = styled.View`
        flex:1;
        background-color: ${theme.colors['--default-shade-white']};
    `
    const SheetContainer = styled.View`
        height:100%
    `
    return (
        <BottomSheetWrapper>
            <SheetContainer>
                {
                isFetching ?
                    <LoadingIndicator/>
                    :
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
            }
            </SheetContainer>
        </BottomSheetWrapper>
    )
}

export default BottomSheetContainer