import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import OverlaySlidePanel from '../components/common/SlideOverlay/OverlaySlidePanel';
import { withModal } from 'react-native-modalfy'

const OverlaySlidePanelModal = (props) => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods

    const { modal: {closeModal, closeModals, currentModal}} = props
    return (  
        <TouchableOpacity 
            onPress={()=>{closeModals(currentModal); suitesMethod.closeSlideOverlay()}}
            activeOpacity={1}
            style={[styles.modalContainer,{width:suitesState.pageMeasure.width, height:suitesState.pageMeasure.height}]}>
            <OverlaySlidePanel/>
        </TouchableOpacity>
    );
}
 
export default withModal(OverlaySlidePanelModal);

const styles = StyleSheet.create({
    modalContainer:{
        //flex:1,
        backgroundColor:"rgba(0,0,0,0.3)",
        alignItems:"flex-end",
        justifyContent:'flex-end',
    },
    positionContainer:{
        
    }
})