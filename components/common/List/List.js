import React from 'react';
import {View, StyleSheet} from 'react-native';
import ListHeader from './ListHeader';
import ListData from './ListData';

const List = () => {
    return ( 
        <View>
            <View style={styles.header}>
                <ListHeader />
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