import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";
import SectionList from '../../../common/SlideOverlay/SectionList';
import { ScrollView } from 'react-native-gesture-handler';

const Insurance = () => {
    return ( 
        <ScrollView >
            <SectionList/>
        </ScrollView>
    );
}
 
export default Insurance;

const styles= StyleSheet.create({

})