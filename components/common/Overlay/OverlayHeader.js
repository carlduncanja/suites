import React,{useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ExitIcon from '../ExitIcon';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const OverlayHeader = () => {
    const caseState = useContext(CaseFileContext).state
    return (  
        <View style={styles.container}>
            <Text>{caseState.newItemAction.itemTitle}</Text>
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