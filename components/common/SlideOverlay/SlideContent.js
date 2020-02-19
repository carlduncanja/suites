import React,{ useContext} from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { SuitesContext } from '../../../contexts/SuitesContext';
import Navigation from '../../CaseFiles/navigation/ContentNavigationStack'

const SllideContent = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <View style={styles.container}>
            <Navigation />
        </View>
    );
}
 
export default SllideContent;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:'100%',
        backgroundColor: '#fff',
    }
    
})