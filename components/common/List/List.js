import React, { useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import ListHeader from './ListHeader';
import ListData from './ListData';
import { SuitesContext } from '../../../contexts/SuitesContext';

const List = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <View>
            <View style={styles.header}>
                <ListHeader headers={suitesState.listHeaders}/>
            </View>
            <View style={styles.data}>
                <ListData />
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