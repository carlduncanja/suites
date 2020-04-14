import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import ActionContainer from '../components/common/FloatingAction/ActionContainer';
import { withModal } from 'react-native-modalfy';
import { CaseFileContext } from '../contexts/CaseFileContext';
import { appActions } from '../redux/reducers/suitesAppReducer';

const ActionContainerModal = (props) => {
    const [state,dispatch] = useContext(SuitesContext)
    const toggleActionButton = () => {
        // state.floatingActions.actionButtonState === false && setSearchPlaceholder("")
        dispatch({
            type:appActions.TOGGLEACTIONBUTTON,
            newState : !state.floatingActions.actionButtonState
        })
    }

    const { modal: {closeModal, closeModals, currentModal, params : {floatingActions, title }}} = props

    return (  
        <View style={{width:state.pageMeasure.width, height:state.pageMeasure.height}}>
            <TouchableOpacity
                onPress={()=>{closeModals(currentModal);toggleActionButton()}}
                activeOpacity={1}
                style={styles.modalContainer}
            />
            <View style={styles.positionContainer}>
                <ActionContainer
                    title = {title}
                    floatingActions = {floatingActions}
                />
            </View>
        </View>
    );
}
 
export default ActionContainerModal;

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.3)",
        alignItems:"flex-end",
        justifyContent:'flex-end',
    },
    positionContainer:{
        position:'absolute',
        bottom:80,
        right:40
    }
})
