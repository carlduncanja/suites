import React,{useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ExitIcon from '../ExitIcon';
import { CaseFileContext } from '../../../contexts/CaseFileContext'; 

const OverlayHeader = ({title}) => {
    return (  
        <View style={styles.container}>
            <Text>{title}</Text>
            <ExitIcon/>
        </View>
    );
}
 
export default OverlayHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
    }
})