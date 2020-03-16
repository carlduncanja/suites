import React, { useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import ListHeader from './ListHeader';
import ListData from './ListData';
import { SuitesContext } from '../../../contexts/SuitesContext';

const List = () => {
    const [state] = useContext(SuitesContext)
    return ( 
        <View>
            <View style={styles.header}>
                <ListHeader headers={state.list.listHeaders}/>
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