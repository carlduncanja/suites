import React, {useContext} from 'react';
import {View} from 'react-native';
import {ViewModeHeading, EditModeHeading} from '../Headings'
import TabsContainer from '../Tabs/TabsContainer'
import {SuitesContext} from '../../../contexts/SuitesContext';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SlideHeader({id = "", title = "", selectedTab = "", currentTabs = [], onTabPressChange = ()=>{}, isEditMode = false, onEditButtonPress = ()=>{}}){
    const theme = useTheme();

    const SlideOverlayHeaderWrapper = styled.View`
        height : 126px;
        background-color : ${isEditMode ? theme.colors['--gradient-color']: theme.colors['--color-gray-200']};
        padding-top : ${theme.space['--space-28']};
    `
    const SlideOverlayHeaderContainer = styled.View`
        height: 100%;
    `

    return (
        <SlideOverlayHeaderWrapper>
            <SlideOverlayHeaderContainer>
                {
                    isEditMode ?
                        <EditModeHeading
                            id={id}
                            title={title}
                            onButtonPress={()=>onEditButtonPress(selectedTab)}
                        />
                        :
                        <ViewModeHeading
                            id={id}
                            title={title}
                            onButtonPress={()=>onEditButtonPress(selectedTab)}
                        />
                }
                <TabsContainer
                    tabs = {currentTabs}
                    selectedTab = {selectedTab}
                    onPressChange = {onTabPressChange}
                />
            </SlideOverlayHeaderContainer>
        </SlideOverlayHeaderWrapper>
        // <View style={{
        //     backgroundColor: isEditMode ? "#83AED1" : "#EEF2F6"
        // }}>
        //     {
        //         isEditMode ?
        //             <EditModeHeading
        //                 id={id}
        //                 title={title}
        //                 onButtonPress={()=>onEditButtonPress(selectedTab)}
        //             />
        //             :
        //             <ViewModeHeading
        //                 id={id}
        //                 title={title}
        //                 onButtonPress={()=>onEditButtonPress(selectedTab)}
        //             />
        //     }

        //     <View style={{marginLeft: 20}}>
        //         <TabsContainer
        //             tabs={currentTabs}
        //             selectedTab={selectedTab}
        //             onPressChange={onTabPressChange}
        //         />
        //     </View>
        // </View>
    );
};

export default SlideHeader;
