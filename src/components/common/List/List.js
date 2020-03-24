import React, { useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import ListHeader from './ListHeader';
import ListData from './ListData';
import { SuitesContext } from '../../../contexts/SuitesContext';
 
const List = ({listData, listHeaders, routeName}) => { 
    const [state] = useContext(SuitesContext)
    return ( 
        <View>
            <View style={styles.header}>
                <ListHeader listHeaders={listHeaders}/>
            </View>
            <View style={styles.data}>
                <ListData listData = {listData} routeName = {routeName}/>
            </View>
        </View>
    );
}
 
export default List;
const styles = StyleSheet.create({
    header:{
        marginBottom:25,
    },
    data:{}
})