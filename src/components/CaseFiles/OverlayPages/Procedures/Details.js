import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FrameProcedureCard from '../../../common/Frames/FrameCards/FrameProcedureCard';
import { SuitesContext } from '../../../../contexts/SuitesContext';

const Details = () => {
    const [state] = useContext(SuitesContext)
    const information = state.slideOverlay.slideOverlayTabInfo
    return (
        <ScrollView>
            {information.map((item,index)=>{
                return(
                    <View key={index} style={styles.procedureContainer}>
                        <FrameProcedureCard information = {item}/>
                    </View>
                )
            })}
        </ScrollView>
        
    );
}
 
export default Details;

const styles = StyleSheet.create({
    procedureContainer:{
        marginBottom:15
    }
})