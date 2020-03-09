import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import ActionContainer from '../components/common/FloatingAction/ActionContainer';
import { withModal } from 'react-native-modalfy';

const ActionContainerModal = (props) => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods

    const { modal: {closeModal, closeModals, currentModal}} = props
    return (  
        <TouchableOpacity 
            onPress={()=>{closeModals(currentModal); suitesMethod.toggleActionButton()}}
            activeOpacity={1}
            style={[styles.modalContainer,{width:suitesState.pageMeasure.width, height:suitesState.pageMeasure.height}]}>
            <View style={styles.positionContainer}>
                <ActionContainer/>
            </View>
        </TouchableOpacity>
    );
}
 
export default withModal(ActionContainerModal);

const styles = StyleSheet.create({
    modalContainer:{
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