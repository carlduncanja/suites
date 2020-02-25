import React,{useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ExitIcon from '../ExitIcon';
import { SuitesContext } from '../../../contexts/SuitesContext';

const OverlayHeader = () => {
    const suitesState = useContext(SuitesContext).state
    return (  
        <View style={styles.container}>
            <Text>{suitesState.itemTitle}</Text>
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