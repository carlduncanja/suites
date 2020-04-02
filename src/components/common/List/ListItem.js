import React, {Component, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withModal } from 'react-native-modalfy';
import { SuitesContext } from '../../../contexts/SuitesContext';
import Item from './Item'
import { appActions } from '../../../redux/reducers/suitesAppReducer'
import { transformToCamel } from '../../../hooks/useTextEditHook';

const ListItem = (props) => {
    const { modalToOpen, modal, checkbox, listItem, routeName} = props
    const [state,dispatch] = useContext(SuitesContext)

    const getSelectedItem = (selectedId) => {
        //fetch data from database
        const selectedSource = require("../../../../assets/db.json").caseFiles.caseDetails
        const filterFiles = selectedSource.filter(item => item.id === selectedId)
        return filterFiles
    }

    const toggleCheckbox = (listItemId) => {
        dispatch({
            type: appActions.TOGGLECHECKBOX,
            newState : {
                checkedItemStatus : true,
                checkedItemsList : state.list.checkedItemsList.includes(listItemId) ?
                    state.list.checkedItemsList.filter(listItem => listItem !== listItemId)
                    :
                    [...state.list.checkedItemsList,listItemId]
            }
        })
    }

    // const handleSelectedListItem = (listItem) => {
    //     const menuName = state.overlayMenu.menu[state.overlayMenu.selectedMenuItem].tabName
    //     const menuTab = state.overlayMenu.selectedMenuItemTabs[state.overlayMenu.selectedMenuItemCurrentTab]
    //     let selectedObj = getSelectedItem(listItem.id)
    //     selectedObj.length > 0 && (
    //         dispatch({
    //             type: appActions.SETSELECTEDLISTITEM,
    //             newState:{
    //                 selectedListItemId : listItem.id,
    //                 selectedListObject : selectedObj[0]
    //             }
    //         }),
    //         dispatch({
    //             type: appActions.SETSLIDEOVERLAY,
    //             newState : {
    //                 slideOverlayHeader : {"id":listItem.id,"name":listItem.name},
    //                 slideOverlayStatus : true,
    //                 slideOverlayTabInfo : selectedObj[0][transformToCamel(menuName)][transformToCamel(menuTab)]
    //             }
    //         })
    //     )
    // }

    const handleSelectedListItem = (listItem) => {
        let selectedObj = listItem
        dispatch({
            type: appActions.SETSELECTEDLISTITEM,
            newState:{
                selectedListItemId : listItem.id,
                selectedListObject : selectedObj
            }
        })
    }

    return (
        <TouchableOpacity onPress={()=>{handleSelectedListItem(listItem);modal.openModal(modalToOpen)}}>
            <View style={styles.container}>
                <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}} onPress={()=>toggleCheckbox(listItem.id)}>
                    {checkbox}
                </TouchableOpacity>
                    <Item listItem = {listItem} routeName = {routeName}/>
            </View>
        </TouchableOpacity>
    );
}

export default withModal(ListItem);

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        //justifyContent:'center',
        padding:10,
        paddingBottom:12,
        paddingTop:12,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        borderWidth:1,
        borderColor: "#E3E8EF",
        width:'100%',
        marginBottom:10
    },
})
