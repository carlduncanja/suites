import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Easing } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import ReportPreview from '../components/CaseFiles/Reports/ReportPreview';
import { withModal } from 'react-native-modalfy';
import { SimpleAnimation } from 'react-native-simple-animations';

const { width } = Dimensions.get("window");
const ReportPreviewModal = (props) => {
    
    const { modal: {closeModals, currentModal}} = props
    return (  
            <SimpleAnimation duration={2000} direction="left" fade={false} delay={1000} movementType="slide" easing={Easing.ease}>
                {/* <TouchableOpacity 
                    onPress={()=>{closeModals(currentModal); }}
                    activeOpacity={1}
                    style={[styles.modalContainer, {width:width}]}>
                </TouchableOpacity> */}
                <View style={{flex:1, width:width}}>
                    <ReportPreview/>
                </View>
            </SimpleAnimation>
    );
}
 
export default withModal(ReportPreviewModal);

const styles = StyleSheet.create({
    modalContainer:{
        //flex:1,
        backgroundColor:'yellow',
        alignItems:"flex-end",
        justifyContent:'flex-end',
    },
    positionContainer:{
        
    }
})