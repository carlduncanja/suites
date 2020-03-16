import React,{ useContext } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Physicians, Nurses } from '../../OverlayCardFrames';

const Details = () => {
    return ( 
        <ScrollView>
            <Physicians/>
            <Nurses/>
        </ScrollView>
       
    );
}
 
export default Details;