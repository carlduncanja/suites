import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import SvgIcon from '../../assets/SvgIcon'
import { SuitesContext } from '../../contexts/SuitesContext';
import { appActions } from '../../reducers/suitesAppReducer';


const SelectedMenuIconTab = () => {
    const [state,dispatch] = useContext(SuitesContext)

    const handleSelectedMenuTab = (menuIndex) => {
        const currentTabs = state.overlayMenu.menu[menuIndex].overlayTab
        const selectedMenuName = state.overlayMenu.menu.filter((menuItem,index)=>index === menuIndex)
        const selectedTabName = currentTabs[0]
        dispatch({
            type: appActions.OVERLAYMENUCHANGE,
            newState : {
                selectedMenuItem : menuIndex,
                selectedMenuItemTabs : currentTabs,
                selectedMenuItemCurrentTab : 0
            }
        })
        dispatch({
            type: appActions.OVERLAYTABCHANGEINFO,
            newState : {
                slideOverlayTabInfo : state.selectedListItem.selectedListObject[transformToCamel(selectedMenuName[0].tabName)][transformToCamel(selectedTabName)]
            }
        })
    }
    
    return ( 
        <View style={styles.iconContainer}>
            {state.overlayMenu.menu.map((icon,index)=>{
                return (
                    state.overlayMenu.selectedMenuItem === index ?
                        <TouchableOpacity key={index} style={styles.icon} onPress={()=>handleSelectedMenuTab(index)}>
                            <SvgIcon iconName={`${icon.tabId}Open`}/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity key={index} style={styles.icon} onPress={()=>handleSelectedMenuTab(index)}>
                            <SvgIcon iconName={`${icon.tabId}Closed`}/>
                        </TouchableOpacity>
                )
            })}
        </View>
    );
}

 
export default SelectedMenuIconTab;

const styles = StyleSheet.create({
    iconContainer:{
        flexDirection:"row",
        borderRightWidth:1,
        borderRightColor:"#CCD6E0"
    },
    icon:{
        paddingRight:20,
    }
})