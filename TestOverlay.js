import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from './components/common/Progress/ProgressBar';

const TestOverlay = () => {
    return (  
        <View style={{backgroundColor:'purple', justifyContent:'center', alignSelf:"stretch"}}>
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-evenly', alignItems:'stretch'}}>
                <Text>ONE</Text>
                <Text>TWO</Text>
                <Text>THREE</Text>
            </View>
            <ProgressBar progressNumber={1}/>
            <View style={{flexDirection:'row', position:"absolute",width:'100%',justifyContent:'space-evenly' }}>
                <View style={{backgroundColor:"red", width:40, height:40, borderRadius:20}}/>
                <View style={{backgroundColor:"red", width:40, height:40, borderRadius:20}}/>
                <View style={{backgroundColor:"red", width:40, height:40, borderRadius:20}}/>
            </View>
            
        </View>
    );
}
 
export default TestOverlay;