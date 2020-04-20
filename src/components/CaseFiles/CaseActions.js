import React,{ useState } from "react";
import { View, Text, StyleSheet, Modal } from 'react-native'
import FloatingActionComponent from "../common/FloatingAction/FloatingActionComponent";
import ActionContainer from '../common/FloatingAction/ActionContainer';
import SvgIcon from '../../../assets/SvgIcon';
import { withModal } from "react-native-modalfy";
import NewCaseAction from "./NewCaseAction";

const CaseActions = ({modal}) => {

    const svg = {
        newItem : <SvgIcon iconName = "newItem" strokeColor = "#38A169"/>,
        newItemDisabled : <SvgIcon iconName = "newItem" strokeColor = "#A0AEC0"/>,
        archive : <SvgIcon iconName = "archiveItem" strokeColor = "#104587"/>,
        archiveDisabled : <SvgIcon iconName = "archiveItem" strokeColor = "#A0AEC0"/>,
    } 


    const newItemComponent = <NewCaseAction/>

    const archiveComponent = {}

    const floatingActions = [
        {
            actionName : "Archive Case",
            actionIcon : svg.archive,
            actionComponent : archiveComponent
        },
        {
            actionName : "New Item",
            actionIcon : svg.newItem,
            actionComponent : newItemComponent
        }
    ]

    const handleActionPress = (action) => {
        const filterSelected = floatingActions.filter(item => item.actionName === action)
        modal.openModal('OverlayModal',{ content : filterSelected[0].actionComponent})
    }

    const actionContent = <ActionContainer
        title = 'CASE ACTIONS'
        floatingActions = {floatingActions}
        handleActionPress = {handleActionPress}
    />

    return (
        <View>
            <FloatingActionComponent
                actionContent = {actionContent}
            />
        </View>
    )
}

export default withModal(CaseActions) 

const styles = StyleSheet.create({

})