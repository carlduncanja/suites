import React from 'react';
import {View, StyleSheet} from 'react-native';
import OverlayListHeader from './OverlayListHeader';
import OverlayListData from './OverlayListData';

const OverlayList = () => {
    // console.log("List")
    return ( 
        <View>
            <View style={styles.header}>
                <OverlayListHeader />
            </View>
            <View style={styles.data}>
                <OverlayListData />
            </View>
        </View>
    );
}
 
export default OverlayList;
const styles = StyleSheet.create({
    header:{
        marginBottom:25,
    },
    data:{}
})