import React,{Component, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewModeHeading, EditModeHeading } from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'
import { SuitesContext } from '../../../contexts/SuitesContext';
import { appActions } from '../../../redux/reducers/suitesAppReducer';
import { transformToCamel } from '../../../hooks/useTextEditHook'

const SlideHeader = () => {
    const [state, dispatch] = useContext(SuitesContext)
    const controlTabChange = (tabIndex) => {
        if (state.slideOverlay.slideOverlayButtonEdit === false) handleOverlayTabChange(tabIndex)
    }
    const handleOverlayTabChange = (tabIndex) => {   
        
        const filterMenu = state.overlayMenu.menu.filter((menuItem,index)=>index === state.overlayMenu.selectedMenuItem)
        const selectedMenuName = filterMenu[0].tabName
        const tabName = state.overlayMenu.selectedMenuItemTabs[tabIndex]
        dispatch({
            type: appActions.OVERLAYTABCHANGE,
            newState : {selectedMenuItemCurrentTab : tabIndex}
        })
        dispatch({
            type: appActions.OVERLAYTABCHANGEINFO,
            newState : {
                slideOverlayTabInfo : state.selectedListItem.selectedListObject[transformToCamel(selectedMenuName)][transformToCamel(tabName)]
            }
        })
    }
   
    return (  
        <View style = {{
            backgroundColor: state.slideOverlay.slideOverlayButtonEdit ? "#83AED1" : "#EEF2F6",
            borderTopLeftRadius:30,
            borderTopRightRadius:30
        }}>
            {
                state.slideOverlay.slideOverlayButtonEdit ?
                    <EditModeHeading/>
                    :
                    <ViewModeHeading/>
            }
           
            <TabsContainer 
                tabs = {state.overlayMenu.selectedMenuItemTabs}
                selectedTab = {state.overlayMenu.selectedMenuItemCurrentTab}
                onPressChange = {controlTabChange}
            />
        </View>
    );
}
 
export default SlideHeader;
