import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Easing } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import ReportPreview from '../components/CaseFiles/Reports/ReportPreview';
import { withModal } from 'react-native-modalfy';
import { SimpleAnimation } from 'react-native-simple-animations';

const { width } = Dimensions.get("window");
const ReportPreviewModal = (props) => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods

    const { modal: {closeModals, currentModal}} = props
    return (  
        <SimpleAnimation duration={2000} direction="left" fade={false} delay={1000} movementType="slide" easing={Easing.ease}>
            <TouchableOpacity 
                onPress={()=>{closeModals(currentModal); }}
                activeOpacity={1}
                style={[styles.modalContainer,{width:width}]}>
                    <ReportPreview/>
            </TouchableOpacity>
        </SimpleAnimation>
        
    );
}
 
export default withModal(ReportPreviewModal);

const styles = StyleSheet.create({
    modalContainer:{
        //
        flex:1,
        alignItems:"flex-end",
        justifyContent:'flex-end',
        backgroundColor:"red"
    },
    positionContainer:{
        
    }
})