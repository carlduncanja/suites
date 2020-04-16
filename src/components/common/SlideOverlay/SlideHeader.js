import React,{ useContext} from 'react';
import { View } from 'react-native';
import { ViewModeHeading, EditModeHeading } from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'
import { SuitesContext } from '../../../contexts/SuitesContext';
 
const SlideHeader = ({id, title, initialSelectedTab, initialCurrentTabs, onTabPressChange}) => { 
    const [state, dispatch] = useContext(SuitesContext)
    
    const tabs = state.overlayMenu.currentTabs.length === 0 ? initialCurrentTabs : state.overlayMenu.currentTabs
    const selectedTab = state.overlayMenu.selectedTab === "" ? initialSelectedTab : state.overlayMenu.selectedTab
   
    return (  
        <View style = {{
            backgroundColor: state.slideOverlay.slideOverlayButtonEdit ? "#83AED1" : "#EEF2F6",
            borderTopLeftRadius:30, 
            borderTopRightRadius:30
        }}>
            { 
                state.slideOverlay.slideOverlayButtonEdit ?
                    <EditModeHeading
                        id = {id}
                        title = {title}
                    />
                    :
                    <ViewModeHeading
                        id = {id}
                        title = {title}
                    />
            }

            <TabsContainer 
                tabs = {tabs}
                selectedTab = {selectedTab}
                onPressChange = {onTabPressChange}
            />
        </View>
    );
}
 
export default SlideHeader;
