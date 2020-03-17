import React,{Component, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewModeHeading, EditModeHeading } from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'
import { SuitesContext } from '../../../contexts/SuitesContext';
import { appActions } from '../../../reducers/suitesAppReducer';
import { transformToCamel } from '../../../hooks/useTextEditHook'

const SlideHeader = () => {
    const [state, dispatch] = useContext(SuitesContext)

    const handleTabChange = (tabIndex) =>{
        state.editMode.status === false && handleOverlayTabChange (tabIndex)
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
            type : appActions.UPDATEEDITMODE,
            newState : {currentEditTab: tabIndex}
        })
        dispatch({
            type: appActions.OVERLAYTABCHANGEINFO,
            newState : {
                slideOverlayTabInfo : state.selectedListItem.selectedListObject[transformToCamel(selectedMenuName)][transformToCamel(tabName)]
            }
        })
    }

    let editModeState = state.editMode.status === true && state.editMode.currentEditTab === state.overlayMenu.selectedMenuItemCurrentTab
   
    return (  
        <View style={{
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            backgroundColor: editModeState ? '#99C2E3' : '#EEF2F6'
        }}>
            {editModeState ? <EditModeHeading/> : <ViewModeHeading/> }
           
            <TabsContainer 
                tabs = {state.overlayMenu.selectedMenuItemTabs}
                selectedTab = {state.overlayMenu.selectedMenuItemCurrentTab}
                onPressChange = {handleTabChange}
                editModeState = {editModeState}
            />
        </View>
    );
}
 
export default SlideHeader;