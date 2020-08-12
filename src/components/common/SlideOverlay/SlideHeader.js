import React, {useContext} from 'react';
import {View} from 'react-native';
import {ViewModeHeading, EditModeHeading} from '../Headings'
import TabsContainer from '../Tabs/TabsContainerComponent'
import {SuitesContext} from '../../../contexts/SuitesContext';
import {connect} from 'react-redux';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {setCaseEdit} from "../../../redux/actions/casePageActions";

function SlideHeader({
                         id = "",
                         title = "",
                         selectedTab = "",
                         currentTabs = [],
                         onTabPressChange = () => {
                         },
                         isEditMode = false,
                         onEditButtonPress = () => {
                         },
                        // ...props
                     }) {

    const theme = useTheme();

    const SlideOverlayHeaderWrapper = styled.View`
        height : 126px;
        background-color : ${isEditMode ? theme.colors['--gradient-color'] : theme.colors['--color-gray-200']};
        padding-top : ${theme.space['--space-28']};
    `
    const SlideOverlayHeaderContainer = styled.View`
        height: 100%;
    `

    // const onEditButtonPress = () => {
    //     props.setCaseEdit(!isEditMode);

    // }

    return (
        <SlideOverlayHeaderWrapper>
            <SlideOverlayHeaderContainer>
                {
                    isEditMode ?
                        <EditModeHeading
                            id={id}
                            title={title}
                            onButtonPress={() => onEditButtonPress(selectedTab)}
                        />
                        :
                        <ViewModeHeading
                            id={id}
                            title={title}
                            onButtonPress={() => onEditButtonPress(selectedTab)}
                        />
                }
                <TabsContainer
                    tabs={currentTabs}
                    selectedTab={selectedTab}
                    onPressChange={onTabPressChange}
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
        //         <TabsContainerComponent
        //             tabs={currentTabs}
        //             selectedTab={selectedTab}
        //             onPressChange={onTabPressChange}
        //         />
        //     </View>
        // </View>
    );
};


// const mapStateToProps = (state) => {
//     return {
//         isEditMode: state.casePage?.isEdit
//     }
// }

// const mapDispatchToProps = {
//     setCaseEdit
// }

// export default connect(mapStateToProps,mapDispatchToProps)(SlideHeader);

export default SlideHeader
