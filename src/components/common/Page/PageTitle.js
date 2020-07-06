import React,{ useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SuitesContext } from '../../../contexts/SuitesContext';

const PageTitle = ({pageTitle}) => {
    return ( 
        <View>
            <Text style={styles.pageTitle}>{pageTitle}</Text>
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