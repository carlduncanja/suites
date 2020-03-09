import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import Overlay from '../components/common/Overlay/Overlay';
import { withModal } from 'react-native-modalfy'

const OverlayModal = (props) => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods

    const { modal: {closeModal, closeModals, currentModal}} = props
    return (  
        <TouchableOpacity 
            onPress={()=>{closeModals(currentModal); }}
            activeOpacity={1}
            style={[styles.modalContainer,{width:suitesState.pageMeasure.width}]}>
            <View style={styles.positionContainer}>
                <Overlay/>
            </View>
            
        </TouchableOpacity>
    );
}
 
export default withModal(OverlayModal);

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        alignItems:"flex-end",
        justifyContent:'flex-end',
    },
    positionContainer:{
        position:'absolute',
        bottom:80,
        right:40
    }
})