import React,{useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ExitIcon from '../ExitIcon';
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const OverlayHeader = () => {
    const [state] = useContext(CaseFileContext)
    return (  
        <View style={styles.container}>
            <Text>{state.newItemAction.itemTitle}</Text>
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