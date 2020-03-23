import React, {Component, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withModal } from 'react-native-modalfy';
import { SuitesContext } from '../../../contexts/SuitesContext';
import Item from './Table/Item'
import { appActions } from '../../../redux/reducers/suitesAppReducer'
import { transformToCamel } from '../../../hooks/useTextEditHook';

openModal = (props) => {
    const { modalToOpen, modal } = props
    modal.openModal(modalToOpen)
}

const ListItem = (props) => {
    const [state,dispatch] = useContext(SuitesContext)

    const getSelectedItem = (selectedId) => {
        const filterFiles = state.list.selectedSourceData.filter(item => item.id === selectedId)
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

    const handleSelectedListItem = (listItemId) => {
        const menuName = state.overlayMenu.menu[state.overlayMenu.selectedMenuItem].tabName
        const menuTab = state.overlayMenu.selectedMenuItemTabs[state.overlayMenu.selectedMenuItemCurrentTab]
        let selectedObj = getSelectedItem(listItemId)
        selectedObj.length > 0 && (
            dispatch({
                type: appActions.SETSELECTEDLISTITEM,
                newState:{
                    selectedListItemId : listItemId,
                    selectedListObject : selectedObj[0]
                }
            }),
            dispatch({
                type: appActions.SETSLIDEOVERLAY,
                newState : {
                    slideOverlayHeader : {"id":getPatient(listItemId).id,"name":`${getPatient(listItemId).name.firstName} ${getPatient(listItemId).name.middle} ${getPatient(listItemId).name.surname}`},
                    slideOverlayStatus : true,
                    slideOverlayTabInfo : selectedObj[0][transformToCamel(menuName)][transformToCamel(menuTab)]
                }
            })
        )
    }

    return (
        <TouchableOpacity onPress={()=>{handleSelectedListItem(props.fields.recordId);this.openModal(props)}}>
            <View style={styles.container}>
                <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}} onPress={()=>toggleCheckbox(props.fields.recordId)}>
                    {props.checkbox}
                </TouchableOpacity>
                <Item fields = {props.fields}/>
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
        justifyContent:'center',
        padding:10,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        borderWidth:1,
        borderColor: "#E3E8EF",
        width:'100%',
        marginBottom:10
    },
    item:{
        flex:1,
        // width:'25%',
        alignItems:"flex-start",
        justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        color:"#4E5664",
    }
})
