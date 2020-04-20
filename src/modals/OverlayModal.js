import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import Overlay from '../components/common/Overlay/Overlay';
import { withModal } from 'react-native-modalfy'

const OverlayModal = (props) => {
    const [state] = useContext(SuitesContext)

    const { modal: {closeModal, closeModals, currentModal, closeAllModals, params }} = props
    return ( 
        <View style={{width:state.pageMeasure.width, height: state.pageMeasure.height}}>
            <TouchableOpacity
                onPress={()=>{closeModals(currentModal)}}
                activeOpacity={1}
                style={[styles.modalContainer]}
            />
            <View style={styles.positionContainer}>
                {/* <Overlay/> */}
                { params.content }
            </View>
        </View> 
    );
}
 
export default OverlayModal;

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