import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SuitesContext } from '../contexts/SuitesContext';
import PickListCard from '../components/CaseFiles/PickList/PickListCard';
import { withModal } from 'react-native-modalfy'

const PickListModal = (props) => {
    const [state] = useContext(SuitesContext)

    const { modal: {closeModal, closeModals, currentModal, closeAllModals }} = props
    return ( 
        <View style={{width:state.pageMeasure.width, height: state.pageMeasure.height}}>
            <TouchableOpacity
                onPress={()=>{closeModals(currentModal)}}
                activeOpacity={1}
                style={[styles.modalContainer]}
            />
            <View style={styles.positionContainer}>
                <PickListCard/>
            </View>
        </View> 
    );
}
 
export default withModal(PickListModal);

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