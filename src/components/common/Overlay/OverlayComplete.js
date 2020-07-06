import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import SvgIcon from '../../../../assets/SvgIcon'

const OverlayComplete = () => {
    return (
        <View style={{height:'100%',alignItems:'center',justifyContent:'space-evenly'}}>
            <View style={{backgroundColor:"#EEF2F6", padding:25, borderRadius:'100%', marginTop:20}}>
                <SvgIcon iconName="caseFilesComplete"/>
            </View>

            <View style={{padding:8, borderWidth:1, borderColor:'#CCD6E0', width:'40%'}}>
                <Text>Tap <Text style={{color:'#3182CE'}}>CONTINUE</Text> to finish filling out your new Case File for 'Julie Brown'.</Text>
            </View>

        </View>
    );
}

export default OverlayComplete;
