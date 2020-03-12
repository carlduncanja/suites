import React, { useContext, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './Header';
import Data from './Data';
import { SuitesContext } from '../../../../contexts/SuitesContext';

const Divider = () =>{
    return(
        <View
            style={{
                height:1,
                marginBottom:20,
                marginTop:10,
                backgroundColor:"#CCD6E0",
            }}
        />
    )
}
const Table = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <>
            <View style={styles.header}>
                <Header headers = {suitesState.report.reportConsumablesListHeaders}/>
            </View>
            {Divider()}
            <View style={{paddingBottom:5}}>
                <Data/>
            </View>
            {Divider()}
        </>
    );
}
 
export default Table;
const styles = StyleSheet.create({
    header:{
        //marginBottom:25,
    },
    data:{}
})