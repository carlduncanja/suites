import React,{Component, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewModeHeading } from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'
import { SuitesContext } from '../../../contexts/SuitesContext';
import { appActions } from '../../../redux/reducers/suitesAppReducer';
import { transformToCamel } from '../../../hooks/useTextEditHook'

const SlideHeader = () => {
    const [state, dispatch] = useContext(SuitesContext)
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
        <View>
            <ViewModeHeading/>
            <TabsContainer 
                tabs = {state.overlayMenu.selectedMenuItemTabs}
                selectedTab = {state.overlayMenu.selectedMenuItemCurrentTab}
                onPressChange = {handleOverlayTabChange}
            />
        </View>
    );
}
 
export default SlideHeader;
