import React,{ useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SuitesContext } from '../../../contexts/SuitesContext';

const PageTitle = () => {
    const [state]  = useContext(SuitesContext)
    return ( 
        <View>
            <Text style={styles.pageTitle}>{state.pageTitle}</Text>
        </View>
    );
}
 
export default PageTitle;
const styles= StyleSheet.create({
    pageTitle:{
        fontSize:24,
        color:'#104587',
    }
})