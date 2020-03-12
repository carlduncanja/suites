import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import SvgIcon from '../../assets/SvgIcon'
import { SuitesContext } from '../../contexts/SuitesContext';


const SelectedMenuIconTab = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethods = useContext(SuitesContext).methods
    return ( 
        <View style={styles.iconContainer}>
            {suitesState.overlayMenu.menu.map((icon,index)=>{
                return (
                    suitesState.overlayMenu.selectedMenuItem === icon.tabName ?
                        <TouchableOpacity key={index} style={styles.icon} onPress={()=>suitesMethods.handleSelectedMenuTab(icon.tabName)}>
                            <SvgIcon iconName={`${icon.tabId}Open`}/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity key={index} style={styles.icon} onPress={()=>suitesMethods.handleSelectedMenuTab(icon.tabName)}>
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