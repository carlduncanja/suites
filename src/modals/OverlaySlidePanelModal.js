import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import OverlaySlidePanel from '../components/common/SlideOverlay/OverlaySlidePanel';
import { withModal } from 'react-native-modalfy'
import { appActions } from '../redux/reducers/suitesAppReducer';

const OverlaySlidePanelModal = (props) => {
    const [state, dispatch] = useContext(SuitesContext)
    const closeSlideOverlay = () =>{
        dispatch({
            type: appActions.CLOSESLIDEOVERLAY,
            newState : {
                slideOverlayStatus : false
            }
        })
    }

    const { modal: {closeModal, closeModals, currentModal}} = props
    return (  
        <View style={{width:state.pageMeasure.width, height:state.pageMeasure.height}}>
            <TouchableOpacity
                style={styles.modalContainer}
                onPress={()=>{closeModals(currentModal);closeSlideOverlay()}}
                activeOpacity={1}
            />
            <OverlaySlidePanel/>
        </View>
    );
}
 
export default withModal(OverlaySlidePanelModal);

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.3)",
        alignItems:"flex-end",
        justifyContent:'flex-end',
    },
})
